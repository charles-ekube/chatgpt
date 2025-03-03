// CombinedImageEditor.tsx
import React, { useState, useRef, useEffect } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { add, remove, arrowUndo, arrowRedo } from 'ionicons/icons';
import { ImageUploader } from './ImageUploader';
import InpaintModal from './PaintOptionsModal';

interface ImageStyle {
    width: string;
    height: string;
    objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface EditorState {
    brushSize: number;
    zoom: number;
    prompt: string;
    maskCanvas: HTMLCanvasElement | null;
    history: ImageData[];
    historyIndex: number;
}

const CombinedImageEditor: React.FC = () => {
    // Image upload state
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const imageStyle: ImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    };

    // Editor state
    const [isEditing, setIsEditing] = useState(false);
    const [editorState, setEditorState] = useState<EditorState>({
        brushSize: 40,
        zoom: 20,
        prompt: '',
        maskCanvas: null,
        history: [],
        historyIndex: -1,
    });

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Drawing state
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    // Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleImageUpload = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setIsEditing(false); // Reset editing state when new image is uploaded

        // Reset editor state
        setEditorState(prev => ({
            ...prev,
            history: [],
            historyIndex: -1,
            maskCanvas: null
        }));
    };

    // Initialize canvas when editing starts
    useEffect(() => {
        if (isEditing && canvasRef.current && !editorState.maskCanvas && selectedImage) {
            const canvas = canvasRef.current;
            const maskCanvas = document.createElement('canvas');

            // Set initial canvas size
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                maskCanvas.width = img.width;
                maskCanvas.height = img.height;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    setEditorState(prev => ({
                        ...prev,
                        maskCanvas,
                        history: [imageData],
                        historyIndex: 0
                    }));
                }
            };
            img.src = selectedImage;
        }
    }, [isEditing, selectedImage]);

    // Drawing functions
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = (clientX - rect.left) * (canvas.width / rect.width);
        const y = (clientY - rect.top) * (canvas.height / rect.height);

        setIsDrawing(true);
        setLastX(x);
        setLastY(y);
        drawOnMask(x, y);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current || !editorState.maskCanvas) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
            e.preventDefault();
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = (clientX - rect.left) * (canvas.width / rect.width);
        const y = (clientY - rect.top) * (canvas.height / rect.height);

        drawLine(lastX, lastY, x, y);
        setLastX(x);
        setLastY(y);
    };

    const stopDrawing = () => {
        if (isDrawing && canvasRef.current) {
            setIsDrawing(false);
            saveToHistory();
        }
    };

    const drawOnMask = (x: number, y: number) => {
        if (!editorState.maskCanvas) return;
        const maskCtx = editorState.maskCanvas.getContext('2d');
        if (maskCtx) {
            maskCtx.beginPath();
            maskCtx.arc(x, y, editorState.brushSize / 2, 0, Math.PI * 2);
            maskCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            maskCtx.fill();
            updateCanvasWithMask();
        }
    };

    const drawLine = (fromX: number, fromY: number, toX: number, toY: number) => {
        if (!editorState.maskCanvas) return;
        const maskCtx = editorState.maskCanvas.getContext('2d');
        if (maskCtx) {
            maskCtx.beginPath();
            maskCtx.moveTo(fromX, fromY);
            maskCtx.lineTo(toX, toY);
            maskCtx.lineWidth = editorState.brushSize;
            maskCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            maskCtx.stroke();
            updateCanvasWithMask();
        }
    };

    const updateCanvasWithMask = () => {
        if (!canvasRef.current || !editorState.maskCanvas || !selectedImage) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                ctx.drawImage(editorState.maskCanvas!, 0, 0);
            };
            img.src = selectedImage;
        }
    };

    const saveToHistory = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const newHistory = editorState.history.slice(0, editorState.historyIndex + 1);
            newHistory.push(imageData);
            setEditorState(prev => ({
                ...prev,
                history: newHistory,
                historyIndex: newHistory.length - 1
            }));
        }
    };

    // Editor controls
    const zoomIn = () => {
        if (editorState.zoom < 100) {
            setEditorState(prev => ({ ...prev, zoom: prev.zoom + 10 }));
        }
    };

    const zoomOut = () => {
        if (editorState.zoom > 10) {
            setEditorState(prev => ({ ...prev, zoom: prev.zoom - 10 }));
        }
    };

    const undo = () => {
        if (editorState.historyIndex > 0 && canvasRef.current) {
            const newIndex = editorState.historyIndex - 1;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.putImageData(editorState.history[newIndex], 0, 0);
                setEditorState(prev => ({ ...prev, historyIndex: newIndex }));
            }
        }
    };

    const redo = () => {
        if (editorState.historyIndex < editorState.history.length - 1 && canvasRef.current) {
            const newIndex = editorState.historyIndex + 1;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.putImageData(editorState.history[newIndex], 0, 0);
                setEditorState(prev => ({ ...prev, historyIndex: newIndex }));
            }
        }
    };

    return (
        <div className="combined-editor" style={{ width: '100%' }}>
            {!isEditing ? (
                <>
                    <div >
                        <ImageUploader
                            selectedImage={selectedImage}
                            imageStyle={imageStyle}
                            onImageUpload={handleImageUpload}
                        />
                    </div>

                    {selectedImage && (
                        <IonButton
                            expand="block"
                            className="ion-margin"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Image
                        </IonButton>
                    )}
                </>
            ) : (
                <div className="editor-interface" style={{ height: '400px', width: '400px', }}>
                    <div className="editor-controls">
                        <div className="history-controls">
                            <IonButton fill="clear" onClick={undo} disabled={editorState.historyIndex <= 0}>
                                <IonIcon icon={arrowUndo} />
                            </IonButton>
                            <IonButton fill="clear" onClick={redo} disabled={editorState.historyIndex >= editorState.history.length - 1}>
                                <IonIcon icon={arrowRedo} />
                            </IonButton>
                        </div>

                        <div className="zoom-controls">
                            <IonButton fill="clear" onClick={zoomOut} disabled={editorState.zoom <= 10}>
                                <IonIcon icon={remove} />
                            </IonButton>
                            <span>{editorState.zoom}%</span>
                            <IonButton fill="clear" onClick={zoomIn} disabled={editorState.zoom >= 100}>
                                <IonIcon icon={add} />
                            </IonButton>
                        </div>

                        <IonButton onClick={() => setIsModalOpen(true)}>
                            Inpaint Settings
                        </IonButton>

                        <IonButton onClick={() => setIsEditing(false)}>
                            Back
                        </IonButton>
                    </div>

                    <div
                        className="canvas-container"
                        style={{
                            transform: `scale(${editorState.zoom / 20})`,
                            transformOrigin: 'center'
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            style={{ height: '100px', width: '100px', objectFit: 'contain' }}
                        />
                    </div>

                    <InpaintModal
                        isOpen={false}
                        onClose={() => setIsModalOpen(false)}
                        brushSize={editorState.brushSize}
                        onBrushSizeChange={(size: any) =>
                            setEditorState(prev => ({ ...prev, brushSize: size }))
                        }
                        prompt={editorState.prompt}
                        onPromptChange={(prompt: any) =>
                            setEditorState(prev => ({ ...prev, prompt }))
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default CombinedImageEditor;
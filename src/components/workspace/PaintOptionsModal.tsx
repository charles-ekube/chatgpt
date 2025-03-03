// import React, { useState, useRef, useEffect } from 'react';
// import {
//     IonContent,
//     IonHeader,
//     IonTitle,
//     IonToolbar,
//     IonModal,
//     IonButton,
//     IonIcon,
//     IonRange,
//     IonLabel,
//     IonItem,
//     IonFooter,
//     IonButtons,
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonTextarea,
//     IonSpinner,
// } from '@ionic/react';
// import {
//     arrowBack,
//     download,
//     arrowUndo,
//     arrowRedo,
//     add,
//     remove,
//     brush,
//     colorPalette,
//     images,
// } from 'ionicons/icons';
// // import './InpaintEditor.css';
// import { BottomSheet } from './BottomSheet';

// interface InpaintEditorProps {
//     isOpen: boolean;
//     onClose: () => void;
//     imageUrl: string;
// }

// interface EditorState {
//     brushSize: number;
//     zoom: number;
//     prompt: string;
//     isProcessing: boolean;
//     maskCanvas: HTMLCanvasElement | null;
//     history: ImageData[];
//     historyIndex: number;
// }

// const InpaintEditor: React.FC<InpaintEditorProps> = ({ isOpen, onClose, imageUrl }) => {
//     const [state, setState] = useState<EditorState>({
//         brushSize: 40,
//         zoom: 20,
//         prompt: '',
//         isProcessing: false,
//         maskCanvas: null,
//         history: [],
//         historyIndex: -1,
//     });

//     const [activeTab, setActiveTab] = useState<string>('inpaint');
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [lastX, setLastX] = useState(0);
//     const [lastY, setLastY] = useState(0);

//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const imageRef = useRef<HTMLImageElement>(null);
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Initialize canvas when the component mounts
//     useEffect(() => {
//         if (isOpen && canvasRef.current && !state.maskCanvas) {
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');

//             if (context) {
//                 // Create a new maskCanvas to hold mask data
//                 const maskCanvas = document.createElement('canvas');
//                 maskCanvas.width = canvas.width;
//                 maskCanvas.height = canvas.height;

//                 setState(prev => ({ ...prev, maskCanvas }));
//             }
//         }
//     }, [isOpen, state.maskCanvas]);

//     // Load and setup the image when opened
//     useEffect(() => {
//         if (isOpen && imageRef.current && canvasRef.current) {
//             const img = imageRef.current;
//             const canvas = canvasRef.current;

//             img.onload = () => {
//                 // Set canvas dimensions to match the image
//                 canvas.width = img.naturalWidth;
//                 canvas.height = img.naturalHeight;

//                 // Initial draw of the image on the canvas
//                 const ctx = canvas.getContext('2d');
//                 if (ctx) {
//                     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//                     // Save initial state for history
//                     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//                     setState(prev => ({
//                         ...prev,
//                         history: [imageData],
//                         historyIndex: 0
//                     }));
//                 }
//             };

//             // Force reload of image
//             img.src = imageUrl + '?t=' + new Date().getTime();
//         }
//     }, [isOpen, imageUrl]);

//     // Drawing functions
//     const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//         if (!canvasRef.current) return;

//         const canvas = canvasRef.current;
//         const rect = canvas.getBoundingClientRect();

//         // Get position for either mouse or touch event
//         let clientX, clientY;
//         if ('touches' in e) {
//             clientX = e.touches[0].clientX;
//             clientY = e.touches[0].clientY;
//         } else {
//             clientX = e.clientX;
//             clientY = e.clientY;
//         }

//         // Calculate position relative to canvas
//         const x = (clientX - rect.left) * (canvas.width / rect.width);
//         const y = (clientY - rect.top) * (canvas.height / rect.height);

//         setIsDrawing(true);
//         setLastX(x);
//         setLastY(y);

//         // Draw a single dot if the user just clicks/taps
//         drawOnMask(x, y);
//     };

//     const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//         if (!isDrawing || !canvasRef.current || !state.maskCanvas) return;

//         const canvas = canvasRef.current;
//         const rect = canvas.getBoundingClientRect();

//         // Get position for either mouse or touch event
//         let clientX, clientY;
//         if ('touches' in e) {
//             clientX = e.touches[0].clientX;
//             clientY = e.touches[0].clientY;
//             e.preventDefault(); // Prevent scrolling on touch devices
//         } else {
//             clientX = e.clientX;
//             clientY = e.clientY;
//         }

//         // Calculate position relative to canvas
//         const x = (clientX - rect.left) * (canvas.width / rect.width);
//         const y = (clientY - rect.top) * (canvas.height / rect.height);

//         // Draw line from last position to current position
//         drawLine(lastX, lastY, x, y);

//         setLastX(x);
//         setLastY(y);
//     };

//     const stopDrawing = () => {
//         if (isDrawing && canvasRef.current) {
//             setIsDrawing(false);

//             // Save current state to history
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext('2d');
//             if (ctx) {
//                 const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//                 // If we're not at the end of history, truncate it
//                 const newHistory = state.history.slice(0, state.historyIndex + 1);
//                 newHistory.push(imageData);

//                 setState(prev => ({
//                     ...prev,
//                     history: newHistory,
//                     historyIndex: newHistory.length - 1
//                 }));
//             }
//         }
//     };

//     const drawOnMask = (x: number, y: number) => {
//         if (!state.maskCanvas) return;

//         const maskCtx = state.maskCanvas.getContext('2d');
//         if (maskCtx) {
//             maskCtx.beginPath();
//             maskCtx.arc(x, y, state.brushSize / 2, 0, Math.PI * 2);
//             maskCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
//             maskCtx.fill();

//             // Update the main canvas to show the mask
//             updateCanvasWithMask();
//         }
//     };

//     const drawLine = (fromX: number, fromY: number, toX: number, toY: number) => {
//         if (!state.maskCanvas) return;

//         const maskCtx = state.maskCanvas.getContext('2d');
//         if (maskCtx) {
//             maskCtx.beginPath();
//             maskCtx.moveTo(fromX, fromY);
//             maskCtx.lineTo(toX, toY);
//             maskCtx.lineWidth = state.brushSize;
//             maskCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
//             maskCtx.stroke();

//             // Update the main canvas to show the mask
//             updateCanvasWithMask();
//         }
//     };

//     const updateCanvasWithMask = () => {
//         if (!canvasRef.current || !state.maskCanvas || !imageRef.current) return;

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         const img = imageRef.current;

//         if (ctx) {
//             // Clear and redraw the original image
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//             // Draw the mask on top
//             ctx.drawImage(state.maskCanvas, 0, 0);

//             // Add the dotted pattern overlay
//             drawDottedPattern(ctx, canvas.width, canvas.height);
//         }
//     };

//     const drawDottedPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//         // This function would draw the dotted pattern overlay
//         // For performance, we're not actually drawing all dots, just simulating the effect
//         ctx.fillStyle = 'rgba(240, 240, 240, 0.1)';
//         ctx.fillRect(0, 0, width, height);
//     };

//     const undo = () => {
//         if (state.historyIndex > 0 && canvasRef.current) {
//             const newIndex = state.historyIndex - 1;
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext('2d');

//             if (ctx) {
//                 // Restore the previous state
//                 ctx.putImageData(state.history[newIndex], 0, 0);

//                 // Clear the mask canvas
//                 if (state.maskCanvas) {
//                     const maskCtx = state.maskCanvas.getContext('2d');
//                     if (maskCtx) {
//                         maskCtx.clearRect(0, 0, state.maskCanvas.width, state.maskCanvas.height);
//                     }
//                 }

//                 setState(prev => ({ ...prev, historyIndex: newIndex }));
//             }
//         }
//     };

//     const redo = () => {
//         if (state.historyIndex < state.history.length - 1 && canvasRef.current) {
//             const newIndex = state.historyIndex + 1;
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext('2d');

//             if (ctx) {
//                 // Restore the next state
//                 ctx.putImageData(state.history[newIndex], 0, 0);
//                 setState(prev => ({ ...prev, historyIndex: newIndex }));
//             }
//         }
//     };

//     const zoomIn = () => {
//         if (state.zoom < 100) {
//             setState(prev => ({ ...prev, zoom: prev.zoom + 10 }));
//         }
//     };

//     const zoomOut = () => {
//         if (state.zoom > 10) {
//             setState(prev => ({ ...prev, zoom: prev.zoom - 10 }));
//         }
//     };

//     const handleBrushSizeChange = (size: number) => {
//         setState(prev => ({ ...prev, brushSize: size }));
//     };

//     const handlePromptChange = (e: CustomEvent) => {
//         setState(prev => ({ ...prev, prompt: e.detail.value }));
//     };

//     const applyInpaint = () => {
//         // This would call your AI inpainting API
//         setState(prev => ({ ...prev, isProcessing: true }));

//         // Simulate processing delay
//         setTimeout(() => {
//             // Here you would process the result from the API

//             // For demo purposes, we'll just clear the mask
//             if (state.maskCanvas) {
//                 const maskCtx = state.maskCanvas.getContext('2d');
//                 if (maskCtx) {
//                     maskCtx.clearRect(0, 0, state.maskCanvas.width, state.maskCanvas.height);
//                 }
//             }

//             // Update canvas and history
//             if (canvasRef.current) {
//                 const canvas = canvasRef.current;
//                 const ctx = canvas.getContext('2d');
//                 if (ctx) {
//                     // For demo, just add a simulated "inpainted" effect
//                     // In a real app, this would be the result from your API
//                     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//                     // Add to history
//                     const newHistory = state.history.slice(0, state.historyIndex + 1);
//                     newHistory.push(imageData);

//                     setState(prev => ({
//                         ...prev,
//                         isProcessing: false,
//                         history: newHistory,
//                         historyIndex: newHistory.length - 1,
//                         prompt: ''
//                     }));
//                 }
//             }
//         }, 2000);
//     };

//     const getZoomStyle = () => {
//         return {
//             transform: `scale(${state.zoom / 20})`,
//             transformOrigin: 'center'
//         };
//     };

//     return (
//         <BottomSheet isOpen={isOpen} onClose={onClose} height="900px">

//             <div className="inpaint-controls">
//                 <div className="history-controls">
//                     <IonButton
//                         fill="clear"
//                         onClick={undo}
//                         disabled={state.historyIndex <= 0}
//                     >
//                         <IonIcon icon={arrowUndo} />
//                     </IonButton>
//                     <IonButton
//                         fill="clear"
//                         onClick={redo}
//                         disabled={state.historyIndex >= state.history.length - 1}
//                     >
//                         <IonIcon icon={arrowRedo} />
//                     </IonButton>
//                 </div>

//                 <div className="zoom-controls">
//                     <IonButton fill="clear" onClick={zoomOut} disabled={state.zoom <= 10}>
//                         <IonIcon icon={remove} />
//                     </IonButton>
//                     <span className="zoom-percentage">{state.zoom}%</span>
//                     <IonButton fill="clear" onClick={zoomIn} disabled={state.zoom >= 100}>
//                         <IonIcon icon={add} />
//                     </IonButton>
//                 </div>
//             </div>

//             <IonContent className="ion-padding">
//                 <div className="dotted-background">
//                     <div
//                         ref={containerRef}
//                         className="canvas-container"
//                         style={getZoomStyle()}
//                     >
//                         <canvas
//                             ref={canvasRef}
//                             className="inpaint-canvas"
//                             onMouseDown={startDrawing}
//                             onMouseMove={draw}
//                             onMouseUp={stopDrawing}
//                             onMouseLeave={stopDrawing}
//                             onTouchStart={startDrawing}
//                             onTouchMove={draw}
//                             onTouchEnd={stopDrawing}
//                         />
//                         <img
//                             ref={imageRef}
//                             src={imageUrl}
//                             alt="Original"
//                             className="hidden-image"
//                         />
//                     </div>
//                 </div>
//             </IonContent>

//             <div className="inpaint-bottom-sheet">
//                 <IonHeader>
//                     <IonToolbar className="inpaint-toolbar">
//                         <IonButtons slot="start">
//                             <IonButton onClick={onClose}>Cancel</IonButton>
//                         </IonButtons>
//                         <IonTitle className="inpaint-title">Inpaint</IonTitle>
//                         <IonButtons slot="end">
//                             <IonButton onClick={onClose} color="primary">Done</IonButton>
//                         </IonButtons>
//                     </IonToolbar>
//                 </IonHeader>

//                 <IonContent className="inpaint-settings">
//                     <IonItem lines="none">
//                         <IonLabel>Brush Size</IonLabel>
//                     </IonItem>

//                     <IonRange
//                         min={10}
//                         max={100}
//                         value={state.brushSize}
//                         onIonChange={(e) => handleBrushSizeChange(e.detail.value as number)}
//                         className="brush-size-range"
//                     />

//                     <IonItem lines="none">
//                         <IonLabel>Prompt</IonLabel>
//                     </IonItem>

//                     <IonTextarea
//                         placeholder="Describe what you want to replace with the selected area..."
//                         value={state.prompt}
//                         onIonChange={handlePromptChange}
//                         className="prompt-textarea"
//                     ></IonTextarea>

//                     <div className="inpaint-action">
//                         <IonButton
//                             expand="block"
//                             className="inpaint-button"
//                             onClick={applyInpaint}
//                             disabled={state.isProcessing}
//                         >
//                             {state.isProcessing ? (
//                                 <>
//                                     <IonSpinner name="dots" /> Processing...
//                                 </>
//                             ) : (
//                                 <>Inpaint (5C)</>
//                             )}
//                         </IonButton>
//                     </div>
//                 </IonContent>

//                 <IonFooter>
//                     <IonToolbar>
//                         <IonGrid>
//                             <IonRow>
//                                 <IonCol className="tab-col">
//                                     <IonButton
//                                         fill="clear"
//                                         expand="block"
//                                         className={activeTab === 'inpaint' ? 'active-tab' : ''}
//                                         onClick={() => setActiveTab('inpaint')}
//                                     >
//                                         <div className="tab-button">
//                                             <IonIcon icon={brush} className="tab-icon" />
//                                             <span className="tab-label">Inpaint</span>
//                                         </div>
//                                     </IonButton>
//                                 </IonCol>
//                                 <IonCol className="tab-col">
//                                     <IonButton
//                                         fill="clear"
//                                         expand="block"
//                                         onClick={() => setActiveTab('color')}
//                                     >
//                                         <div className="tab-button">
//                                             <IonIcon icon={colorPalette} className="tab-icon" />
//                                             <span className="tab-label">Color</span>
//                                         </div>
//                                     </IonButton>
//                                 </IonCol>
//                                 <IonCol className="tab-col">
//                                     <IonButton
//                                         fill="clear"
//                                         expand="block"
//                                         onClick={() => setActiveTab('backg')}
//                                     >
//                                         <div className="tab-button">
//                                             <IonIcon icon={images} className="tab-icon" />
//                                             <span className="tab-label">Backg</span>
//                                         </div>
//                                     </IonButton>
//                                 </IonCol>
//                             </IonRow>
//                         </IonGrid>
//                     </IonToolbar>
//                 </IonFooter>
//             </div>
//         </BottomSheet>
//     );
// };

// export default InpaintEditor;



import React from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonRange,
    IonLabel,
    IonItem,
    IonTextarea,
} from '@ionic/react';
import { BottomSheet } from './BottomSheet';

interface InpaintModalProps {
    isOpen: boolean;
    onClose: () => void;
    brushSize: number;
    onBrushSizeChange: (size: number) => void;
    prompt: string;
    onPromptChange: (prompt: string) => void;
}

const InpaintModal: React.FC<InpaintModalProps> = ({
    isOpen,
    onClose,
    brushSize,
    onBrushSizeChange,
    prompt,
    onPromptChange,
}) => {
    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} height="400px">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inpaint Settings</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonItem>
                    <IonLabel>Brush Size</IonLabel>
                    <IonRange
                        min={10}
                        max={100}
                        value={brushSize}
                        onIonChange={e => onBrushSizeChange(e.detail.value as number)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Prompt</IonLabel>
                    <IonTextarea
                        value={prompt}
                        onIonChange={e => onPromptChange(e.detail.value!)}
                        placeholder="Describe what you want to replace..."
                    />
                </IonItem>

                <IonButton expand="block" className="ion-margin" onClick={onClose}>
                    Apply
                </IonButton>
            </IonContent>
        </BottomSheet>
    );
};

export default InpaintModal;
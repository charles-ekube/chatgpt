import { IonContent, IonFooter, IonIcon, IonPage, useIonRouter } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useRef, useState } from "react";
import CustomButton from "../../../utils/Button";
import { Colorfilter, Crop, Gallery, GalleryRemove, GallerySlash, Import, Lamp, Magicpen } from "iconsax-react";
import { EditButtonConfig, RatioOption } from "../../../types/GeneralTypes";
import { CropOptionsModal } from "../../../components/workspace/CropOptionsModal";
import { CustomRatioModal } from "../../../components/workspace/CustomRatioModal";
import InpaintingBottomSheet from "../../../components/workspace/PaintOptionsModal";
import { ImageUploader } from "../../../components/workspace/ImageUploader";
import { CircularProgress } from "../../../components/workspace/CircularProgress";
import { EditButtonsContainer } from "../../../components/workspace/EditButtonsContainer";
import { LightRangeModal } from "../../../components/workspace/LightBottomSheet";
import { ColorRangeModal } from "../../../components/workspace/ColorModal";
import InpaintEditor from "../../../components/workspace/PaintOptionsModal";
import { DiscoveryImage } from "../../../assets/images";
import CombinedImageEditor from "../../../components/workspace/CombinedImageEditor";
import { BackgroundRemoveModal } from "../../../components/workspace/BackgroundRemoveModal";
import MiniImageUploadModal from "../../../components/workspace/MiniUpload";
import { ImageUpscaleModal } from "../../../components/workspace/ImageUpscaleModal";
import { RemoveObjectModal } from "../../../components/workspace/RemoveObjectModal";
import { useLocation } from "react-router";


const ratioOptions: RatioOption[] = [
    { label: "1:1", value: "1:1", width: 1, height: 1 },
    { label: "1:2", value: "1:2", width: 1, height: 2 },
    { label: "2:1", value: "2:1", width: 2, height: 1 },
    { label: "2:3", value: "2:3", width: 2, height: 3 },
    { label: "3:4", value: "3:4", width: 3, height: 4 },
    { label: "4:5", value: "4:5", width: 4, height: 5 },
    { label: "9:16", value: "9:16", width: 9, height: 16 },
    { label: "3:2", value: "3:2", width: 3, height: 2 },
    { label: "4:3", value: "4:3", width: 4, height: 3 },
    { label: "16:9", value: "16:9", width: 16, height: 9 },
];





const ImageEditor: React.FC = () => {
    const [progress] = useState(150);
    const navigation = useIonRouter();
    const [showCropOptions, setShowCropOptions] = useState(false);
    const [showCustomRatio, setShowCustomRatio] = useState(false);
    const [showLightsModal, setShowLightsModal] = useState(false);
    const [showColorsModal, setShowColorModal] = useState(false);
    const [showMiniUpload, setShowMiniUpload] = useState(false);
    const [showImageUpscaleModal, setShowImageUpscaleModal] = useState(false);
    const [showImageUpscalePreview, setShowImageUpscalePreview] = useState(false);
    const [showBackgroundRemoveModal, setShowBackgroundRemoveModal] = useState(false);
    const [showRemoveObjectModal, setShowRemoveObjectModal] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [selectedRatio, setSelectedRatio] = useState<RatioOption | null>(null);
    const [customWidth, setCustomWidth] = useState<string>("");
    const [customHeight, setCustomHeight] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showInpaintModal, setShowInpaintModal] = useState(false);
    // const [activeButtonId, setActiveButtonId] = useState<string | undefined>();
    const [imageStyle, setImageStyle] = useState<{
        width: string;
        height: string;
        objectFit: "cover" | "contain";
    }>({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    });

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const imageUrl = params.get('imageUrl');

    const goBack = () => {
        navigation.goBack();
    };




    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target?.result as string);
            // Reset ratio when new image is uploaded
            setSelectedRatio(null);
            setImageStyle({
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            });
        };
        reader.readAsDataURL(file);
    };


    const handleRatioSelect = (ratio: RatioOption) => {
        setSelectedRatio(ratio);
        const aspectRatio = ratio.width / ratio.height;

        // Calculate new dimensions while maintaining aspect ratio
        let newStyle;
        if (aspectRatio > 1) {
            // Wider than tall
            newStyle = {
                width: '100%',
                height: `${(1 / aspectRatio) * 100}%`,
                objectFit: 'contain' as const,
            };
        } else {
            // Taller than wide or square
            newStyle = {
                width: `${aspectRatio * 100}%`,
                height: '100%',
                objectFit: 'contain' as const,
            };
        }
        setImageStyle(newStyle);
    };

    const handleCustomRatioConfirm = () => {
        if (customWidth && customHeight) {
            const width = parseInt(customWidth);
            const height = parseInt(customHeight);
            if (width > 0 && height > 0) {
                const ratio: RatioOption = {
                    label: `${width}:${height}`,
                    value: `${width}:${height}`,
                    width,
                    height,
                };
                handleRatioSelect(ratio);
                setShowCustomRatio(false);
                setShowCropOptions(false);
            }
        }
    };



    const handleInpaintApply = (settings: {
        brushSize: number;
        hardness: number;
        opacity: number
    }) => {
        // Handle the inpainting logic here with the received settings
        console.log('Applying inpainting with:', settings);
    };

    const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

    // Create a single function to handle all modal states
    const closeAllModals = () => {
        setShowCropOptions(false);
        setShowLightsModal(false);
        setShowColorModal(false);
        setShowBackgroundRemoveModal(false);
        setShowImageUpscaleModal(false);
        setShowRemoveObjectModal(false);
        setShowEditor(false);
        setActiveButtonId(null);
    };

    // Modified editButtons configuration
    const editButtons: EditButtonConfig[] = [
        {
            id: 'crop',
            title: 'Crop',
            action: () => {
                if (activeButtonId === 'crop') {
                    closeAllModals();
                } else {
                    closeAllModals();
                    setShowCropOptions(true);
                    setActiveButtonId('crop');
                }
            },
            icon: (color) => <Crop color={color} />,
            activeColor: "#002CCF",
        },
        {
            id: 'light',
            title: 'Light',
            action: () => {
                if (activeButtonId === 'light') {
                    closeAllModals();
                } else {
                    closeAllModals();
                    setShowLightsModal(true);
                    setActiveButtonId('light');
                }
            },
            icon: (color) => <Lamp color={color} />,
            activeColor: '#D7540E',
        },
        {
            id: 'inpaint',
            title: 'Inpaint',
            action: () => {
                if (activeButtonId === 'inpaint') {
                    closeAllModals();
                } else {
                    closeAllModals();
                    setShowEditor(true);
                    setActiveButtonId('inpaint');
                }
            },
            icon: (color) => <Magicpen color={color} />,
            activeColor: '#009A1C',
        },
        {
            id: 'color',
            title: 'Color',
            action: () => {
                if (activeButtonId === 'color') {
                    closeAllModals();
                } else {
                    closeAllModals();
                    setShowColorModal(true);
                    setActiveButtonId('color');
                }
            },
            icon: (color) => <Colorfilter color={color} />,
            activeColor: '#B900CA',
        },
        {
            id: 'backgroundRemover',
            title: 'Background remover',
            action: () => {
                if (activeButtonId === 'backgroundRemover') {
                    closeAllModals();
                } else {
                    closeAllModals();
                    setShowBackgroundRemoveModal(true);
                    setActiveButtonId('backgroundRemover');
                }
            },
            icon: (color) => <GallerySlash color={color} />,
            activeColor: '#74113C',
        },
        {
            id: 'imageUpscale',
            title: 'Image Upscale',
            action: () => {
                if (activeButtonId === 'imageUpscale') {
                    closeAllModals();
                } else {
                    closeAllModals();
                    setShowImageUpscaleModal(true);
                    setActiveButtonId('imageUpscale');
                }
            },
            icon: (color) => <Gallery color={color} />,
            activeColor: '#166057',
        },
        {
            id: 'removeObject',
            title: 'Remove object',
            action: () => {
                if (activeButtonId === 'removeObject') {
                    closeAllModals();
                } else {
                    closeAllModals();
                    setShowRemoveObjectModal(true);
                    setActiveButtonId('removeObject');
                }
            },
            icon: (color) => <GalleryRemove color={color} />,
            activeColor: '#E3B600',
        },
    ];

    // const handleButtonClick = (buttonId: string) => {
    //     setActiveButtonId(prev => (prev === buttonId ? undefined : buttonId));
    // };



    const [selectedMiniImage, setSelectedMiniImage] = useState<string | null>(null);


    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedMiniImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setSelectedMiniImage(null); // Clears the selected image
    };


    const handleDownloadImage = () => {
        const imageUrls = imageUrl ? imageUrl : selectedImage || ''; // Ensure this is a valid image URL or imported asset
        const fileName = "image-preview.jpg"; // Set a preferred filename

        // Create an anchor element
        const link = document.createElement("a");
        link.href = imageUrls;
        link.download = fileName; // Set the download filename
        document.body.appendChild(link); // Append to DOM (not displayed)
        link.click(); // Trigger download
        document.body.removeChild(link); // Cleanup
    };

    return (
        <IonPage style={{ backgroundColor: "#FFFFFF" }}>
            {/* Header */}
            <header
                style={{
                    padding: "30px 24px 20px 24px",
                    backgroundColor: "#ffffff",
                    borderBottom: "1px solid #DFDFDF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                        onClick={goBack}
                        style={{
                            backgroundColor: "#F5F5F5",
                            height: "35px",
                            width: "35px",
                            borderRadius: "999px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: "17px" }}>Image Editor</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {/* Progress Circle */}
                    <CircularProgress
                        value={progress}
                        size={33}
                        strokeWidth={3}
                        backgroundColor="#e6e6e6"
                        progressColor="#4285f4"
                        suffix="c"
                        textStyle={{
                            fontSize: "8px",
                            fontWeight: "bold",
                            color: "#333"
                        }}
                    />
                    {/* Download Icon */}
                    <Import size="28" color="#313131" onClick={handleDownloadImage} />
                </div>
            </header>

            {/* Main Content */}
            <IonContent>
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <ImageUploader
                        selectedImage={imageUrl ? imageUrl : selectedImage}
                        imageStyle={imageStyle}
                        onImageUpload={handleImageUpload}
                    />
                    {/* <CombinedImageEditor /> */}


                    <CropOptionsModal
                        show={showCropOptions}
                        onClose={() => setShowCropOptions(false)}
                        selectedRatio={selectedRatio}
                        onRatioSelect={handleRatioSelect}
                        onShowCustomRatio={() => setShowCustomRatio(true)}
                        ratioOptions={ratioOptions}
                    />

                    <CustomRatioModal
                        show={showCustomRatio}
                        onClose={() => setShowCustomRatio(false)}
                        onConfirm={handleCustomRatioConfirm}
                        customWidth={customWidth}
                        customHeight={customHeight}
                        onWidthChange={setCustomWidth}
                        onHeightChange={setCustomHeight}
                    />
                    {/* <InpaintModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        brushSize={state.brushSize}
                        onBrushSizeChange={handleBrushSizeChange}
                        prompt={state.prompt}
                        onPromptChange={handlePromptChange}
                    /> */}

                    <LightRangeModal
                        show={showLightsModal}
                        onClose={() => setShowLightsModal(false)}
                    />
                    <ColorRangeModal
                        show={showColorsModal}
                        onClose={() => setShowColorModal(false)}
                    />
                    <BackgroundRemoveModal
                        show={showBackgroundRemoveModal}
                        onClose={() => setShowBackgroundRemoveModal(false)}
                        openMiniUpload={() => setShowMiniUpload(true)}
                        selectedImage={selectedMiniImage}
                        onDeleteImage={handleDeleteImage}
                    />

                    {showMiniUpload &&
                        <MiniImageUploadModal
                            selectedImage={selectedMiniImage}
                            onImageSelect={handleImageSelect}
                            onClose={() => setShowMiniUpload(false)}
                        />}

                    <ImageUpscaleModal
                        show={showImageUpscaleModal}
                        onClose={() => setShowImageUpscaleModal(false)}
                    />
                    <RemoveObjectModal
                        show={showRemoveObjectModal}
                        onClose={() => setShowRemoveObjectModal(false)}
                    />
                </div>
            </IonContent>

            {/* Footer */}
            <IonFooter style={{ backgroundColor: "white", borderTop: "1px solid #DFDFDF" }}>
                <EditButtonsContainer
                    buttons={editButtons}
                    activeButtonId={activeButtonId ?? ''}
                    onButtonClick={(buttonId) => editButtons.find(btn => btn.id === buttonId)?.action()}
                />
            </IonFooter>

        </IonPage>
    );
};

export default ImageEditor;

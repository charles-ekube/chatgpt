import { IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter, IonModal, IonRouterLink } from "@ionic/react";
import { Gallery } from "iconsax-react";
import { arrowBack, chevronDownOutline, settings, settingsOutline } from "ionicons/icons";
import React, { useState } from "react";
import CustomButton from "../../../utils/Button";
import Modal from "../../../components/Modal";
import { CircularProgress } from "../../../components/workspace/CircularProgress";
import TextToImageSettingsModal from "../../../components/workspace/TextToImageSettingsModal";
import { useLocation } from "react-router";

interface AspectRatio {
    label: string;
    value: string;
}

interface ModelOption {
    name: string;
    description: string;
    image: string;
}


const TextToImage: React.FC = () => {
    const [progress, setProgress] = useState(150);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>("1:1");
    const [numberOfImages, setNumberOfImages] = useState<number>(3);
    const navigation = useIonRouter();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const styleId = params.get('styleId');


    const aspectRatios: AspectRatio[] = [
        { label: "1:1", value: "1:1" },
        { label: "1:2", value: "1:2" },
        { label: "2:1", value: "2:1" },
        { label: "2:3", value: "2:3" },
        { label: "3:4", value: "3:4" },
        { label: "4:5", value: "4:5" },
        { label: "9:16", value: "9:16" },
        { label: "3:2", value: "3:2" },
        { label: "4:3", value: "4:3" },
        { label: "16:9", value: "16:9" },
    ];

    const goBack = () => {
        navigation.goBack();
    };

    const goToImageStyle = () => {
        navigation.push('/app/image-style')
    }

    const handleIncrement = () => {
        setProgress((prev) => (prev < 200 ? prev + 1 : prev));
    };

    const handleDecrement = () => {
        setProgress((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const percentage = (progress / 200) * 100;
    const radius = 15;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const [isModalOpen, setModalOpen] = useState(false);
    const modelOptions: ModelOption[] = [
        { name: "DALL-E 3", description: "Best for reasoning. Uses image, files and text as input", image: "gpt4o.png" },
        { name: "Claude 3.5 Sonnet", description: "Great at solving problems and looking at data", image: "claude.png" },
        { name: "Flux 1.4", description: "Strong for a lot of tasks, fast too!", image: "gemini.png" },
    ];

    const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].name)


    return (
        <IonPage style={{ backgroundColor: "#F5F5F5" }}>
            <header style={{ padding: "30px 24px 20px 24px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ backgroundColor: "#E3E3E3", height: "35px", width: "35px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={goBack}>
                        <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: "17px" }}>Image Gen</h2>
                </div>
                <div>
                    <div className="version-dropdown-btn">
                        <div className="flexRow" onClick={() => setModalOpen(true)}>
                            <p>{selectedModel}</p>
                            <IonIcon src={chevronDownOutline} style={{ color: "#8C8C8C" }} />
                        </div>
                    </div>
                </div>
            </header>

            <IonContent className="ion-padding">
                <div style={{ textAlign: "center", marginTop: "150px" }}>
                    <Gallery size="32" color="#CE7651" />
                    <p style={{ fontSize: "12px", color: "#959595", marginTop: "10px" }}>Your generation history will appear here</p>
                </div>
            </IonContent>

            <TextToImageSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                numberOfImages={numberOfImages}
                onNumberOfImagesChange={setNumberOfImages}
                aspectRatios={aspectRatios}
            />

            <IonFooter className="ion-padding">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 0" }}>
                    <div className="version-dropdown-btn" style={{ margin: "0" }}>
                        <div className="flexRow" onClick={goToImageStyle}>
                            <p>{styleId ? styleId : 'Photo'}</p>
                            <IonIcon src={chevronDownOutline} style={{ color: "#8C8C8C" }} />
                        </div>
                    </div>
                    <div
                        className="version-dropdown-btn"
                        style={{ margin: "0", width: '32px', height: "32px", borderRadius: '999px', padding: '10px', fontSize: '16px' }}
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <div className="flexRow">
                            <IonIcon src={settingsOutline} style={{ color: "#313131" }} />
                        </div>
                    </div>
                </div>

                <div>
                    <textarea
                        style={{
                            border: "1px solid #DAE1EA",
                            background: "#fff",
                            padding: "16px",
                            height: "100px",
                            width: "100%",
                            borderRadius: "8px",
                            outline: "none",
                            fontSize: '14px'
                        }}
                        placeholder="Describe the image you want to generate..."
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "5px 0" }}>
                    {/* <IonRouterLink
                        routerLink="/app/image-style"
                        routerDirection="forward"
                        style={{ width: '100%' }}
                    > */}
                    <CustomButton
                        backgroundColor="#005ECA"
                        borderColor="#005ECA"
                        textColor="#ffffff"
                        onClick={() => navigation.push("/app/image-preview")}
                    >
                        Generate Image (5C)
                    </CustomButton>
                    {/* </IonRouterLink> */}

                    <div>
                        <CircularProgress
                            value={progress}
                            size={45}
                            strokeWidth={3}
                            backgroundColor="#e6e6e6"
                            progressColor="#4285f4"
                            suffix="c"
                            textStyle={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "#333"
                            }}
                        />
                    </div>
                </div>
            </IonFooter>
            {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} selectedModel={selectedModel} setSelectedModel={setSelectedModel} modelOptions={modelOptions} /> */}
        </IonPage>
    );
};

export default TextToImage;
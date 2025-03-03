import { IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter, IonModal, IonRouterLink } from "@ionic/react";
import { Add, Gallery, Trash, VideoPlay } from "iconsax-react";
import { arrowBack, chevronDownOutline, settings, settingsOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../utils/Button";
import Modal from "../../../components/Modal";
import { CircularProgress } from "../../../components/workspace/CircularProgress";
import { TextToVideoSettingsModal } from "../../../components/workspace/TextToVideoSettingsModal";
import { useLocation } from "react-router";
import MiniImageUploadModal from "../../../components/workspace/MiniUpload";

interface ModelOption {
    name: string;
    description: string;
    image: string;
}


const ImageToVideo: React.FC = () => {
    const navigation = useIonRouter();
    const [showMiniUpload, setShowMiniUpload] = useState(false);
    const [selectedMiniImage, setSelectedMiniImage] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        // console.log("Typed text:", event.target.value); // Logs the input value
    };

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


    const goBack = () => {
        navigation.goBack();
    };

    const goToImageStyle = () => {
        navigation.push('/app/video-style')
    }

    const goToVideoPreview = () => {
        navigation.push('/app/video-preview')
    }



    const [isModalOpen, setModalOpen] = useState(false);
    const modelOptions: ModelOption[] = [
        { name: "DALL-E 3", description: "Best for reasoning. Uses image, files and text as input", image: "gpt4o.png" },
        { name: "Claude 3.5 Sonnet", description: "Great at solving problems and looking at data", image: "claude.png" },
        { name: "Flux 1.4", description: "Strong for a lot of tasks, fast too!", image: "gemini.png" },
    ];

    const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].name)



    return (
        <IonPage style={{ backgroundColor: "#F5F5F5" }}>
            <header style={{ padding: "30px 24px 20px 24px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ backgroundColor: "#E3E3E3", height: "35px", width: "35px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={goBack}>
                        <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: "17px" }}>Image to Video</h2>
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

                <div style={{ margin: '40px 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        background: '#CED6F3', height: '22px', width: '22px', borderRadius: '999px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <p style={{ color: '#1336B4', fontSize: '11px' }}>1</p>
                    </div>
                    <p style={{ color: '#1336B4', fontSize: '11px' }}>Add an image</p>
                </div>
                {selectedMiniImage ?

                    <div style={{
                        border: '1px solid #DAE1EA',
                        background: '#fff',
                        borderRadius: '8px',
                        height: '47px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 16px'
                    }}>

                        <img src={selectedMiniImage} style={{
                            height: '24px',
                            width: '24px',
                            borderRadius: '4px',
                        }} />

                        <p style={{
                            color: '#747474',
                            fontSize: '13px'
                        }}
                            onClick={() => setShowMiniUpload(true)}
                        >Change image</p>

                        <Trash color='#747474' onClick={handleDeleteImage} />

                    </div>

                    :
                    <div>
                        <div style={{
                            border: '1px solid #DAE1EA',
                            height: '156px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',


                        }}>
                            <div style={{
                                border: '1px solid #E6E6E6',
                                height: '40px',
                                width: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#fff',
                                borderRadius: '999px'
                            }}>
                                <div style={{
                                    border: '1px solid #005ECA',
                                    height: '20px',
                                    width: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#005ECA',
                                    borderRadius: '999px'
                                }}>
                                    <Add color="white" size={24} onClick={() => setShowMiniUpload(true)} />
                                </div>
                            </div>
                        </div>
                    </div>}
                <div style={{
                    border: '1px solid #D0D9FC',
                    height: '180px',
                    background: '#D0D9FC',
                    width: '1px',
                    marginLeft: '8px',
                    marginTop: '20px'
                }} />


            </IonContent>


            <IonFooter className="ion-padding">
                <div>
                    <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            background: text ? '#CED6F3' : '#DEDEDE', height: '22px', width: '22px', borderRadius: '999px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <p style={{ color: text ? '#1336B4' : '#B7B7B7', fontSize: '11px' }}>2</p>
                        </div>
                        <p style={{ color: text ? '#1336B4' : '#B7B7B7', fontSize: '11px' }}>Input prompt</p>
                    </div>

                    <textarea
                        style={{
                            border: "1px solid #DAE1EA",
                            background: "#fff",
                            padding: "16px",
                            height: "150px",
                            width: "100%",
                            borderRadius: "8px",
                            outline: "none",
                            fontSize: '14px'
                        }}
                        placeholder="Describe the video you want to generate..."
                        value={text} // Controlled input
                        onChange={handleChange} // Tracks typing event
                    />
                    <p style={{ color: '#1B42D2', fontSize: '11px', textAlign: 'right', padding: '6px 0 16px 0' }}>Generate video without image</p>
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
                        onClick={goToVideoPreview}
                    >
                        Generate Video (20C)
                    </CustomButton>
                    {/* </IonRouterLink> */}

                    <div>
                        <CircularProgress
                            value={150}
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
            {showMiniUpload &&
                <MiniImageUploadModal
                    selectedImage={selectedMiniImage}
                    onImageSelect={handleImageSelect}
                    onClose={() => setShowMiniUpload(false)}
                />}
            {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} selectedModel={selectedModel} setSelectedModel={setSelectedModel} modelOptions={modelOptions} /> */}
        </IonPage>
    );
};

export default ImageToVideo;
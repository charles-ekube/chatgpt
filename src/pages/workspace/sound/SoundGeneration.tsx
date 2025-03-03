import { IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter, IonModal, IonRouterLink, IonRow, IonCol, IonSpinner, IonText, IonButton, IonRange, IonChip, IonAvatar, IonLabel } from "@ionic/react";
import { Gallery, Import, Play } from "iconsax-react";
import { arrowBack, chevronDownOutline, downloadOutline, playOutline, refreshOutline, settings, settingsOutline, shareOutline, shareSocialOutline, timerOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../utils/Button";
// import Modal from "../../../components/Modal";
import { CircularProgress } from "../../../components/workspace/CircularProgress";
import { TextToSpeechSettingsModal } from "../../../components/workspace/TextToSpeechSettingsModal";



interface ModelOption {
    name: string;
    description: string;
    image: string;
}




const SoundGeneration: React.FC = () => {
    const [progress, setProgress] = useState(150);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>("1:1");
    const [numberOfImages, setNumberOfImages] = useState<number>(3);
    const navigation = useIonRouter();


    const goBack = () => {
        navigation.goBack();
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const modelOptions: ModelOption[] = [
        { name: "DALL-E 3", description: "Best for reasoning. Uses image, files and text as input", image: "gpt4o.png" },
        { name: "Claude 3.5 Sonnet", description: "Great at solving problems and looking at data", image: "claude.png" },
        { name: "Flux 1.4", description: "Strong for a lot of tasks, fast too!", image: "gemini.png" },
    ];

    const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].name)



    const [text, setText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGenerated, setIsGenerated] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<string>('0:01');
    const [totalTime, setTotalTime] = useState<string>('0:03');
    const [voiceName, setVoiceName] = useState<string>('Alice');


    const generateSpeech = () => {
        setIsLoading(true);
        setIsGenerated(false);

        // Simulate processing time (10 seconds as requested)
        setTimeout(() => {
            setIsLoading(false);
            setIsGenerated(true);
        }, 10000);
    };

    useEffect(() => {
        // Reset component if text changes
        setIsGenerated(false);
    }, [text]);


    return (
        <IonPage style={{ backgroundColor: "#F5F5F5" }}>
            <header style={{ padding: "30px 24px 20px 24px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ backgroundColor: "#E3E3E3", height: "35px", width: "35px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={goBack}>
                        <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: "17px" }}>Sound Generation</h2>
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
                <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: isGenerated ? 'flex-start' : "center" }}>

                    {isLoading && (
                        <div className="loading-container">
                            <IonSpinner name="circular" style={{ color: '#436BFF' }} />

                            <h2 style={{ color: '#1B42D2', fontSize: '20px' }}>Hold on please...</h2>

                        </div>
                    )}


                    {isGenerated && (
                        <div className="audio-player-container">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                <div className="player-controls">
                                    <div style={{
                                        height: '40px',
                                        width: '40px',
                                        padding: '10px',
                                        borderRadius: '999px',
                                        backgroundColor: '#005ECA',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",

                                    }}>

                                        <Play
                                            size="32"
                                            color="#FFF"
                                            variant="Bold"

                                        />
                                    </div>
                                    <div className="time-display">
                                        {currentTime}/{totalTime}
                                    </div>
                                </div>
                                <div style={{
                                    height: '32px',
                                    width: '32px',
                                    padding: '10px',
                                    borderRadius: '999px',
                                    border: '1px solid #E2E2E2',
                                    backgroundColor: '#FDFDFD',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    fontSize: '20px'
                                }}>
                                    <Import
                                        color="#313131"
                                        size={100}
                                    />

                                </div>


                            </div>

                            <IonRange
                                value={progress}
                                color="primary"
                                className="audio-progress"
                            />

                            <div className="audio-meta">
                                <div className="generated-by">
                                    <p style={{ color: '#BCBCBC', fontSize: '12px' }}>Generated by</p>
                                    {/* <IonChip>
                                        <IonAvatar>
                                            <div className="voice-avatar">{voiceName.charAt(0)}</div>
                                        </IonAvatar>
                                        <IonLabel>{voiceName}</IonLabel>
                                    </IonChip> */}
                                </div>

                                <div className="audio-actions">
                                    <div style={{
                                        height: '32px',
                                        width: '32px',
                                        padding: '10px',
                                        borderRadius: '999px',
                                        border: '1px solid #E2E2E2',
                                        backgroundColor: '#FDFDFD',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        fontSize: '20px'
                                    }}>

                                        <IonIcon icon={timerOutline} />
                                    </div>

                                    <div style={{
                                        height: '32px',
                                        width: '32px',
                                        padding: '10px',
                                        borderRadius: '999px',
                                        border: '1px solid #E2E2E2',
                                        backgroundColor: '#FDFDFD',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        fontSize: '20px'
                                    }}>
                                        <IonIcon icon={shareSocialOutline} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}


                    {!isGenerated && !isLoading && (
                        <>
                            <h3 style={{ fontSize: "22px", fontWeight: 500, color: "#1B42D2", textAlign: "center" }}>What would you like to hear...</h3>

                            <IonRow className="ion-padding ion-justify-content-center">
                                <IonCol size="12">
                                    <div className="questions-container">
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <div className="question-button" style={{ textWrap: 'nowrap' }}>How much to own a yacht</div>
                                            <div className="question-button" style={{ textWrap: 'nowrap' }}>Best basketball team in the world</div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr', gap: '10px' }}>
                                            <div className="question-button" style={{ textWrap: 'nowrap' }}>Is coronavirus completely gone?</div>
                                            <div className="question-button" style={{ textWrap: 'nowrap' }}>Who owns Coca Cola</div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr', gap: '10px' }}>
                                            <div className="question-button" style={{ textWrap: 'nowrap' }}>What was Michael Jackson’s net worth</div>
                                            <div className="question-button" style={{ textWrap: 'nowrap' }}>Are zombies real?</div>
                                        </div>


                                    </div>
                                </IonCol>
                            </IonRow>
                        </>

                    )}
                </div>



            </IonContent>



            <IonFooter className="ion-padding">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 0" }}>
                    <div
                        className="version-dropdown-btn"
                        style={{ margin: "0", width: '32px', height: "32px", borderRadius: '999px', padding: '10px', fontSize: '16px' }}
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <div className="flexRow">
                            <IonIcon src={settingsOutline} style={{ color: "#313131" }} />

                        </div>
                    </div>
                    <div
                        className="version-dropdown-btn"
                        style={{ margin: "0", width: '32px', height: "32px", borderRadius: '999px', padding: '10px', fontSize: '16px' }}
                    // onClick={() => setIsSettingsOpen(true)}
                    >
                        <div className="flexRow">
                            <IonIcon src={timerOutline} style={{ color: "#313131" }} />
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
                        // onClick={() => navigation.push("/app/image-preview")}
                        onClick={generateSpeech}
                        disabled={isLoading}
                    >
                        Generate Sound (5C)
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
            <TextToSpeechSettingsModal
                show={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
            {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} selectedModel={selectedModel} setSelectedModel={setSelectedModel} modelOptions={modelOptions} /> */}
        </IonPage >
    );
};

export default SoundGeneration;
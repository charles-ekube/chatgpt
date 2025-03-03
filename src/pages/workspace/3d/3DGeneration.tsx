import { IonContent, IonFooter, IonIcon, IonPage, useIonRouter, IonSpinner } from "@ionic/react";
import { I3DCubeScan } from "iconsax-react";
import { arrowBack, chevronDownOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../utils/Button";
// import Modal from "../../../components/Modal";
import { CircularProgress } from "../../../components/workspace/CircularProgress";

interface AspectRatio {
    label: string;
    value: string;
}

interface ModelOption {
    name: string;
    description: string;
    image: string;
}


const ThreeDGeneration: React.FC = () => {
    const [progress, setProgress] = useState(150);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>("1:1");
    const [numberOfImages, setNumberOfImages] = useState<number>(3);
    const navigation = useIonRouter();



    const goBack = () => {
        navigation.goBack();
    };

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

    const [text, setText] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].name)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGenerated, setIsGenerated] = useState<boolean>(false);

    const generateSpeech = () => {
        setIsLoading(true);
        setIsGenerated(false);

        // Simulate processing time (10 seconds as requested)
        setTimeout(() => {
            setIsLoading(false);
            setIsGenerated(true);
            navigation.push('/app/3d-preview')
        }, 10000);
    };

    useEffect(() => {
        // Reset component if text changes
        setIsGenerated(false);
    }, [text]);


    return (
        <IonPage style={{ backgroundColor: "#F5F5F5" }}>
            <header style={{ padding: "30px 24px 20px 24px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ backgroundColor: "#E3E3E3", height: "35px", width: "35px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={goBack}>
                        <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: "17px" }}>3D Generation</h2>
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
                {isLoading ? (
                    <div className="loading-container" style={{
                        height: '300px', width: '300px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', background: '#E1E1E1',
                        margin: '40px auto'
                    }}>
                        <IonSpinner name="circular" style={{ color: '#436BFF' }} />

                        {/* <h2 style={{ color: '#1B42D2', fontSize: '20px' }}>Hold on please...</h2> */}

                    </div>
                ) :
                    (
                        <div style={{ textAlign: "center", marginTop: "150px" }}>

                            <I3DCubeScan
                                size="32"
                                color="#198F26"
                            />
                            <p style={{ fontSize: "12px", color: "#959595", marginTop: "10px" }}>Your generation history will appear here</p>
                        </div>
                    )
                }

            </IonContent>


            <IonFooter className="ion-padding">
                {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 0" }}>
                    <div className="version-dropdown-btn" style={{ margin: "0" }}>
                        <div className="flexRow" >
                            <p>Photo</p>
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
                </div> */}

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
                        placeholder="Describe the video you want to generate..."
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
                        onClick={generateSpeech}
                    // onClick={() => navigation.push("/app/image-preview")}
                    >
                        Generate 3D Model (20C)
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

export default ThreeDGeneration;
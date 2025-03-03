declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}



import React, { ChangeEvent, useRef, useState } from "react";
import { IonContent, IonPage, IonButtons, IonMenuButton, IonLabel, IonRow, IonCol, IonIcon, IonFooter, useIonRouter, IonButton } from "@ionic/react";
import { chevronDownOutline, contract, sparklesOutline, bookOutline } from "ionicons/icons";
import { Add, Cpu, DocumentText, Gallery, Global, Microphone2, SearchNormal, Sound, VoiceSquare } from "iconsax-react";
import Modal from "../../components/Modal";
import { useModelSelector } from "../../hooks/useModelSelector";
// import "./App.css"; // Add custom CSS if needed


interface ModelOption {
    name: string;
    description: string;
    image: string;
}


interface FilePreview {
    type: 'file' | 'image' | 'audio' | 'recording';
    name: string;
    preview?: string;
    url?: string;

}




interface RecordingState {
    isRecording: boolean;
    audioUrl?: string;
}


const Home: React.FC = () => {
    const isActive = (path: string) => window.location.pathname === path;
    const [isModalOpen, setModalOpen] = useState(false);
    const [openFile, setOpenFile] = useState(false);

    const toggleFile = () => {
        setOpenFile(!openFile)
    }
    const navigation = useIonRouter()

    const goToHome = () => {
        navigation.push('/app/home', 'root')
    }

    const goToDiscovery = () => {
        navigation.push('/app/discovery', 'root')
    }
    const goToWorkspace = () => {
        navigation.push('/app/workspace', 'root')
    }

    const modelOptions: ModelOption[] = [
        { name: "OpenAI GPT-4o", description: "Best for reasoning. Uses image, files and text as input", image: "gpt4o.png" },
        { name: "Claude 3.5 Sonnet", description: "Great at solving problems and looking at data", image: "claude.png" },
        { name: "Gemini Pro 1.5", description: "Strong for a lot of tasks, fast too!", image: "gemini.png" },
    ];


    const { isOpen, setIsOpen, providers, loading, selectModel, selectedModel } = useModelSelector({
        type: 'chatbot',
        onSelect: (model) => {
            console.log('Selected Model:', model);
        },
        defaultModel: {
            id: 'gpt-4o',
            name: 'OpenAI GPT-4o',
            type: 'chatbot',
            provider: {
                providerLogoUrl: 'https://firebasestorage.googleapis.com/v0/b/chatgptpp-7d9f2.appspot.com/o/icons%2Fopenai%2Fpng%2Fopenai-logomark.png?alt=media&token=6b39a1d6-3094-4680-a3b2-eae31e9db2ad',
                providerName: '',
                models: []
            }
        }
    });


    // const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].name)


    const [text, setText] = useState<string>('');
    const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);
    const [message, setMessage] = useState('');

    const [recordingState, setRecordingState] = useState<RecordingState>({
        isRecording: false
    });


    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview({
                    type: 'image',
                    name: file.name,
                    preview: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('audio/')) {
            setFilePreview({
                type: 'audio',
                name: file.name
            });
        } else {
            setFilePreview({
                type: 'file',
                name: file.name
            });
        }
    };

    const clearContent = () => {
        setText('');
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = '35px';
        }
        // Stop recording if active
        // if (isRecording) {
        //     stopRecording();
        // }
    };

    const triggerFileUpload = (acceptType: string) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = acceptType;
            fileInputRef.current.click();
        }
    };

    // Just before clicking:
    // console.log('Recording state before click:', recordingState);



    const initSpeechRecognition = () => {
        // Check if speech recognition is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.log("Speech recognition is not supported in this browser")
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // You can make this configurable

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map(result => result.transcript)
                .join('');

            setMessage(prevMessage => prevMessage + ' ' + transcript);
        };

        recognition.onerror = (event: any) => {
            console.error(event.error);
            setIsListening(false);
            console.log("Error occurred in speech recognition")
        };

        setRecognition(recognition);
    };

    const toggleListening = () => {
        if (!recognition) {
            initSpeechRecognition();
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };



    return (
        <IonPage>
            <header style={{ padding: " 16px", background: '#F5F5F5', borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IonButtons slot="start">
                    <IonMenuButton>
                        <div className="menu-button">
                            <div className="menu-line" id="first-bar"></div>
                            <div className="menu-line" id="second-bar"></div>
                            <div className="menu-line" id="third-bar"></div>
                        </div>
                    </IonMenuButton>
                </IonButtons>
                <div className={"version-dropdown-btn"}>
                    {!isModalOpen ? (
                        <div className={"flexRow"} onClick={() => setModalOpen(true)}>
                            <p>{selectedModel?.id}</p>
                            <IonIcon src={chevronDownOutline} style={{ color: "#8C8C8C" }} />
                        </div>
                    ) : (
                        <IonIcon src={contract} style={{ color: "#313131" }} size="medium" onClick={() => setModalOpen(false)} />
                    )}
                </div>
                <div
                    style={{
                        background: "#ffe2b5",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: 'relative'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        borderRadius: '999px',
                        backgroundColor: '#0B8800',
                        bottom: '2px',
                        right: '3px'

                    }} />
                    <IonLabel style={{ fontWeight: "bold", color: "#000" }}>D</IonLabel>
                </div>
            </header>

            <IonContent className="ion-align-items-center ion-justify-content-center" style={{ '--background': '#F5F5F5' }}>
                <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: 500, color: "#1B42D2", textAlign: "center" }}>What’s on your mind</h3>



                    <IonRow className="ion-padding ion-justify-content-center">
                        <IonCol size="12">
                            <div className="questions-container">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                                    <div className="question-button" style={{ textWrap: 'nowrap', textAlign: 'center' }}>How much to own a yacht</div>
                                    <div className="question-button" style={{ textWrap: 'nowrap', textAlign: 'center' }}>Best basketball team in the world</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                                    <div className="question-button" style={{ textWrap: 'nowrap', textAlign: 'center' }}>Is coronavirus completely gone?</div>
                                    <div className="question-button" style={{ textWrap: 'nowrap', textAlign: 'center' }}>Who owns Coca Cola</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                                    <div className="question-button" style={{ textWrap: 'nowrap', textAlign: 'center' }}>What was Michael Jackson’s net worth</div>
                                    <div className="question-button" style={{ textWrap: 'nowrap', textAlign: 'center', width: "auto" }}>Are zombies real?</div>
                                </div>


                            </div>
                        </IonCol>
                    </IonRow>
                </div>



                {/* <button className="open-modal-button" onClick={() => setModalOpen(true)}>
                    Open Modal
                </button> */}


            </IonContent>

            <IonFooter style={{ '--background': 'transparent', '--box-shadow': 'none' }}>
                <div id={"homeFooter"}>
                    <div id="chatInputMainContainer">
                        <div id={"chatInputContainer"}>
                            <textarea id={"chatInput"} style={{ height: message === '' ? '35px' : 'auto', padding: '0', color: '000' }} ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask me anything..."></textarea>


                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />

                            {filePreview && (
                                <div className="preview-container">
                                    {filePreview.type === 'image' && (
                                        <img
                                            src={filePreview.preview}
                                            alt="Preview"
                                            style={{ maxHeight: '100px', maxWidth: '100px' }}
                                        />
                                    )}
                                    {filePreview.type === 'audio' && (
                                        <div className="audio-preview" style={{ fontSize: "10px", color: '#4A4A4A' }}>
                                            🎵 {filePreview.name}
                                        </div>
                                    )}
                                    {filePreview.type === 'recording' && (
                                        <div className="audio-preview">
                                            🎤 {filePreview.name}
                                            {filePreview.url && (
                                                <audio controls src={filePreview.url} style={{ marginLeft: '10px' }} />
                                            )}
                                        </div>
                                    )}
                                    {filePreview.type === 'file' && (
                                        <div style={{ fontSize: "10px", color: '#4A4A4A' }}>
                                            📄 {filePreview.name}
                                        </div>
                                    )}


                                    <IonButton
                                        fill="clear"
                                        onClick={() => setFilePreview(null)}
                                        className="remove-preview"
                                    >
                                        ✕
                                    </IonButton>
                                </div>
                            )}





                            <div id={'bottomChatInputContainer'}>
                                <div id={'bottomChatInputLeftContainer'}>
                                    <div id={"addFilleBtnContainer"} style={{ backgroundColor: openFile ? '#005ECA' : "#1e1e1e" }}>
                                        <Add size="20" color="#EEF3F9" onClick={toggleFile} />
                                        {openFile &&
                                            <div id={"floatingMenu"} className={openFile ? 'open' : ''}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }} onClick={() => {
                                                    triggerFileUpload('image/*')
                                                    toggleFile()
                                                }}>
                                                    <Gallery color="#5D6993" size={'16'} />
                                                    <p style={{ color: '#4A4A4A', fontSize: '11px', fontWeight: 500 }}>Images</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }} onClick={() => {
                                                    triggerFileUpload('.pdf,.doc,.docx,.txt')
                                                    toggleFile()
                                                }}>
                                                    <DocumentText size="16" color="#5D6993" />
                                                    <p style={{ color: '#4A4A4A', fontSize: '11px', fontWeight: 500 }}>Files</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }} onClick={() => {
                                                    triggerFileUpload('audio/*')
                                                    toggleFile()
                                                }}>
                                                    <VoiceSquare size="16" color="#5D6993" />
                                                    <p style={{ color: '#4A4A4A', fontSize: '11px', fontWeight: 500 }}>Audio</p>
                                                </div>
                                            </div>}
                                    </div>
                                    <div id={"speechBtnContainer"} style={{ backgroundColor: "inherit", border: '1px solid #D0D0D0', gap: '5px' }}>
                                        <Global size="18" color="#363636" />
                                        <p style={{ fontSize: '12px', fontWeight: 500, color: '#525252' }}>Search</p>
                                    </div>
                                    <div id={"speechBtnContainer"} style={{ backgroundColor: "inherit", border: '1px solid #D0D0D0', gap: '5px' }}>

                                        <Cpu size="18" color="#363636" />
                                        <p style={{ fontSize: '12px', fontWeight: 500, color: '#525252' }}>Reason</p>
                                    </div>
                                </div>
                                <div id={'bottomChatInputRightContainer'}>
                                    <div id={"speechBtnContainer"} style={{ backgroundColor: "inherit", border: '1px solid #D0D0D0', gap: '5px' }} onClick={toggleListening}>
                                        <Microphone2 size="20" color="#363636" />
                                        {/* <Microphone2 size="20" color={isRecording ? "#ff4444" : "#363636"} /> */}

                                    </div>
                                    <div id={"speechBtnContainer"} style={{ backgroundColor: "#4D4D4D", border: '1px solid #D0D0D0', gap: '5px' }}>
                                        <Sound size="18" color="#FFFFFF" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Tabs /> */}
                    <div id={"chatInputMainContainer"} style={{ paddingTop: '0' }}>
                        <div id={"bottomNavigatorContainer"}>
                            <div>

                                <button
                                    style={{
                                        color: isActive("/app/home") ? "#1B42D2" : "#5D6993",
                                    }}
                                    onClick={goToHome}
                                >
                                    <SearchNormal size="20" />
                                    <p>Home</p>
                                </button>


                            </div>

                            <div>

                                <button
                                    style={{
                                        color: isActive("/app/workspace") ? "#1B42D2" : "#5D6993",
                                    }}
                                    onClick={goToWorkspace}
                                >
                                    <IonIcon icon={sparklesOutline} style={{ height: "20px", width: "20px" }} />
                                    <p>Workspace</p>
                                </button>

                            </div>

                            <div>

                                <button
                                    style={{
                                        color: isActive("/app/discovery") ? "#1B42D2" : "#5D6993",
                                    }}
                                    onClick={goToDiscovery}
                                >
                                    <IonIcon icon={bookOutline} style={{ height: "20px", width: "20px" }} />
                                    <p>Discovery</p>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </IonFooter>
            <Modal isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                providers={providers}
                loading={loading}
                onSelect={(model) => {
                    selectModel(model);
                }}
            />

        </IonPage>
    );
};

export default Home;

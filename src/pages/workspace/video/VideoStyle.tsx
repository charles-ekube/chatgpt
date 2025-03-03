import React, { useState, useMemo, useEffect } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonIcon,
    useIonRouter,
} from '@ionic/react';
import { Check } from 'lucide-react';
import { DiscoveryImage } from '../../../assets/images';
import { arrowBack, chevronDownOutline, searchOutline } from 'ionicons/icons';
import Modal from '../../../components/Modal';

interface StyleOption {
    id: string;
    title: string;
    image: string;
}

const styleOptions: StyleOption[] = [
    {
        id: '1',
        title: 'Realistic',
        image: '/api/placeholder/400/320',
    },
    {
        id: '2',
        title: 'Illustration',
        image: '/api/placeholder/400/320',
    },
    {
        id: '3',
        title: 'Abstract',
        image: '/api/placeholder/400/320',
    },
    {
        id: '4',
        title: 'Material',
        image: '/api/placeholder/400/320',
    }
];

interface ModelOption {
    name: string;
    description: string;
    image: string;
}


const VideoStyle: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [selectedStyle, setSelectedStyle] = useState<string>(styleOptions[0].id);

    const filteredStyles = useMemo(() => {
        return styleOptions.filter(style =>
            style.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText]);

    useEffect(() => {
        // If the selected style is not in the filtered list, select the first filtered item
        if (filteredStyles.length > 0 && !filteredStyles.find(style => style.id === selectedStyle)) {
            setSelectedStyle(filteredStyles[0].id);
        }
    }, [filteredStyles, selectedStyle]);

    const [isModalOpen, setModalOpen] = useState(false);
    const modelOptions: ModelOption[] = [
        { name: "DALL-E 3", description: "Best for reasoning. Uses image, files and text as input", image: "gpt4o.png" },
        { name: "Claude 3.5 Sonnet", description: "Great at solving problems and looking at data", image: "claude.png" },
        { name: "Flux 1.4", description: "Strong for a lot of tasks, fast too!", image: "gemini.png" },
    ];

    const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].name)
    const navigation = useIonRouter();

    const goBack = () => {
        navigation.goBack();
    };

    const goToImageStyle = (styleId: string) => {
        navigation.push(`/app/text-to-video?styleId=${styleId}`);
    };

    return (
        <IonPage>
            <header style={{ padding: "30px 24px 20px 24px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ backgroundColor: "#E3E3E3", height: "35px", width: "35px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={goBack}>
                        <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: "17px" }}>Video Style</h2>
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
                <div id='menuSearchContainer' style={{ margin: '26px 0', padding: '16px' }}>
                    <IonIcon src={searchOutline} style={{ color: '#525252', fontSize: '20px' }} />
                    <input
                        type="text"
                        placeholder="Search for a style"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            border: "none",
                            background: "transparent",
                            outline: "none",
                            fontSize: "16px",
                            width: "100%"
                        }}
                    />
                </div>

                <div className="style-grid">
                    {filteredStyles.map((style) => (
                        <div key={style.id} className="style-card" onClick={() => {
                            setSelectedStyle(style.id)
                            goToImageStyle(style.title)
                            sessionStorage.setItem('styleId', style.title);
                        }}>
                            <img src={DiscoveryImage} alt={style.title} className="style-image" />
                            {selectedStyle === style.id && (
                                <div className="selected-indicator">
                                    <Check className="check-icon" />
                                </div>
                            )}
                            <div className="style-title-container">
                                <span className="style-title">{style.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </IonContent>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} selectedModel={selectedModel} setSelectedModel={setSelectedModel} modelOptions={modelOptions} />

        </IonPage>
    );
};

export default VideoStyle;


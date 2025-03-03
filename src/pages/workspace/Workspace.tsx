import React, { useState } from "react";
import { IonContent, IonPage, IonFooter, IonIcon, useIonRouter, IonItem } from "@ionic/react";
import { searchOutline, sparklesOutline, bookOutline } from "ionicons/icons";
import { SearchNormal } from "iconsax-react";
import { DiscoveryImage } from "../../assets/images";
import { CircularProgress } from "../../components/workspace/CircularProgress";

const Workspace: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState("All tools");
    const navigation = useIonRouter()
    const [searchTerm, setSearchTerm] = useState("");

    const goToHome = () => {
        navigation.push('/app/home', 'root')
    }

    const goToDiscovery = () => {
        navigation.push('/app/discovery', 'root')
    }
    const goToWorkspace = () => {
        navigation.push('/app/workspace', 'root')
    }

    const [progress, setProgress] = useState(150);

    // Function to update progress
    const handleIncrement = () => {
        setProgress((prev) => (prev < 200 ? prev + 1 : prev)); // Increment by 1, max is 200
    };

    const handleDecrement = () => {
        setProgress((prev) => (prev > 0 ? prev - 1 : prev)); // Decrement by 1, min is 0
    };

    // Calculate the percentage of progress (0-100).
    const percentage = (progress / 200) * 100;

    // Define SVG properties.
    const radius = 15; // Radius of the circle
    const strokeWidth = 5; // Stroke width
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const offset = circumference - (percentage / 100) * circumference; // Offset for the stroke-dasharray


    const isActive = (path: string) => window.location.pathname === path;



    const filters = ["All tools", "Image tools", "Video tools", "Audio tools"];

    const tools = [
        { id: "text-to-image", title: "Text to Image", category: "Image tools", image: DiscoveryImage, url: '/app/text-to-image' },
        { id: "ai-image-editor", title: "AI Image Editor", category: "Image tools", image: DiscoveryImage, url: '/app/image-editor' },
        { id: "text-to-video", title: "Text to Video", category: "Video tools", image: DiscoveryImage, url: '/app/text-to-video' },
        { id: "image-to-video", title: "Image to Video", category: "Video tools", image: DiscoveryImage, url: '/app/image-to-video' },
        { id: "3d-modelling", title: "3D Modelling", category: "Image tools", image: DiscoveryImage, url: '/app/3d-generation' },
        { id: "text-to-speech", title: "Text to Speech", category: "Audio tools", image: DiscoveryImage, url: '/app/text-to-speech' },
        { id: "sound-generation", title: "Audio Generation", category: "Audio tools", image: DiscoveryImage, url: '/app/sound-generation' },

    ];
    // const filteredTools = activeFilter === "All tools" ? tools : tools.filter(tool => tool.category === activeFilter);

    const filteredTools = tools.filter(tool => {
        const matchesCategory = activeFilter === "All tools" || tool.category === activeFilter;
        const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <IonPage>
            <header style={{ padding: "16px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ color: "#313131", fontWeight: 600 }}>WorkSpace</h2>
                <CircularProgress
                    value={progress}
                    size={40}
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
            </header>

            <IonContent className="ion-padding" style={{ '--background': '#f5f5f5' }}>
                {/* Search Bar */}
                <div id='menuSearchContainer' style={{ marginTop: '16px' }}>
                    <IonIcon src={searchOutline} style={{ color: '#525252', fontSize: '20px' }} />
                    <input
                        type="text"
                        placeholder="Search tools"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: "none",
                            background: "transparent",
                            outline: "none",
                            fontSize: "16px",
                            width: "100%"
                        }}
                    />
                </div>

                {/* Filter Section */}
                <div style={{
                    display: "flex", gap: "8px", margin: "30px 0", overflowX: 'auto',
                    minWidth: '300px',
                }}>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                backgroundColor: activeFilter === filter ? "#436BFF" : "#EEF3F9",
                                color: activeFilter === filter ? "#FFF" : "#313131",
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: activeFilter === filter ? "#436BFF" : '#ECECEC',
                                padding: "10px 14px",
                                borderRadius: "20px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: 500,
                                fontSize: '10px',
                                textWrap: 'nowrap'
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Filtered Tools Display */}
                <div className="ion-padding-vertical">
                    {filteredTools.map(tool => (
                        <div key={tool.id} id={'workspaceCardContainer'}
                            onClick={() => navigation.push(tool?.url ?? '')}
                            style={{
                                minHeight: '120px', // Set a minimum height for the container
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '12px'
                            }}
                        >
                            {/* <img src={tool.image} alt={tool.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '6px' }} /> */}
                            <img
                                src={tool.image}
                                alt={tool.title}
                                style={{
                                    height: '100%',
                                    width: 'auto', // Allow width to adjust based on image aspect ratio
                                    objectFit: 'contain',
                                    borderRadius: '6px',
                                    transition: 'opacity 0.3s ease-in-out'
                                }}
                                onLoad={() => {
                                    // Remove placeholder styles after image loads
                                    const cardContainer = document.getElementById('workspaceCardContainer');
                                    if (cardContainer) {
                                        cardContainer.style.minHeight = 'auto'; // Remove minimum height
                                    }
                                }}
                            // Initially hide the image
                            />
                            <div id={'workspaceCardContainerOverlay'} style={{ borderRadius: '6px' }}>
                                <p style={{ color: '#E9E9E9', fontWeight: 500, fontSize: '15px', lineHeight: '40px' }}>{tool.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </IonContent>

            <IonFooter>
                <div id={"homeFooter"}>
                    <div id={"chatInputMainContainer"} style={{ paddingTop: '10px' }}>
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
        </IonPage>
    );
};

export default Workspace;

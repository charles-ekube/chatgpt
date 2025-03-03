import { IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { Import } from 'iconsax-react';
import { arrowBack, ellipsisVertical, optionsOutline } from 'ionicons/icons';
import React, { useState, useRef, useEffect } from 'react';
import { CircularProgress } from '../../../components/workspace/CircularProgress';
import CustomButton from '../../../utils/Button';
import { useVideoDownload } from '../../../services/videoDownloader';
import MyVideo from '../../../assets/videos/video.mp4'
import CustomVideoPlayer from '../../../hooks/CustomVideoPlayer';

interface VideoPreviewProps {
    videoUrl?: string; // Add this prop to accept video URL
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl = 'default-video-url.mp4' }) => {
    const [progress, setProgress] = useState(150);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigation = useIonRouter();

    const goBack = () => {
        navigation.goBack();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropdownItemClick = (action: string) => {
        switch (action) {
            case 'post':
                console.log('Post on discovery');
                break;
            case 'rename':
                console.log('Rename');
                break;
            case 'delete':
                console.log('Delete');
                break;
        }
        setShowDropdown(false);
    };

    // const handleDownloadVideo = () => {
    //     const link = document.createElement("a");
    //     link.href = videoUrl;
    //     link.download = "video-preview.mp4";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const goToVideoEditor = () => {
        const encodedUrl = encodeURIComponent(videoUrl);
        navigation.push(`/app/video-editor?videoUrl=${encodedUrl}`);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };



    const { downloadVideoWithProgress } = useVideoDownload();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadVideo = async () => {
        try {
            setIsDownloading(true);
            await downloadVideoWithProgress(MyVideo, 'my-video');
            // Show success message
        } catch (error) {
            // Show error message
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };


    return (
        <IonPage style={{ backgroundColor: '#F5F5F5' }}>
            <header style={{ padding: "30px 24px 20px 24px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        onClick={goBack}
                        style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: '17px' }}>Video Preview</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Import size="28" color="#313131" onClick={handleDownloadVideo} />
                    {/* Dropdown menu */}
                    <div style={{ height: '40px', position: 'relative' }} ref={dropdownRef}>
                        <IonIcon
                            src={ellipsisVertical}
                            style={{ color: '#141B34', height: '40px', fontSize: '26px', cursor: 'pointer' }}
                            onClick={() => setShowDropdown(!showDropdown)}
                        />
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '45px',
                                right: '0',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                minWidth: '150px',
                                zIndex: 1000,
                            }}>
                                {/* Dropdown items */}
                                <div onClick={() => handleDropdownItemClick('post')} style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #ECECEC', color: "#4A4A4A", fontSize: '11px' }}>
                                    Post on Discovery
                                </div>
                                <div onClick={() => handleDropdownItemClick('rename')} style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #ECECEC', color: '#4A4A4A', fontSize: '11px' }}>
                                    Rename
                                </div>
                                <div onClick={() => handleDropdownItemClick('delete')} style={{ padding: '12px 16px', cursor: 'pointer', color: '#4A4A4A', fontSize: '11px' }}>
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <IonContent className="ion-padding">
                <div style={{ textAlign: 'center', position: 'relative' }}>
                    {/* <video
                        ref={videoRef}
                        style={{
                            width: '100%',
                            height: '334px',
                            objectFit: 'contain',
                            backgroundColor: '#000'
                        }}
                        src={MyVideo}
                        controls // Add native video controls
                        onClick={togglePlay}
                    /> */}
                    <CustomVideoPlayer
                        src={MyVideo}
                        generatedBy="Eleven Flux"
                    />
                </div>
            </IonContent>
            {/* <IonFooter className={'ion-padding'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 0' }}>
                    <div style={{ width: '70%' }}>
                        <CustomButton
                            backgroundColor="#005ECA"
                            borderColor='#005ECA'
                            textColor="#ffffff"
                            icon={<Import size="20" color="#FFF" />}
                            onClick={handleDownloadVideo}
                        >
                            Download Video
                        </CustomButton>
                    </div>
                    <div style={{ width: '30%' }}>
                        <CustomButton
                            backgroundColor="inherit"
                            borderColor='#BEBEBE'
                            textColor="#313131"
                            icon={<IonIcon src={optionsOutline} />}
                            onClick={goToVideoEditor}
                        >
                            Edit
                        </CustomButton>
                    </div>
                </div>
            </IonFooter> */}
        </IonPage>
    );
};

export default VideoPreview;
import { IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { Gallery, Import } from 'iconsax-react';
import { arrowBack, chevronDownOutline, ellipsisVertical, optionsOutline, settings, settingsOutline } from 'ionicons/icons';
import React, { useState, useRef, useEffect } from 'react';
import ImageComponent from '../../../utils/ImageComponent';
import { DiscoveryImage } from '../../../assets/images';
import CustomButton from '../../../utils/Button';
import { CircularProgress } from '../../../components/workspace/CircularProgress';

const ImagePreview: React.FC = () => {
    const [progress, setProgress] = useState(150);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
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
                // Handle post on discovery
                console.log('Post on discovery');
                break;
            case 'rename':
                // Handle rename
                console.log('Rename');
                break;
            case 'delete':
                // Handle delete
                console.log('Delete');
                break;
        }
        setShowDropdown(false);
    };

    const handleDownloadImage = () => {
        const imageUrl = DiscoveryImage; // Ensure this is a valid image URL or imported asset
        const fileName = "image-preview.jpg"; // Set a preferred filename

        // Create an anchor element
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = fileName; // Set the download filename
        document.body.appendChild(link); // Append to DOM (not displayed)
        link.click(); // Trigger download
        document.body.removeChild(link); // Cleanup
    };


    const goToImageEditor = () => {
        const encodedUrl = encodeURIComponent(DiscoveryImage); // Encode the URL to make it safe
        navigation.push(`/app/image-editor?imageUrl=${encodedUrl}`);
    };


    return (
        <IonPage style={{ backgroundColor: '#F5F5F5' }} >
            <header style={{ padding: "30px 24px 20px 24px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        onClick={goBack}
                        style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                    </div>
                    <h2 style={{ color: "#313131", fontWeight: 600, fontSize: '17px' }}>Image Preview</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
                                <div
                                    onClick={() => handleDropdownItemClick('post')}
                                    style={{
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #ECECEC',
                                        color: "#4A4A4A",
                                        fontSize: '11px'


                                        // hover: { backgroundColor: '#f5f5f5' }
                                    }}
                                >
                                    Post on Discovery
                                </div>
                                <div
                                    onClick={() => handleDropdownItemClick('rename')}
                                    style={{
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #ECECEC',
                                        color: '#4A4A4A',
                                        fontSize: '11px'

                                        // hover: { backgroundColor: '#f5f5f5' }
                                    }}
                                >
                                    Rename
                                </div>
                                <div
                                    onClick={() => handleDropdownItemClick('delete')}
                                    style={{
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        color: '#4A4A4A',
                                        fontSize: '11px'
                                        // hover: { backgroundColor: '#f5f5f5' }
                                    }}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <IonContent className="ion-padding">
                <div style={{ textAlign: 'center' }}>
                    <ImageComponent alt='man' src={DiscoveryImage} height='334px' width='100%' />
                </div>
            </IonContent>
            <IonFooter className={'ion-padding'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 0' }}>
                    <div style={{ width: '70%' }}>
                        <CustomButton
                            backgroundColor="#005ECA"
                            borderColor='#005ECA'
                            textColor="#ffffff"
                            icon={<Import size="20" color="#FFF" />}
                            onClick={handleDownloadImage}
                        >
                            Download Image
                        </CustomButton>
                    </div>
                    <div style={{ width: '30%' }}>
                        <CustomButton
                            backgroundColor="inherit"
                            borderColor='#BEBEBE'
                            textColor="#313131"
                            icon={<IonIcon src={optionsOutline} />}
                            onClick={goToImageEditor}
                        >
                            Edit
                        </CustomButton>
                    </div>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default ImagePreview;
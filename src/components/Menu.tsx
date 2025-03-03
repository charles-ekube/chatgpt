import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Home from '../pages/home/Home';
import Discovery from '../pages/discovery/Discovery';
import WorkSpace from '../pages/workspace/Workspace';
import { searchOutline, settingsOutline } from 'ionicons/icons';
import Settings from '../pages/profile/Settings';
import ManageAccount from '../pages/profile/ManageAccount';
import TextToImage from '../pages/workspace/text-to-image/TextToImage';
import ImagePreview from '../pages/workspace/text-to-image/ImagePreview';
import ImageStyleSelector from '../pages/workspace/text-to-image/ImageStyle';

const Menu: React.FC = () => {
    const navigation = useIonRouter()


    return (
        // <IonSplitPane contentId='main' style={{ backgroundColor: '#E9E9E9' }} >
        <IonMenu contentId='main' style={{ backgroundColor: '#E9E9E9' }} type='push' >
            <IonContent style={{ '--background': '#E9E9E9' }}>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px 20px', height: '100%' }}>
                    <div id='menuSearchContainer'>
                        <IonIcon src={searchOutline} style={{ color: '#525252', fontSize: '20px' }} />
                        <input placeholder='Search chats...' />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                        <div>
                            <h3 style={{ color: "#313131", fontSize: '20px', fontWeight: 500, textAlign: 'center' }}>No saved chats</h3>
                            <p style={{ color: "#707070", fontSize: '12px', fontWeight: 400, textAlign: 'center', maxWidth: '300px' }}>Recent chats will appear here so you can pin, rename and continue them later.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                                style={{ background: "#ffe2b5", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: 'relative' }}
                            >
                                <div style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '999px', backgroundColor: '#0B8800', bottom: '2px', right: '3px' }} />
                                <IonLabel style={{ fontWeight: "bold", color: "#000" }}>D</IonLabel>
                            </div>
                            <div>
                                <p style={{ color: "#313131", fontSize: '16px', fontWeight: 500 }}>Jonathan Danladi</p>
                            </div>
                        </div>
                        <IonMenuToggle autoHide={false} style={{
                            '--background': '#E9E9E9', '--border-width': '0',
                            '--border-style': "none",
                        }}>
                            <IonItem routerLink={'/app/settings'} routerDirection={'none'} detail={false} style={{ '--background': '#E9E9E9', '--border-width': '0', '--box-shadow': 'none', '--border-style': "none", }}>
                                <IonIcon src={settingsOutline} style={{ fontSize: '30px', color: '#5D6993' }} />
                            </IonItem>
                        </IonMenuToggle>
                    </div>
                </div>
            </IonContent>
        </IonMenu>
        // </IonSplitPane >
    );
};

export default Menu;
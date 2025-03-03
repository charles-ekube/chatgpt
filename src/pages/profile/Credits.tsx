import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonButton,
    IonIcon,
    IonBadge,
    IonAvatar,
    useIonRouter,
} from '@ionic/react';
import { linkOutline, cashOutline, arrowBack } from 'ionicons/icons';
import CustomButton from '../../utils/Button';
import { Add, Gift, Link1 } from 'iconsax-react';
// import './ReferralScreen.css';

interface ReferralUser {
    id: number;
    avatar: string;
}

const CreditsScreen: React.FC = () => {
    const referralBalance = 5000;
    const totalReferrals = 10;

    const referredUsers: ReferralUser[] = [
        { id: 1, avatar: 'https://i.pravatar.cc/100?img=1' },
        { id: 2, avatar: 'https://i.pravatar.cc/100?img=2' },
        { id: 3, avatar: 'https://i.pravatar.cc/100?img=T' },
        { id: 4, avatar: 'https://i.pravatar.cc/100?img=4' },
        { id: 5, avatar: 'https://i.pravatar.cc/100?img=5' },
        { id: 6, avatar: 'https://i.pravatar.cc/100?img=6' },
    ];

    const copyInviteLink = () => {
        navigator.clipboard.writeText('https://yourdomain.com/invite/user123');
        // You could add a toast notification here
    };

    const navigation = useIonRouter();
    const goBack = () => {
        navigation.push('/app/settings', 'root');
    };


    return (
        <IonPage>
            <header style={{
                backgroundColor: '#1B42D2',
                padding: '30px 20px 30px 20px',
                borderRadius: '0 0 40px 40px',
                height: '220px'

            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '40px' }}>
                    <div style={{ backgroundColor: "#E3E3E3", height: "35px", width: "35px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={goBack}>
                        <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                    </div>
                    <h3 className="referral-title" style={{ color: '#FFFFFF', fontSize: '18px' }}>Credits and Subscriptions</h3>
                </div>
                <div style={{
                    padding: '40px 10px 10px 10px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    textAlign: 'center',
                    zIndex: 1000,
                    position: 'relative'
                }}>
                    <p style={{ color: '#A4A4A4', fontSize: '11px', marginBottom: '6px' }}>Your Credit Balance</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center' }}>
                        <span style={{ color: '#2D2D2D', fontWeight: 600 }}>$</span>
                        <h3 style={{ color: '#2D2D2D', fontSize: '45px', fontWeight: 700 }}>0</h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CustomButton
                            backgroundColor="#005ECA"
                            borderColor="#005ECA"
                            textColor="#ffffff"
                            borderRadius='9px'
                            fontSize='12px'
                            icon={<Add size="12" color="#FFF" />}
                        // onClick={() => navigation.push("/app/image-preview")}
                        >
                            Buy credit
                        </CustomButton>

                    </div>
                </div>
            </header>

            <IonContent className="referral-content">
                <div style={{ padding: '0 24px' }}>
                    <div style={{
                        padding: '40px 10px 10px 10px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        textAlign: 'center',
                        marginTop: '150px'

                        // position: 'relative'
                    }}>
                        <p style={{ color: '#A4A4A4', fontSize: '11px', marginBottom: '6px' }}>Your Current Plan</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center' }}>
                            {/* <span style={{ color: '#2D2D2D', fontWeight: 600 }}>$</span> */}
                            <h3 style={{ color: '#2D2D2D', fontSize: '45px', fontWeight: 700 }}>Free</h3>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CustomButton
                                backgroundColor="#005ECA"
                                borderColor="#005ECA"
                                textColor="#ffffff"
                                borderRadius='9px'
                                fontSize='12px'

                            // onClick={() => navigation.push("/app/image-preview")}
                            >
                                Upgrade to premium
                            </CustomButton>

                        </div>
                    </div>
                </div>

            </IonContent>

        </IonPage>
    );
};

export default CreditsScreen;
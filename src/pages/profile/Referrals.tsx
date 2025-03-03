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
import { Gift, Link1 } from 'iconsax-react';
// import './ReferralScreen.css';

interface ReferralUser {
    id: number;
    avatar: string;
}

const ReferralScreen: React.FC = () => {
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
                    <h3 className="referral-title" style={{ color: '#FFFFFF', fontSize: '24px' }}>Referrals</h3>
                </div>
                <div style={{
                    padding: '40px 10px 10px 10px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    textAlign: 'center',
                    zIndex: 1000,
                    position: 'relative'
                }}>
                    <p style={{ color: '#A4A4A4', fontSize: '11px', marginBottom: '6px' }}>Your Referral Balance</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center' }}>
                        <span style={{ color: '#2D2D2D', fontWeight: 600 }}>$</span>
                        <h3 style={{ color: '#2D2D2D', fontSize: '45px', fontWeight: 700 }}>5000</h3>
                    </div>
                    <div style={{
                        background: '#D7E5F4',
                        borderRadius: '28px',
                        textAlign: 'center',
                        maxWidth: '149px',
                        margin: '10px auto',
                        padding: '5px',



                    }}>
                        <p style={{ color: '#08458B', fontSize: '9px' }}>Credits gotten from 10 referrals</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CustomButton
                            backgroundColor="#005ECA"
                            borderColor="#005ECA"
                            textColor="#ffffff"
                            borderRadius='9px'
                            fontSize='12px'
                            icon={<Link1 size="12" color="#FFF" />}
                        // onClick={() => navigation.push("/app/image-preview")}
                        >
                            Copy Invite Link
                        </CustomButton>
                        <CustomButton
                            backgroundColor="#D7E5F4"
                            borderColor="#D7E5F4"
                            textColor="#005ECA"
                            borderRadius='9px'
                            fontSize='12px'
                            icon={<Gift
                                size="12"
                                color="#005ECA"
                            />}
                        // onClick={() => navigation.push("/app/image-preview")}
                        >
                            Redeem Credit
                        </CustomButton>
                    </div>
                </div>
            </header>

            <IonContent className="referral-content " >
                <div className="referrals-section">
                    <h2 style={{ color: '#575757', fontSize: '15px', marginTop: '30px' }}>My Referrals</h2>
                    <div className="avatar-row">
                        {referredUsers.map((user) => (
                            <IonAvatar key={user.id} className="referral-avatar">
                                <img src={user.avatar} alt={`Referral ${user.id}`} />
                            </IonAvatar>
                        ))}
                    </div>
                </div>

                <div className="instructions-section">
                    <h2 style={{ color: '#575757', fontSize: '15px' }}>Spread the Word</h2>
                    <p style={{ color: '#9F9F9F', fontSize: '12px', padding: '6px 0 20px 0' }}>Follow the steps below and get rewarded</p>

                    <div className="instruction-step">
                        <div className="step-number">1</div>
                        <div className="step-text">Share your invite link to your friend.</div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-number">2</div>
                        <div className="step-text">Your friends signs up.</div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-number">3</div>
                        <div className="step-text">
                            You get <span className="highlight">15 credits</span>, they get <span className="highlight">5 credits</span> on verification.
                        </div>
                    </div>
                </div>

                <div className="social-section">
                    <a href="#" className="social-icon instagram">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png" alt="Instagram" />
                    </a>
                    <a href="#" className="social-icon whatsapp">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/128px-WhatsApp.svg.png" alt="WhatsApp" />
                    </a>
                    <a href="#" className="social-icon facebook">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/128px-Facebook_Logo_%282019%29.png" alt="Facebook" />
                    </a>
                    <a href="#" className="social-icon linkedin">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/128px-LinkedIn_logo_initials.png" alt="LinkedIn" />
                    </a>
                </div>
            </IonContent>

        </IonPage>
    );
};

export default ReferralScreen;
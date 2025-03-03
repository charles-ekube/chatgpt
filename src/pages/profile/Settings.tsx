import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon, IonText, useIonRouter } from "@ionic/react";
import { ArrowSquareUp, Diamonds, ExportCircle, Logout, Messages3, ProfileCircle, Star1, Trash } from "iconsax-react";
import { arrowBack } from "ionicons/icons";

const Settings: React.FC = () => {

    const navigation = useIonRouter()
    const goBack = () => {
        navigation.push('/app/home', 'root')
    };


    const goToLogin = () => {
        navigation.push('/', 'root')
    }

    const goToCredits = () => {
        navigation.push('/app/credits', 'root')
    }

    const goToReferrals = () => {
        navigation.push('/app/referrals', 'root')
    }


    return (
        <IonPage style={{ backgroundColor: '#F5F5F5', padding: '0 20px' }} className="ion-padding">
            <header style={{ paddingTop: '20px' }}>
                <div
                    style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '26px' }}
                    onClick={goBack}
                >
                    <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                </div>

                <h3 style={{ color: '#313131', fontSize: '24px', fontWeight: 600 }}>Settings</h3>
                <div className={"ion-padding-vertical"}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* <IonAvatar> */}
                        <div
                            style={{
                                background: "#ffe2b5",
                                width: "45px",
                                height: "45px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: 'relative'
                            }}
                        >
                            <IonLabel style={{ fontWeight: "bold", color: "#000", fontSize: '24px' }}>D</IonLabel>
                        </div>
                        {/* </IonAvatar> */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <IonText style={{ fontSize: '18px', fontWeight: 500, color: '#313131' }}>Jonathan Danladi</IonText>
                            <IonText style={{ fontSize: '12px', fontWeight: 500, color: '#B3B3B3' }}>Jondanladi@yahoo.com</IonText>
                        </div>
                    </div>
                </div>
            </header>
            <IonContent className="ion-padding-vertical" style={{ '--background': '#f5f5f5' }}>
                <div style={{ backgroundColor: "#f5f5f5" }}>
                    <div style={{ borderBottom: '1px solid #E7E7E7', padding: '24px 0', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={goToCredits}>
                        <Diamonds
                            size="26" color="#5D6993"
                        />
                        <IonLabel style={{ color: '#313131', fontSize: '16px', fontWeight: 500, }}>Credits and Subscriptions</IonLabel>
                    </div>

                    <div style={{ borderBottom: '1px solid #E7E7E7', padding: '24px 0', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={goToReferrals}>
                        <Star1 size="26" color="#5D6993" />
                        <IonLabel style={{ color: '#313131', fontSize: '16px', fontWeight: 500, }}>Referral</IonLabel>
                    </div>

                    <div style={{ borderBottom: '1px solid #E7E7E7', padding: '24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <ProfileCircle size="26" color="#5D6993" />
                        <IonLabel style={{ color: '#313131', fontSize: '16px', fontWeight: 500, }}>Manage Account</IonLabel>
                    </div>
                    <div style={{ borderBottom: '1px solid #E7E7E7', padding: '24px 0', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: "space-between" }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Messages3 size="26" color="#5D6993" />
                            <IonLabel style={{ color: '#313131', fontSize: '16px', fontWeight: 500, }}>Feedback</IonLabel>
                        </div>
                        <ExportCircle size="26" color="#5D6993" />
                    </div>
                    <div style={{ borderBottom: '1px solid #E7E7E7', padding: '24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Trash size="26" color="#5D6993" />
                        <IonLabel style={{ color: '#313131', fontSize: '16px', fontWeight: 500, }}>Clear History</IonLabel>
                    </div>
                    <div style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={goToLogin}>
                        <Logout size="26" color="#5D6993" />
                        <IonLabel style={{ color: '#313131', fontSize: '16px', fontWeight: 500, }}>Log Out</IonLabel>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Settings;




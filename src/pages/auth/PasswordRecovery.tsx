import { IonBackButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import EmailInput from '../../utils/authInputs/EmailInput';
import InputField from '../../utils/authInputs/EmailInput';
import BackComponent from '../../utils/BackComponent';
import ImageComponent from '../../utils/ImageComponent';
import { BackIcon, LogoIcon } from '../../assets/images';
import { arrowBack, checkmarkOutline } from 'ionicons/icons';
import GoogleAuthButton from '../../utils/GoogleAuthButton';
import { useHistory } from 'react-router';
import CustomToast from '../../utils/Toast';
import CustomButton from '../../utils/Button';

const PasswordRecovery: React.FC = () => {
    const history = useIonRouter()
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState("");



    const [isLeaving, setIsLeaving] = React.useState(false);

    const goToLogin = () => {
        history.push('/');
    };

    const goToVerify = () => {
        history.push('/otp_verification', 'root')
    }

    const goBack = () => {
        history.goBack();
    };



    return (
        <IonPage className={'queries'}>
            <header className={'ion-padding'} style={{ boxShadow: 'none', backgroundColor: "#f5f5f5" }}>
                <div style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={goBack}>
                    <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                </div>
                <div style={{ marginTop: "30px" }}>
                    <div style={{ paddingBottom: '4px', textAlign: 'center' }}>
                        <IonText style={{
                            color: '#313131',
                            fontSize: '24px',
                            lineHeight: '24px',
                            fontWeight: 600
                        }}>Forgot password</IonText>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <IonText style={{
                            color: '#929292',
                            fontSize: '14px',
                            lineHeight: '14px',
                            fontWeight: 400
                        }}>Enter the email you use for Gpt++</IonText>
                    </div>
                </div>

            </header>
            <IonContent className="ion-padding-horizontal">
                {showToast && (
                    <CustomToast
                        message="Recovery code sent!"
                        duration={3000}
                        position="top"
                        isOpen={showToast}
                        onClose={() => setShowToast(false)}
                        icon={checkmarkOutline}
                    />
                )}

                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <IonRow>
                        <IonCol size="12">
                            <div>
                                <InputField type='email' placeholder='Enter your email' inputValue={email} onChange={(e: any) => setEmail(e.target.value)} />
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <div style={{ marginBottom: '20px', }}>
                                <CustomButton
                                    backgroundColor="#005ECA"
                                    borderColor='#005ECA'
                                    textColor="#ffffff"
                                    onClick={goToVerify}
                                >
                                    Send Reset Link
                                </CustomButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PasswordRecovery;
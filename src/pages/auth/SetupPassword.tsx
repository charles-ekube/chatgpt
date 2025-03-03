import { IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import InputField from '../../utils/authInputs/EmailInput';
import ImageComponent from '../../utils/ImageComponent';
import { BackIcon, LogoIcon } from '../../assets/images';
import { useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
import CustomButton from '../../utils/Button';
import { InfoCircle } from 'iconsax-react';

const SetupPassword: React.FC = () => {
    const history = useIonRouter();
    const [password, setPassword] = useState('');
    const [requirements, setRequirements] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasSpecialCharOrNumber: false
    });

    const validatePassword = (password: string) => {
        const newRequirements = {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasSpecialCharOrNumber: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        setRequirements(newRequirements);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const savePasswordToLocalStorage = () => {
        // if (Object.values(requirements).every(Boolean)) {
        //     localStorage.setItem('userPassword', password);
        history.push('/setup_name', 'root'); // Redirect after saving
        // }
    };

    const goBack = () => {
        history.goBack()
    }

    return (
        <IonPage className="queries">
            <header className={'ion-padding'} style={{ boxShadow: 'none', backgroundColor: "#f5f5f5" }}>
                <div
                    style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={goBack}
                >
                    <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                </div>
                <div style={{ marginTop: '30px' }}>
                    <div style={{ paddingBottom: '4px', textAlign: 'center' }}>
                        <IonText style={{ color: '#313131', fontSize: '24px', fontWeight: 600 }}>Setup a password</IonText>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <IonText style={{ color: '#929292', fontSize: '14px', fontWeight: 400, display: 'block' }}>Choose a strong password</IonText>
                    </div>
                </div>
            </header>
            <IonContent className="ion-padding">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <IonRow>
                        <IonCol size="12">
                            <InputField type='password' placeholder='Enter your password' inputValue={password} onChange={handlePasswordChange} />
                            <div style={{ marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: requirements.minLength ? '#0EB221' : '#898989', fontSize: '12px', marginBottom: '4px' }}>
                                    <InfoCircle size={16} />
                                    <IonText >
                                        At least 8 characters
                                    </IonText>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: requirements.hasUpperCase ? '#0EB221' : '#898989', fontSize: '12px', marginBottom: '4px' }}>
                                    <InfoCircle size={16} />
                                    <IonText >
                                        At least one uppercase letter
                                    </IonText>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: requirements.hasLowerCase ? '#0EB221' : '#898989', fontSize: '12px', marginBottom: '4px' }}>
                                    <InfoCircle size={16} />
                                    <IonText >
                                        At least one lowercase letter
                                    </IonText>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: requirements.hasSpecialCharOrNumber ? '#0EB221' : '#898989', fontSize: '12px', marginBottom: '4px' }}>
                                    <InfoCircle size={16} />
                                    <IonText >
                                        At least one special character or number
                                    </IonText>
                                </div>

                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <div style={{ marginBottom: '20px', marginTop: '40px' }}>

                                <CustomButton
                                    backgroundColor="#005ECA"
                                    borderColor='#005ECA'
                                    textColor="#ffffff"
                                    onClick={savePasswordToLocalStorage}
                                >
                                    Continue
                                </CustomButton>

                            </div>
                        </IonCol>
                    </IonRow>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SetupPassword;

import { IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import InputField from '../../utils/authInputs/EmailInput';
import ImageComponent from '../../utils/ImageComponent';
import { BackIcon, GoogleIcon, LogoIcon } from '../../assets/images';
// import CustomButton from '../../utils/CustomButton';
import GoogleAuthButton from '../../utils/GoogleAuthButton';
import { useHistory } from 'react-router';
import CustomToast from '../../utils/Toast';
import { arrowBack, checkmarkOutline } from 'ionicons/icons';
// import { signInWithPopup, UserCredential } from "firebase/auth";
// import { auth, provider } from "../../../firebase";
import CustomButton from '../../utils/Button';

const Login: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const history = useHistory();
    const navigation = useIonRouter()

    const doLogin = () => {
        navigation.push('/app', 'root')
    }

    const forgotPassword = () => {
        navigation.push('/recovery', 'root')
    }

    const toSignUp = () => {
        navigation.push('/register', 'root')
    }

    const goBack = () => {
        navigation.goBack();
    };


    // useEffect(() => {
    //     const storedEmail = localStorage.getItem('email');
    //     if (storedEmail) {
    //         setEmail(storedEmail);
    //     }
    // }, []);

    // const handleGoogleAuth = () => {
    //     signInWithPopup(auth, provider)
    //         .then((data: UserCredential) => {
    //             if (data?.user?.email) {
    //                 localStorage.setItem("email", data?.user?.email);
    //                 setShowToast(true);
    //                 setMessage('Successful');
    //                 setEmail(data?.user?.email);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error during authentication", error);
    //         });
    // };

    const disabled = () => {
        if (email === '' || password === '') {
            return (
                true
            )
        }
        return false
    }

    return (
        <IonPage className="queries">
            <header className={'ion-padding'} style={{ boxShadow: 'none', background: '#f5f5f5' }}>
                <div style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                </div>
                <div style={{ marginTop: "30px" }}>
                    <div style={{ paddingBottom: '4px', textAlign: 'center' }}>
                        <IonText style={{ color: '#313131', fontSize: '24px', fontWeight: 600 }}>Welcome back</IonText>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <IonText style={{ color: '#929292', fontSize: '14px' }}>Log in to your account</IonText>
                    </div>
                </div>
            </header>
            <IonContent className="ion-padding-horizontal">
                {showToast && (
                    <CustomToast
                        message={message || "Logged In!"}
                        duration={3000}
                        position="top"
                        isOpen={showToast}
                        onClose={() => setShowToast(false)}
                        icon={checkmarkOutline}
                    />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <IonRow>
                        <IonCol size="12">
                            <InputField type='email' placeholder='Enter your email' inputValue={email} onChange={(e: any) => setEmail(e.target.value)} />
                            <InputField type='password' placeholder='Enter your password' inputValue={password} onChange={(e: any) => setPassword(e.target.value)} />
                            <div style={{ textAlign: 'right', marginTop: '10px' }}>
                                <IonText style={{ fontSize: '14px', color: '#005ECA', cursor: 'pointer' }} onClick={forgotPassword}>Forgot password?</IonText>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <div style={{ marginTop: '40px' }}>
                                <CustomButton
                                    backgroundColor="#005ECA"
                                    borderColor='#005ECA'
                                    textColor="#ffffff"
                                    routerLink='/app'
                                    routerDirection='root'

                                >
                                    Login
                                </CustomButton>

                                <div style={{ margin: '16px 0' }} />
                                <CustomButton
                                    backgroundColor="inherit"
                                    borderColor="#BBBBBB"
                                    icon={<img src={GoogleIcon} style={{ width: '20px', height: '20px', }} />}
                                // onClick={handleGoogleAuth}
                                >
                                    Google
                                </CustomButton>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: "center", fontSize: '14px' }}>
                                <IonText style={{ color: '#898989' }}>Don't have an account?</IonText>
                                <IonText style={{ color: '#1F4EB5', cursor: 'pointer', marginLeft: '5px' }} onClick={toSignUp}>Sign up</IonText>
                            </div>
                        </IonCol>
                    </IonRow>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

import {
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonText,
    useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import ImageComponent from "../../utils/ImageComponent";
import { BackIcon, GoogleIcon, LogoIcon } from "../../assets/images";

import { arrowBack, arrowBackCircleOutline, checkmarkOutline } from "ionicons/icons";

import { useHistory } from "react-router";
import CustomToast from "../../utils/Toast";

// ✅ Firebase Imports (Moved Outside Component)
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { auth, db } from "../../../firebase";
import InputField from "../../utils/authInputs/EmailInput";
// import { signInWithPopup, UserCredential } from "firebase/auth";
import CustomButton from "../../utils/Button";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// const functions = getFunctions(app);
// const sendOtp = httpsCallable(functions, "processNewTempEmail");

const Register: React.FC = () => {
    const history = useHistory();
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState("");
    const [value, setValue] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const navigation = useIonRouter()


    const goToLogin = () => {
        navigation.push('/', 'root')
    }
    const goToVerify = () => {

        navigation.push("/otp_verification", 'root')
    };



    // useEffect(() => {
    //     setValue(localStorage.getItem('email'));
    //     testFunction()
    // }, [])

    // const testFunction = async () => {
    //     const verifyEmailCode = httpsCallable(functions, 'verifyEmailCode');
    //     const result = await verifyEmailCode({ email: 'test@example.com', code: '123456' });
    //     console.log(result.data);
    // }

    // const handleGoogleAuth = () => {
    //     signInWithPopup(auth, provider)
    //         .then((data: UserCredential) => {
    //             if (data?.user?.email) {
    //                 setValue(data?.user?.email);
    //                 localStorage.setItem("email", data?.user?.email)
    //                 setShowToast(true)
    //                 setMessage('Successful')
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error during registration", error)
    //         })
    // }


    // ✅ Function to Handle OTP Sending
    const handleSignUp = async () => {
        goToVerify()
        // if (!email?.trim()) {
        //     alert("Please enter your email.");
        //     return;
        // }
        // try {
        //     const response = await sendOtp({ email });
        //     console.log("OTP Sent:", response?.data);
        //     setShowToast(true);
        //     setTimeout(goToVerify, 1500); // Navigate after showing toast
        // } catch (error) {
        //     console.error("Error Sending OTP:", error);
        //     alert("Failed to send OTP. Please try again.");
        // }
    };




    const requestOtp = async () => {
        // try {
        //     const response = await fetch("https://us-central1-chatgptpp-7d9f2.cloudfunctions.net/processNewTempEmail", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email }),
        //     });

        //     const data = await response.json();
        //     console.log(data.message);
        // } catch (error) {
        //     console.error("Error requesting OTP:", error);
        // }
    };
    const goBack = () => {
        navigation.goBack();
    };

    const disabled = () => {
        if (email === '') {
            return true
        }
        return false
    }



    // const handleInitialSignup = async () => {
    //     try {
    //         await addDoc(collection(db, 'temp_emails'), {
    //             email,
    //             createdAt: serverTimestamp()
    //         });

    //         // onSignupComplete(email);
    //     } catch (error) {
    //         console.error('Signup initiation failed:', error);
    //         throw error;
    //     }
    // };


    return (
        <IonPage className="queries">
            <header className={'ion-padding'} style={{ boxShadow: "none", backgroundColor: "#f5f5f5" }}>
                <div style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={goBack} >
                    <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                </div>

                <div style={{ marginTop: "30px" }}>
                    <div style={{ paddingBottom: '4px', textAlign: "center" }}>
                        <IonText style={{ color: "#313131", fontSize: "24px", fontWeight: 600, lineHeight: '24px' }}>
                            Continue with your email
                        </IonText>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <IonText style={{ color: "#929292", fontSize: "14px", fontWeight: 400, lineHeight: '14px', }}>
                            We will send you a code to confirm
                        </IonText>
                    </div>
                </div>
            </header>

            <IonContent className="ion-padding-horizontal">
                {showToast && (
                    <CustomToast
                        message="Logged In!"
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
                            <InputField
                                type="email"
                                placeholder="Enter your email"
                                inputValue={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12" className="ion-text-center">

                            <div style={{
                                textAlign: 'center',
                                padding: '20px 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                justifyContent: "center",
                                fontWeight: 500,
                                fontSize: '14px'
                            }}>

                                <IonText style={{ color: "#898989" }}>Already have an account?</IonText>
                                <IonText style={{ color: "#1F4EB5", cursor: "pointer", marginLeft: "5px" }} onClick={goToLogin}>
                                    Login
                                </IonText>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <CustomButton
                                    backgroundColor="#005ECA"
                                    borderColor='#005ECA'
                                    textColor="#ffffff"
                                // onClick={handleInitialSignup}
                                >
                                    Continue
                                </CustomButton>

                                {/* <div style={{ margin: '16px 0' }} /> */}
                                {/* <CustomButton
                                    backgroundColor="inherit"
                                    borderColor="#BBBBBB"
                                    icon={<img src={GoogleIcon} style={{ width: '20px', height: '20px', }} />}
                                    onClick={handleGoogleAuth}
                                >
                                    Google
                                </CustomButton> */}
                            </div>




                        </IonCol>
                    </IonRow>

                </div>


            </IonContent>
        </IonPage>
    );
};

export default Register;

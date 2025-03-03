import { IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import ImageComponent from '../../utils/ImageComponent';
import { BackIcon, LogoIcon } from '../../assets/images';
import GoogleAuthButton from '../../utils/GoogleAuthButton';
import { useHistory } from 'react-router';
import OtpInput from '../../utils/authInputs/OtpInput';
import { arrowBack } from 'ionicons/icons';
import CustomButton from '../../utils/Button';


const OtpVerification: React.FC = () => {
    const history = useIonRouter()
    const goToPasswordSetup = () => {
        history.push('/setup_password', 'root');
    };
    const goBack = () => {
        history.goBack()
    }

    const [pin, setPin] = useState("");
    const onChange = (value: string) => {
        setPin(value);
    };

    // const Ref = useRef(null);
    // const [timer, setTimer] = useState("00:00");

    // const getTimeRemaining = (e) => {
    //     const total = Date.parse(e) - Date.parse(new Date());
    //     const seconds = Math.floor((total / 1000) % 60);
    //     const minutes = Math.floor((total / 1000 / 60) % 60);

    //     return {
    //         total,
    //         minutes,
    //         seconds,
    //     };
    // };

    // const startTimer = (e) => {
    //     let { total, minutes, seconds } = getTimeRemaining(e);
    //     if (total >= 0) {
    //         setTimer((minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds));
    //     }
    // };

    // const clearTimer = (e) => {
    //     setTimer("01:30");
    //     if (Ref.current) clearInterval(Ref.current);
    //     const id = setInterval(() => {
    //         startTimer(e);
    //     }, 1000);
    //     Ref.current = id;
    // };

    // const getDeadTime = () => {
    //     let deadline = new Date();
    //     deadline.setSeconds(deadline.getSeconds() + 90);
    //     return deadline;
    // };

    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);


    // const onClickReset = () => {
    //     clearTimer(getDeadTime());
    // };

    return (
        <IonPage className="queries">
            <header className={'ion-padding'} style={{ boxShadow: 'none', backgroundColor: "#f5f5f5" }} >

                <div style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={goBack} >
                    <IonIcon src={arrowBack} style={{ color: '#141B34' }} />
                </div>
                <div style={{ marginTop: "30px" }}>
                    <div style={{ textAlign: 'center', paddingBottom: '4px' }}>
                        <IonText style={{
                            color: '#313131',
                            fontSize: '24px',
                            lineHeight: '24px',
                            fontWeight: 600
                        }}>Enter the code we sent</IonText>
                    </div>
                    <div style={{ textAlign: 'center', }}>
                        <IonText style={{
                            color: '#929292',
                            fontSize: '14px',
                            lineHeight: '14px',
                            fontWeight: 400
                        }}>We sent a code to Jondanladi@yahoo.com </IonText>
                    </div>
                </div>

            </header>
            <IonContent className="ion-padding">
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <IonRow>
                        <IonCol size="12">
                            <div>
                                <OtpInput valueLength={6} onChange={onChange} value={pin} />
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

                                    onClick={goToPasswordSetup}
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

export default OtpVerification;
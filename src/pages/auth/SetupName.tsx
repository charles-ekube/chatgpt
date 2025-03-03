import { IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import InputField from '../../utils/authInputs/EmailInput';
import ImageComponent from '../../utils/ImageComponent';
import { BackIcon, LogoIcon } from '../../assets/images';
import GoogleAuthButton from '../../utils/GoogleAuthButton';
import { useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
import CustomButton from '../../utils/Button';

const SetupName: React.FC = () => {

    const history = useIonRouter()
    const [name, setName] = useState("");

    const [isLeaving, setIsLeaving] = React.useState(false);

    const goToHome = () => {
        history.push('/app', 'root');
    };

    const goBack = () => {
        history.goBack()
    }

    return (
        <IonPage className="queries">
            <header className={'ion-padding'} style={{ boxShadow: "none", backgroundColor: "#f5f5f5" }}>
                <div

                    style={{ backgroundColor: '#E3E3E3', height: '35px', width: '35px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={goBack}
                >
                    <IonIcon src={arrowBack} style={{ color: '#141B34' }} />

                </div>
                <div style={{ marginTop: "30px" }}>
                    <div style={{ paddingBottom: '4px', textAlign: "center" }}>
                        <IonText style={{
                            color: '#313131',
                            fontSize: '24px',
                            lineHeight: '24px',
                            fontWeight: 600
                        }}>Tell us your name</IonText>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <IonText style={{
                            color: '#929292',
                            fontSize: '14px',
                            lineHeight: '14px',
                            fontWeight: 400
                        }}>Just a minute, we’re almost done</IonText>
                    </div>
                </div>

            </header>
            <IonContent className="ion-padding">
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <IonRow>
                        <IonCol size="12">
                            <div>
                                <InputField type='text' placeholder="Enter your name"
                                    inputValue={name}
                                    onChange={(e: any) => setName(e.target.value)} />
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
                                    onClick={goToHome}
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

export default SetupName;
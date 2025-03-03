import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonToolbar, useIonRouter } from "@ionic/react";
import { arrowBack, pencil } from "ionicons/icons";
import { useState } from "react";
import InputField from "../../utils/authInputs/EmailInput";
import CustomButton from "../../utils/Button";
// import CustomButton from "../../utils/CustomButton";
// import "./ManageAccount.css";

const ManageAccount: React.FC = () => {
    const [displayName, setDisplayName] = useState("Jonathan Danladi");
    const [gender, setGender] = useState("Male");
    const [country, setCountry] = useState("Nigeria");

    const navigation = useIonRouter();
    const goBack = () => {
        navigation.goBack();
    };

    const goToSettings = () => {
        navigation.push("/app/settings", "root");
    };

    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };



    return (
        <IonPage style={{ backgroundColor: "#F5F5F5" }} className="ion-padding">
            <header style={{ paddingTop: "40px" }}>
                <div style={{ backgroundColor: "#E3E3E3", height: "35px", width: "35px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "26px" }} onClick={goBack}>
                    <IonIcon src={arrowBack} style={{ color: "#141B34" }} />
                </div>

                <h3 style={{ color: "#313131", fontSize: "24px", fontWeight: 600 }}>Manage account</h3>
            </header>
            <IonContent className="ion-padding">
                <div
                    style={{
                        background: "#ffe2b5",
                        width: "150px",
                        height: "150px",
                        margin: "auto",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        // overflow: "hidden",

                    }}
                >
                    {image ? (
                        <img
                            src={image}
                            alt="Profile"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                        />
                    ) : (
                        <IonLabel style={{ fontWeight: "bold", color: "#000", fontSize: "80px" }}>D</IonLabel>
                    )}

                    <label
                        htmlFor="imageUpload"
                        style={{
                            position: "absolute",
                            bottom: "5px",
                            right: "5px",
                            height: '35px',
                            width: '35px',
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            padding: "8px",
                            cursor: "pointer",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                            zIndex: 10000
                        }}
                    >
                        <IonIcon icon={pencil} style={{ fontSize: "16px", color: "#000" }} />
                    </label>

                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                </div>

                {/* <IonList> */}
                <InputField type="text" placeholder="Enter your email" inputValue={displayName} disabled={true} onChange={(e: any) => setDisplayName(e.target.value)} label="Display name" />

                {/* <IonItem> */}
                <div style={{ marginBottom: "16px" }}>
                    <IonLabel position="stacked" style={{ color: "#747474", fontSize: "14px", fontWeight: 500, lineHeight: "30px" }}>
                        Gender
                    </IonLabel>
                    <IonSelect value={gender} onIonChange={(e) => setGender(e.detail.value)} className={"input-field"} interface="popover" justify="space-between">
                        <IonSelectOption value="Male">Male</IonSelectOption>
                        <IonSelectOption value="Female">Female</IonSelectOption>
                        <IonSelectOption value="Other">Other</IonSelectOption>
                    </IonSelect>
                </div>

                {/* </IonItem> */}

                {/* <IonItem> */}
                <IonLabel position="fixed" style={{ color: "#747474", fontSize: "14px", fontWeight: 500, lineHeight: "30px" }}>
                    Country
                </IonLabel>
                <div className="country-select" style={{ marginBottom: "60px" }}>
                    {/* <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria Flag" className="flag-icon" /> */}
                    <IonSelect value={country} onIonChange={(e) => setCountry(e.detail.value)} className={"input-field"} interface="action-sheet">
                        <IonSelectOption value="Nigeria">Nigeria</IonSelectOption>
                        <IonSelectOption value="Ghana">Ghana</IonSelectOption>
                        <IonSelectOption value="Kenya">Kenya</IonSelectOption>
                    </IonSelect>
                </div>
                {/* </IonItem>/ */}
                {/* </IonList> */}

                <CustomButton
                    backgroundColor="#005ECA"
                    borderColor="#005ECA"
                    textColor="#ffffff"
                // onClick={() => navigation.push("/app/image-preview")}
                >
                    Continue
                </CustomButton>
                {/* <CustomButton label="Continue" onClick={goToSettings} bgColor="#005ECA" textColor="#fff" /> */}
            </IonContent>
        </IonPage>
    );
};

export default ManageAccount;

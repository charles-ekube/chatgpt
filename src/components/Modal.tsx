// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import ImageComponent from "../utils/ImageComponent";
// import { IonAvatar, IonIcon, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from "@ionic/react";
// import { OpenAI } from "../assets/images";
// import { Check } from "iconsax-react";
// import { checkmark } from "ionicons/icons";
// import { AIModel, ProviderGroup } from "../hooks/useModelSelector";


// type ModalProps = {
//     isOpen: boolean;
//     onClose: () => void;
//     providers: ProviderGroup[];
//     loading: boolean;
//     onSelect: (model: AIModel) => void

// };



// interface ModelOption {
//     name: string;
//     description: string;
//     image: string;
// }


// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, providers, onSelect, loading }) => {
//     if (!isOpen) return null;

//     console.log(providers)

//     return (
//         <div
//             className="modal-backdrop"
//             onClick={onClose}
//             style={{ alignItems: 'flex-start', paddingTop: '100px' }}

//         >
//             <AnimatePresence>
//                 <motion.div
//                     className="modal-content"
//                     onClick={(e) => e.stopPropagation()} // Prevent backdrop click
//                     initial={{ y: "100%", opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     exit={{ y: "100%", opacity: 0 }}
//                     transition={{ duration: 0.5, ease: "easeInOut" }}
//                     style={{ maxHeight: '500px', overflowY: 'auto' }}
//                 >
//                     <h2 style={{ textAlign: 'center', color: '#777777', fontWeight: 500, lineHeight: '18px', fontSize: '18px', borderBottom: '1px solid #E7E7E7', paddingBottom: '30px' }}>Switch Models</h2>
//                     <div>
//                         {/* {providers?.models?.map((model, index) => (
//                             <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #E7E7E7', }}
//                                 onClick={() => {
//                                     setSelectedModel(model.name);
//                                     onClose();
//                                 }}
//                             >
//                                 <img src={OpenAI} alt={model.name} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
//                                 <div style={{ flex: 1 }}>
//                                     <h3 style={{ color: '#3A3A3A', fontSize: '12px', lineHeight: '12px', fontWeight: 500, paddingBottom: '8px' }}>{model.name}</h3>
//                                     <p style={{ color: '#A8A8A8', fontSize: '8px', lineHeight: '12px', fontWeight: 300 }}>{model.description}</p>
//                                 </div>
//                                 <div
//                                     style={{

//                                         borderWidth: '1px',
//                                         borderColor: selectedModel === model.name ? '#C0C0C0' : '#000000',
//                                         backgroundColor: selectedModel === model.name ? '#000000' : '#inherit',
//                                         borderRadius: '999px',
//                                         height: '20px',
//                                         width: '20px',
//                                         display: "flex",
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         padding: '4px'
//                                     }}
//                                 >
//                                     {selectedModel === model.name && (
//                                         <IonIcon src={checkmark} style={{ color: '#fff' }} />
//                                     )}
//                                 </div>
//                             </div>
//                         ))} */}
//                     </div>
//                     {/* <button className="close-button" onClick={onClose}>Close</button> */}
//                     <p style={{ color: '#DADADA', fontSize: '8px', lineHeight: '12px', fontWeight: 500, textAlign: 'center', marginTop: '10px' }}>You’ve come to the end of the list...</p>
//                 </motion.div>
//             </AnimatePresence>
//         </div>
//     );
// };




// export default Modal


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageComponent from "../utils/ImageComponent";
import { IonAvatar, IonIcon, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from "@ionic/react";
import { OpenAI } from "../assets/images";
import { Check } from "iconsax-react";
import { checkmark } from "ionicons/icons";
import { AIModel, ProviderGroup } from "../hooks/useModelSelector";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    providers: ProviderGroup[];
    loading: boolean;
    onSelect: (model: AIModel) => void
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, providers, onSelect, loading }) => {
    const [selectedModel, setSelectedModel] = useState<string>("");

    if (!isOpen) return null;

    console.log(providers, loading);

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            style={{ alignItems: 'flex-start', paddingTop: '100px' }}
        >
            <AnimatePresence>
                <motion.div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()} // Prevent backdrop click
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ maxHeight: '500px', overflowY: 'auto' }}
                >
                    <h2 style={{ textAlign: 'center', color: '#777777', fontWeight: 500, lineHeight: '18px', fontSize: '18px', borderBottom: '1px solid #E7E7E7', paddingBottom: '30px' }}>Switch Models</h2>
                    <div>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '20px' }}>Loading models...</div>
                        ) : (
                            providers && providers.map((provider, providerIndex) => (
                                <div key={providerIndex}>
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #E7E7E7' }}>
                                        <img src={provider.providerLogoUrl || OpenAI} alt={provider.providerName} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                        <h3 style={{ color: '#3A3A3A', fontSize: '14px', lineHeight: '16px', fontWeight: 500 }}>{provider.providerName}</h3>
                                    </div>
                                    {provider.models && provider.models.map((model, modelIndex) => (
                                        <div
                                            key={modelIndex}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '15px 20px',
                                                borderBottom: '1px solid #E7E7E7',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                                setSelectedModel(model.id);
                                                onSelect(model);
                                                onClose();
                                            }}
                                        >
                                            <div style={{ flex: 1, paddingLeft: '30px' }}>
                                                <h3 style={{ color: '#3A3A3A', fontSize: '12px', lineHeight: '12px', fontWeight: 500, paddingBottom: '8px' }}>{model.id}</h3>
                                                {model.description && (
                                                    <p style={{ color: '#A8A8A8', fontSize: '8px', lineHeight: '12px', fontWeight: 300 }}>{model.description}</p>
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    borderWidth: '1px',
                                                    borderColor: selectedModel === model.id ? '#C0C0C0' : '#000000',
                                                    backgroundColor: selectedModel === model.id ? '#000000' : 'inherit',
                                                    borderRadius: '999px',
                                                    height: '20px',
                                                    width: '20px',
                                                    display: "flex",
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '4px'
                                                }}
                                            >
                                                {selectedModel === model.id && (
                                                    <IonIcon icon={checkmark} style={{ color: '#fff' }} />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                    <p style={{ color: '#DADADA', fontSize: '8px', lineHeight: '12px', fontWeight: 500, textAlign: 'center', marginTop: '10px' }}>You've come to the end of the list...</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Modal;
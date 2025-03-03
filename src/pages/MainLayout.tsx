import { IonPage, IonSplitPane, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { bookOutline, sparklesOutline } from "ionicons/icons";
import { SearchNormal } from "iconsax-react";
import Menu from "../components/Menu";
import Home from "../pages/home/Home";
import Discovery from "../pages/discovery/Discovery";
import WorkSpace from "../pages/workspace/Workspace";

import { useEffect, useState } from "react";

const MainLayout: React.FC = ({ children }: any) => (
    <IonPage>
        {/* Your layout structure (headers, etc) */}
        {children}
    </IonPage>
);

export default MainLayout;

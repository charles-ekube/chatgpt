// import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
// import React from 'react';
// import { Redirect, Route } from 'react-router';
// import Home from '../pages/home/Home';
// import Discovery from '../pages/discovery/Discovery';
// import WorkSpace from '../pages/workspace/Workspace';
// import { SearchNormal } from 'iconsax-react';
// import { bookOutline, sparklesOutline } from 'ionicons/icons';

// const Tabs: React.FC = () => {

//     return (
//         <IonTabs>
//             <IonRouterOutlet>
//                 <Route path='/app/home' component={Home} />
//                 <Route path='/app/discovery' component={Discovery} />
//                 <Route path='/app/workspace' component={WorkSpace} />
//                 <Route exact path={'/app'}>
//                     <Redirect to={'/app/home'} />
//                 </Route>
//             </IonRouterOutlet>
//             <IonTabBar slot='bottom'>
//                 <IonTabButton tab='tab1' href='/app/home'>
//                     <SearchNormal size="32" />
//                     <IonLabel>Home</IonLabel>
//                 </IonTabButton>

//                 <IonTabButton tab='tab2' href='/app/workspace'>
//                     <IonIcon icon={sparklesOutline} />
//                     <IonLabel>Workspace</IonLabel>
//                 </IonTabButton>

//                 <IonTabButton tab='tab3' href='/app/discovery'>
//                     <IonIcon icon={bookOutline} />
//                     <IonLabel>Discovery</IonLabel>
//                 </IonTabButton>

//             </IonTabBar>
//         </IonTabs>
//     );
// };

// export default Tabs;

import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Home from '../pages/home/Home';
import Discovery from '../pages/discovery/Discovery';
import WorkSpace from '../pages/workspace/Workspace';
import { SearchNormal } from 'iconsax-react';
import { bookOutline, sparklesOutline } from 'ionicons/icons';

const Tabs: React.FC = () => {
    return (
        // <IonPage>
        <IonTabs>
            <IonRouterOutlet>
                <Route path='/app/home' component={Home} />
                <Route path='/app/discovery' component={Discovery} />
                <Route path='/app/workspace' component={WorkSpace} />
                <Route exact path={'/app'}>
                    <Redirect to={'/app/home'} />
                </Route>
            </IonRouterOutlet>

            {/* Bottom Navigation Tabs */}
            <IonTabBar slot='bottom'>
                <IonTabButton tab='tab1' href='/app/home'>
                    <SearchNormal size="32" />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab='tab2' href='/app/workspace'>
                    <IonIcon icon={sparklesOutline} />
                    <IonLabel>Workspace</IonLabel>
                </IonTabButton>

                <IonTabButton tab='tab3' href='/app/discovery'>
                    <IonIcon icon={bookOutline} />
                    <IonLabel>Discovery</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
        // </IonPage>
    );
};

export default Tabs;

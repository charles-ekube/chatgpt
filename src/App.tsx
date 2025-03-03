import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PasswordRecovery from './pages/auth/PasswordRecovery';
import OtpVerification from './pages/auth/OtpVerification';
import SetupName from './pages/auth/SetupName';
import SetupPassword from './pages/auth/SetupPassword';
import Home from './pages/home/Home';
import Discovery from './pages/discovery/Discovery';
import Workspace from './pages/workspace/Workspace';
import TextToImage from './pages/workspace/text-to-image/TextToImage';
import TextToVideo from './pages/workspace/video/TextToVideo';
import VideoStyle from './pages/workspace/video/VideoStyle';
import VideoPreview from './pages/workspace/video/VideoPreview';
import ThreeDGeneration from './pages/workspace/3d/3DGeneration';
import ThreeDPreview from './pages/workspace/3d/3DPreview';
import TextToSpeech from './pages/workspace/speech/TextToSpeech';
import SoundGeneration from './pages/workspace/sound/SoundGeneration';
import ImageStyle from './pages/workspace/text-to-image/ImageStyle';
import ImageEditor from './pages/workspace/text-to-image/ImageEditor';
import ImagePreview from './pages/workspace/text-to-image/ImagePreview';
import ImageToVideo from './pages/workspace/video/ImageToVideo';
import Settings from './pages/profile/Settings';
import ManageAccount from './pages/profile/ManageAccount';
import ReferralScreen from './pages/profile/Referrals';
import CreditsScreen from './pages/profile/Credits';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path={'/'} component={Login} exact />
            <Route path={'/register'} component={Register} exact />
            <Route path={'/recovery'} component={PasswordRecovery} exact />
            <Route path={'/otp_verification'} component={OtpVerification} exact />
            <Route path={'/setup_name'} component={SetupName} exact />
            <Route path={'/setup_password'} component={SetupPassword} exact />

            {/* Main Layout */}
            {/* <Route path={'/app'} component={MainLayout} /> */}
            <Route path='/app/home' component={Home} />
            <Route path='/app/discovery' component={Discovery} />
            <Route path='/app/workspace' component={Workspace} />
            <Route path='/app/text-to-image' component={TextToImage} />
            <Route path='/app/text-to-video' component={TextToVideo} />
            <Route path='/app/video-style' component={VideoStyle} />
            <Route path='/app/video-preview' component={VideoPreview} />
            <Route path='/app/3d-generation' component={ThreeDGeneration} />
            <Route path='/app/3d-preview' component={ThreeDPreview} />
            <Route path='/app/text-to-speech' component={TextToSpeech} />
            <Route path='/app/sound-generation' component={SoundGeneration} />
            <Route path='/app/image-style' component={ImageStyle} />
            <Route path='/app/image-editor' component={ImageEditor} />
            <Route path='/app/image-preview' component={ImagePreview} />
            <Route path='/app/image-to-video' component={ImageToVideo} />
            <Route path='/app/settings' component={Settings} />
            <Route path='/app/account' component={ManageAccount} />
            <Route path="/app/referrals" component={ReferralScreen} />
            <Route path="/app/credits" component={CreditsScreen} />


            <Route exact path={'/app'}>
              <Redirect to={'/app/home'} />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
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

// Lazy load all page components
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const PasswordRecovery = lazy(() => import('./pages/auth/PasswordRecovery'));
const OtpVerification = lazy(() => import('./pages/auth/OtpVerification'));
const SetupName = lazy(() => import('./pages/auth/SetupName'));
const SetupPassword = lazy(() => import('./pages/auth/SetupPassword'));
const Home = lazy(() => import('./pages/home/Home'));
const Discovery = lazy(() => import('./pages/discovery/Discovery'));
const Workspace = lazy(() => import('./pages/workspace/Workspace'));
const TextToImage = lazy(() => import('./pages/workspace/text-to-image/TextToImage'));
const TextToVideo = lazy(() => import('./pages/workspace/video/TextToVideo'));
const VideoStyle = lazy(() => import('./pages/workspace/video/VideoStyle'));
const VideoPreview = lazy(() => import('./pages/workspace/video/VideoPreview'));
const ThreeDGeneration = lazy(() => import('./pages/workspace/3d/3DGeneration'));
const ThreeDPreview = lazy(() => import('./pages/workspace/3d/3DPreview'));
const TextToSpeech = lazy(() => import('./pages/workspace/speech/TextToSpeech'));
const SoundGeneration = lazy(() => import('./pages/workspace/sound/SoundGeneration'));
const ImageStyle = lazy(() => import('./pages/workspace/text-to-image/ImageStyle'));
const ImageEditor = lazy(() => import('./pages/workspace/text-to-image/ImageEditor'));
const ImagePreview = lazy(() => import('./pages/workspace/text-to-image/ImagePreview'));
const ImageToVideo = lazy(() => import('./pages/workspace/video/ImageToVideo'));
const Settings = lazy(() => import('./pages/profile/Settings'));
const ManageAccount = lazy(() => import('./pages/profile/ManageAccount'));
const ReferralScreen = lazy(() => import('./pages/profile/Referrals'));
const CreditsScreen = lazy(() => import('./pages/profile/Credits'));

// Loading component to display while lazy loading components
const Loading = () => (
  <div className="ion-padding ion-text-center">
    <h3>Loading...</h3>
  </div>
);

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Suspense fallback={<Loading />}>
              <Route path={'/'} component={Login} exact />
              <Route path={'/register'} component={Register} exact />
              <Route path={'/recovery'} component={PasswordRecovery} exact />
              <Route path={'/otp_verification'} component={OtpVerification} exact />
              <Route path={'/setup_name'} component={SetupName} exact />
              <Route path={'/setup_password'} component={SetupPassword} exact />

              {/* Main Layout */}
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
            </Suspense>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
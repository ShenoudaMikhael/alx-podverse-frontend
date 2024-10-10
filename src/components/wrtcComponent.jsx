// import StaticData from './staticData';

import { ContextProvider } from "../util/Context";
import Notifications from "./Notifications";
import Options from "./Options";
import VideoPlayer from "./VideoPlayer";

// const socket = StaticData.socket; // Connect to the Socket.io server

const Www = () => {

    return <>
        <div>
            <h1>WRTC</h1>
        </div>
        <VideoPlayer />
        <Options />
        <Notifications />

    </>
}

const Wrtc = () => {




    return <>
        <ContextProvider>
            <Www />
        </ContextProvider>
    </>
}
export default Wrtc;
// import Peer from "./simplepeer.min.js";
import StaticData from "./staticData";
import { useEffect, useRef } from "react";

const socket = StaticData.socket;

const Viewer = () => {
    const userAudio = useRef();
    const myId = useRef();
    const broadcastId = useRef();
    const callRef = useRef(false);
    const connectionRef = useRef();
    // const [me, setMe] = useState('');
    useEffect(() => {

        socket.on('get-broadcast-id', (broadcaster) => {
            console.log('get-broadcast-id', broadcaster)
            broadcastId.current = broadcaster
            connectToBroadcaster()

        });
        socket.on('connect-listner', ({ signal, to }) => {
            console.log('connect-listner', signal, to);
            connectionRef.current.signal(signal);

        });

        socket.on('me', (id) => {

            myId.current = id;
            console.log('fired:me', myId.current);
        });
        const connectToBroadcaster = () => {

            if (callRef.current === true) return
    
            const peer = new window.SimplePeer({ initiator: true, trickle: false });
            peer.on('signal', (data) => {
                console.log("there is signal")
                socket.emit('connect-to-broadcaster', { userToCall: broadcastId.current, signalData: data, from: myId.current });
            });
            peer.on('stream', (currentStream) => {
                console.log('currentStream', currentStream);
                userAudio.current.srcObject = currentStream;
            });
            peer.on('close', () => {
                console.log('Disconnected from the broadcaster');
                // Cleanup logic for the listener (e.g., stop media streams, reset UI)
            });
    
            peer.on('error', err => {
                console.error('Connection error:', err);
            });
    
            peer.on('destroyed', err => {
                console.error('Connection error:', err);
            });
            // Manually end the call
    
            connectionRef.current = peer;
            callRef.current = true;
        }
    }, [])

   
    const endCall = () => {
        connectionRef.current.destroy();  // This will trigger the 'close' event
    }



    const callme = () => {
        // socket.emit('calling', myId.current);
        socket.emit('get-broadcast-id', { listenerId: myId.current });

    }



    return (
        <>
            <div>
                <h1>Viewer</h1>
                <button onClick={callme}>Call me</button>
                <button onClick={endCall}>Destroy me</button>
                {
                    (
                        <div>
                            <div >
                                <div >
                                    {callRef.current || 'Name'}
                                </div>
                                <audio playsInline ref={userAudio} autoPlay width="600" />
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Viewer;
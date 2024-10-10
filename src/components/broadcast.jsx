import { useEffect, useRef, } from "react";
import StaticData from "./staticData";

const socket = StaticData.socket;
const Broadcast = () => {
    const streamRef = useRef();
    const allPeersRef = useRef({});
    const myAudio = useRef()
    const callRef = useRef();
    const myId = useRef('');
    const connectionRef = useRef();
    const peersRef = useRef({});  // Store peer connections for each listener
    // useEffect(() => {
    //     if (myAudio && myAudio.current) {
    //         myAudio.current.srcObject = streamRef.current;
    //     }
    // }, [myAudio]);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then((currentStream) => {
                streamRef.current = currentStream

            });
        socket.on('me', (id) => {
            myId.current = id;
            console.log(myId.current);
        });

        socket.on('get-broadcast-id', ({ listenerId }) => {
             allPeersRef.current[listenerId] = new window.SimplePeer({ initiator: false, trickle: false, stream: streamRef.current });

            
            allPeersRef.current[listenerId].on('signal', (data) => {
                console.log('signal data', data);
                socket.emit('connect-listner', { signal: data, to: callRef.current.from });
            })
            allPeersRef.current[listenerId].on('close', () => {
                console.log('Disconnected from the broadcaster');
                // Cleanup logic for the listener (e.g., stop media streams, reset UI)
            });

            allPeersRef.current[listenerId].on('error', err => {
                console.error('Connection error:', err);
            });
            socket.emit('shake-listener', { listenerId, broadcaster: myId.current, });
        })

        socket.on('connect-to-broadcaster', ({ from, signalData, userToCall }) => {
            callRef.current = { from, signalData, userToCall };

            allPeersRef.current[from].signal(signalData);

        });






    }, []);



    return (
        <>
            <div >
                {/* my video */}
                {
                    myAudio && (
                        <div>
                            <div >
                                <h1>Streaming</h1>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );

}
export default Broadcast;
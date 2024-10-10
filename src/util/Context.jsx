import { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import StaticData from '../components/staticData';

const SocketContext = createContext();
const socket = StaticData.socket;
const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const myVideo = useRef()
    const userVideo = useRef();
    const connectionRef = useRef();
    useEffect(() => {
    if (stream && myVideo.current) {
        myVideo.current.srcObject = stream;
    }
}, [stream, myVideo]); // T
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            
            setStream(currentStream);
            console.log('context',myVideo);
          
        });
        
        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);
    
    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    };
    
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => {
                socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };
    
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };
    
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};
export { ContextProvider, SocketContext };

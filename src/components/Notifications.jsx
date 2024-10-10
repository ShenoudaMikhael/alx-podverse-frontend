import { useContext } from "react"
import { SocketContext } from "../util/Context";
    
const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);
    
return (
    <>
        {call.isReceivingCall && !callAccepted && (
            <div display="flex" justifyContent="space-around" mb="20">
                <div as="h3"> {call.name} is calling </div>
                <button variant="outline" onClick={answerCall} border="1px" borderStyle="solid" borderColor="black">
                    Answer Call
                </button>
            </div>
        )}
    </>
)
}
export default Notifications
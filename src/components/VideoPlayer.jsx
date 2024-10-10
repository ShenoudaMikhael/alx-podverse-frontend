    
import { useContext } from "react"
import { SocketContext } from "../util/Context"

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)
return (
    <div >
            {/* my video */}
        {
            stream && (
                <div>
                    <div >
                        <div >
                            {name || 'Name'}
                        </div>
                        <video playsInline muted ref={myVideo} autoPlay width="600" />
                    </div>
                </div>
            )
        }
              {/* user's video */}
        {
            callAccepted && !callEnded && (
                <div>
                    <div >
                        <div >
                            {call.name || 'Name'}
                        </div>
                        <video playsInline ref={userVideo} autoPlay width="600" />
                    </div>
                </div>
            )
        }
    </div>
)
}
    export default VideoPlayer

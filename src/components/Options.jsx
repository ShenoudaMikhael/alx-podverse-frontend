
import { useState, useContext } from "react"
import { SocketContext } from "../util/Context";

const Options = () => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <div >
            <div >
                <div >
                    <div >
                        <div colSpan={1} p="6">
                            <div as="h6"> Account Info </div>
                            <label>Username</label>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} width="100%" />
                            {/* <CopyToClipboard text={me} mt="20">
                                <button leftIcon={<BiClipboard />} colorScheme='teal' variant='solid'>
                                    Copy ID
                                </button>
                            </CopyToClipboard> */}
                        </div>
                        <div colSpan={1} p="6">
                            <div as="h6"> Make a Call </div>
                            <label> User id to call </label>
                            <input type='text' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} width="100%" />
                            {
                                callAccepted && !callEnded ? (
                                    <button onClick={leaveCall} >
                                        Hang up
                                    </button>
                                ) : (
                                    <button onClick={() => callUser(idToCall)} >
                                        Call
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Options
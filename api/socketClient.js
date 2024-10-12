import Cookies from "js-cookie";
import { io } from "socket.io-client";

class SocketClient {
    static socket = null;

    static getInstance() {
        if (!this.socket) {
            this.socket = io.connect("http://localhost:3000", {
                transports: ["websocket"],
                auth: {
                    token: Cookies.get("token"),
                },
            });
        }
        return this.socket;
    }
}

export default SocketClient;
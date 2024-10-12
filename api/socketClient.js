import Cookies from "js-cookie";
import { io } from "socket.io-client";

export default class SocketClient {

    static socket = io.connect("http://localhost:3000", {
        transports: ["websocket"],
        auth: {
            token: Cookies.get("token")
        },
    });

    static getSocketId = this.socket.id
}
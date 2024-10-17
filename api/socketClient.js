import Cookies from "js-cookie";
import { io } from "socket.io-client";

class SocketClient {
    static socket = null;

    static async getInstance() {
        if (!this.socket) {
            this.socket = io.connect("https://podverse.thedreamcatcher.dev/:5000", {
                transports: ["websocket"],
                auth: {
                    token: Cookies.get("token"),
                },
            });

            // Return a promise that resolves when the connection is established
            return new Promise((resolve) => {
                this.socket.on('connect', () => {
                    console.log('Connected with socket ID:', this.socket.id); // Log socket ID
                    resolve(this.socket); // Resolve with the socket instance
                });
            });
        }
        return this.socket;
    }
}

export default SocketClient;
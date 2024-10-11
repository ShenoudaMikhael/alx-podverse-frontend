import io from 'socket.io-client';


class StaticData {
    static socket =  io('http://192.168.1.18:3000', {
        transports: ['websocket'],
        // auth: {
        //     token: 'your_jwt_token_here'  // Replace with the actual JWT token
        // },

    });


}
export default StaticData;
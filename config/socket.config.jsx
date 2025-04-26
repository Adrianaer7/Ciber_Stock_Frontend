import { Manager } from 'socket.io-client';

const iniciarSocket = (token) => {
    const manager = new Manager(process.env.backendURL.toString(), {
        withCredentials: true, // Permite el envío de cookies/tokens en CORS
        extraHeaders: {
            authentication: token
        }
    });

    const socket = manager.socket('/');   //ejecuta el handleConnection
    socket?.removeAllListeners();
    return socket
}

export default iniciarSocket
import { Manager } from 'socket.io-client';

const iniciarSocket = (token) => {
    try {
        if (!process.env.backendURL || !token) return null

        const manager = new Manager(process.env.backendURL.toString(), {
            withCredentials: true,
            autoConnect: true,
            reconnectionAttempts: 3,
            extraHeaders: {
                authentication: token
            }
        });

        const socket = manager.socket('/');
        socket?.removeAllListeners();
        socket.on("connect_error", (err) => {
            console.warn("Socket no disponible:", err.message)
        })
        return socket
    } catch (error) {
        console.warn("No se pudo iniciar el socket:", error.message)
        return null
    }
}

export default iniciarSocket

import { Manager } from 'socket.io-client';

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.backendURL

const iniciarSocket = (token) => {
    try {
        if (!backendURL || !token) return null

        const manager = new Manager(backendURL.toString(), {
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

import { Manager } from 'socket.io-client';

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.backendURL

const iniciarSocket = (token) => {
    try {
        if (!backendURL || !token) return null

        // En el browser, extraHeaders no funciona; hay que usar auth.
        // El servidor también acepta headers.authentication por compatibilidad.
        const manager = new Manager(backendURL.toString(), {
            withCredentials: true,
            autoConnect: true,
            reconnectionAttempts: 5,
            auth: { token },
        });

        const socket = manager.socket('/');
        socket.removeAllListeners();
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

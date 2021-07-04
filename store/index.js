export const state = () => ({
    loadingOverlayVisible: false,
    socketTimer: null,
    messageList: [],
    socket: {
        isConnected: false,
        reconnectError: false,
        lastEchoMessage: ''
    }
})

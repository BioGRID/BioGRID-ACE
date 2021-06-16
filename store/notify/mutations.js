const mutations = {
    SHOW_NOTIFY: (state) => {
        state.notifyBar = true
    },
    HIDE_NOTIFY: (state) => {
        state.notifyBar = false
    },
    SET_NOTIFY_MESSAGE: (state, message) => {
        state.notifyMessage = message
    },
    SET_NOTIFY_COLOR: (state, color) => {
        state.notifyColor = color
    }
}

export default mutations

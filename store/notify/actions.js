const actions = {
    showNotifyBar (context) {
        context.commit('SHOW_NOTIFY')
    },
    hideNotifyBar (context) {
        context.commit('HIDE_NOTIFY')
    },
    displayNotification (context, payload) {
        return new Promise((resolve) => {
            context.commit('SET_NOTIFY_MESSAGE', payload.message)
            context.commit('SET_NOTIFY_COLOR', payload.color)
            context.commit('SHOW_NOTIFY')
            resolve()
        })
    }
}

export default actions

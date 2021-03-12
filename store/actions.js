import cookieparser from 'cookieparser'

const actions = {
    // Action to be performed on server init
    async nuxtServerInit ({ commit }, { req }) {
        if (process.server && process.static) { return }
        if (!req.headers.cookie) { return }

        const parsed = cookieparser.parse(req.headers.cookie)
        const refreshTokenCookie = parsed['auth._refresh_token.local']

        if (refreshTokenCookie === 'null' || refreshTokenCookie === false) {
            return
        }

        await this.$auth.fetchUser()

        // If we have a token, set it
        commit('users/SET_USER', {
            user: this.$auth.user,
            token: this.$auth.strategy.token.get()
        })
    },
    toggleLoadingOverlay: ({ commit }) => {
        commit('TOGGLE_LOADING_OVERLAY')
    }
}

export default actions

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
    },
    // Initialize Application Data
    async initializeApplicationData (context) {
        if (context.state.users.user !== undefined) {
            await Promise.all([
                // Get a list of all the application users
                context.dispatch('users/fetchUsers', {}, { root: true })
            ]).then(() => {
                // Redirect to Dashboard
                this.$router.push('/')
            }).catch((error) => {
                console.error(error)
                //context.dispatch('notify/displayNotification', notification('error', 'login_error_apisdown'), { root: true })
            })
        }
    },
}

export default actions

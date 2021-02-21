import jwtDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

const actions = {
    // Action to be performed on server init
    async nuxtServerInit ({ commit }, { req }) {
        if (process.server && process.static ) return
        if (!req.headers.cookie) return

        const parsed = cookieparser.parse(req.headers.cookie)
        const accessTokenCookie = parsed.access_token

        if (!accessTokenCookie) return

        const decodedUser = jwtDecode(accessTokenCookie)
        if (!decodedUser) return

        // If we have a token, set it
        commit( 'users/SET_USER', { user: decodedUser, token: accessTokenCookie })

    },
    toggleLoadingOverlay: ({ commit }) => {
        commit('TOGGLE_LOADING_OVERLAY')
    }
}

export default actions

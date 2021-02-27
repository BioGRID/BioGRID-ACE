import { auth } from '@/plugins/firebase'
import Cookie from 'js-cookie'

const actions = {
    // Update details about the user
    async updateUser ({ commit }, { user }) {
        let userInfo = null
        let token = null
        if (user) {
            token = await user.getIdToken()
            const idTokenResult = await user.getIdTokenResult()
            userInfo = idTokenResult.claims
        }
        Cookie.set('access_token', token, {
            sameSite: 'none',
            secure: true
        })
        commit('SET_USER', {
            user: userInfo,
            token
        })
    },
    // Login a new user with firebase auth
    async login ({ dispatch }, { email, password }) {
        dispatch('toggleLoadingOverlay', {}, { root: true })
        try {
            await auth.signInWithEmailAndPassword(
                email,
                password
            )
            await dispatch('updateUser', { user: auth.currentUser })
        } finally {
            dispatch('toggleLoadingOverlay', {}, { root: true })
        }
    },
    // Logout a user with firebase auth
    async logout ({ dispatch }) {
        await auth.signOut()
        await dispatch('updateUser', { user: null })
        Cookie.remove('access_token')
    }
}

export default actions

import { auth } from '@/plugins/firebase'

const actions = {
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
    async updateUser ({ commit }, { user }) {
        const token = await user.getIdToken()
        commit('SET_USER', { user, token })
    },
    cleanup () {},
    async logout ({ commit }) {
        await auth.signOut()
        commit('SET_USER', { user: null })
    }
}

export default actions

// import CurationAPI from '@/api/curationapi'

const actions = {
    // Login a new user
    async login ({ dispatch, commit }, { email, password }) {
        dispatch('toggleLoadingOverlay', {}, { root: true })
        try {
            await this.$auth.loginWith('local', {
                data: {
                    email,
                    password
                }
            })
            commit('SET_USER', {
                user: this.$auth.user,
                token: this.$auth.strategy.token.get()
            })
            await dispatch('initializeApplicationData', {}, { root: true })
        } finally {
            dispatch('toggleLoadingOverlay', {}, { root: true })
        }
    },
    // Logout a user
    async logout ({ commit }) {
        commit('SET_USER', {
            user: null,
            token: null
        })
        await this.$auth.logout()
    },
    // Fetch all users
    async fetchUsers (context) {
        try {
            const data = await this.$authapi.GET_ALL_USERS(context.state.token)
            const userHash = {}
            for (const user of data.data.data) {
                userHash[String(user.id)] = user
            }
            context.commit('UPDATE_USERS', userHash)
        } catch (error) {
            console.error(error)
            console.error('Unable to fetch list of users')
        }
    }
    // Change password of logged in user
    /* async changeMyPassword ({ dispatch }, { email, oldPassword, newPassword }) {
        dispatch('toggleLoadingOverlay', {}, { root: true })
        try {
            const credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword)
            await auth.currentUser.reauthenticateWithCredential(credential)
            await auth.currentUser.updatePassword(newPassword)
        } finally {
            dispatch('toggleLoadingOverlay', {}, { root: true })
        }
    } */
}

export default actions

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

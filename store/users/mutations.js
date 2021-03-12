const mutations = {
    SET_USER (state, { user, token }) {
        if (user == null) {
            state.user = null
            state.token = null
            state.class = null
        } else {
            state.user = user
            state.token = token
            state.class = user.class
        }
    }
}

export default mutations

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
    },
    UPDATE_USERS: (state, users) => {
        state.users = users
    },
    UPDATE_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions
    },
    TOGGLE_FORCE_LOGOUT: (state) => {
        state.forceLogout = !state.forceLogout
    }
}

export default mutations

const mutations = {
    SET_USER (state, { user, token }) {
        if (user == null) {
            state.user = null
            state.token = null
            state.role = null
        } else {
            const { user_id, email, role } = user
            state.user = {
                user_id,
                email
            }
            state.token = token
            state.role = role
        }
    }
}

export default mutations

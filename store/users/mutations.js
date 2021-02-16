const mutations = {
    SET_USER (state, { user, token }) {
        if (user == null) {
            state.user = null
            state.token = null
        } else {
            const { uid, email, emailVerified, displayName, photoURL } = user
            state.user = {
                uid,
                displayName,
                email,
                emailVerified,
                photoURL: photoURL || null
            }
            state.token = token
        }
        // isAdmin: claims.custom_claim
    }
}

export default mutations

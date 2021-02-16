const actions = {
    toggleLoadingOverlay: ({ commit }) => {
        commit('TOGGLE_LOADING_OVERLAY')
    }
    /* async nuxtServerInit ({ dispatch }, context) {
        if (context && context.locals && context.locals.user) {
            const { allClaims: claims, ...authUser } = context.res.locals.user

            console.info(
                'Auth User Verified on Server-Side. User:',
                authUser,
                'CLAIMS:',
                claims
            )

            await dispatch('auth/onAuthStateChangedAction', {
                authUser,
                claims
            })
        }
    }, */
    /* async onAuthStateChanged ({ commit }, { authUser }) {
        console.log('Auth State Changed2')
        if (!authUser) {
            await dispatch('auth/cleanup')
            return
        }

        // you can request additional fields if they are optional (e.g. photoURL)
        if (authUser && authUser.getIdToken) {
            try {
                const idToken = await authUser.getIdToken(true)
                console.info('idToken', idToken)
            } catch (e) {
                console.error(e)
            }
        }
        commit('SET_AUTH_USER', { authUser, claims })
    } */
}

export default actions

import cookieparser from 'cookieparser'

const actions = {
    // Action to be performed on server init
    async nuxtServerInit ({ commit }, { req }) {
        if (process.server && process.static) { return }
        if (!req.headers.cookie) { return }

        const parsed = cookieparser.parse(req.headers.cookie)
        const refreshTokenCookie = parsed['auth._refresh_token.local']

        if (refreshTokenCookie === 'null' || refreshTokenCookie === false) {
            return
        }

        await this.$auth.fetchUser()

        // If we have a token, set it
        commit('users/SET_USER', {
            user: this.$auth.user,
            token: this.$auth.strategy.token.get()
        })
    },
    toggleLoadingOverlay: ({ commit }) => {
        commit('TOGGLE_LOADING_OVERLAY')
    },
    // Initialize Application Data
    async initializeApplicationData (context) {
        if (context.state.users.user !== undefined) {
            await Promise.all([
                // Get a list of all the application users
                context.dispatch('users/fetchUsers', {}, { root: true }),
                // Fetch list of organisms from the API for the store
                context.dispatch('annotation/fetch_organisms', {}, { root: true })
                // Fetch list of ontologies from the API
                // context.dispatch('annotation/fetch_ontologies', {}, { root: true }),
                // Fetch list of curation_groups from the API
                // context.dispatch('curation/fetch_curation_groups', {}, { root: true }),
                // Fetch list of attribute types from the API
                // context.dispatch('curation/fetch_attribute_types', {}, { root: true }),
                // Get the list of permissions
                // context.dispatch('fetch_permissions', {}, {}),
                // Get latest 60 processing tasks
                // context.dispatch('curation/fetch_processing_tasks', {}, { root: true }),
                // Get Entity Families
                // context.dispatch('curation/fetch_entity_families', {}, { root: true }),
                // Get Entity Workflows
                // context.dispatch('curation/fetch_entity_workflows', {}, { root: true })
            ]).then(() => {
                // Redirect to Dashboard
                this.$router.push('/')
            }).catch((error) => {
                console.error(error)
                // context.dispatch('notify/displayNotification', notification('error', 'login_error_apisdown'), { root: true })
            })
        }
    }
}

export default actions

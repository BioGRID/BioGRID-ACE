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
            await dispatch('initializeApplicationData', { redirect: true }, { root: true })
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
            for (const user of data) {
                userHash[String(user.id)] = user
            }
            context.commit('UPDATE_USERS', userHash)
        } catch (error) {
            console.error(error)
            console.error('Unable to fetch list of users')
        }
    },
    async fetch_permissions (context) {
        const data = await this.$authapi.PERMISSION_GETALL()
        if (data !== undefined) {
            const permHash = {}
            for (const permRecord of data) {
                permHash[permRecord.name] = permRecord
            }
            context.commit('UPDATE_PERMISSIONS', permHash)
        } else {
            throw new Error('Unable to fetch list of permissions from auth api')
        }
    }
}

export default actions

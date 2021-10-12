import notification from '@/utilities/notifications'

const actions = {
    // Login a new user
    async login ({ dispatch, commit }, { email, password }) {
        dispatch('enableLoadingOverlay', {}, { root: true })
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
            await dispatch('disableLoadingOverlay', {}, { root: true })
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
    async fetch_users (context) {
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
    },
    async update_user (context, payload) {
        context.dispatch('enableLoadingOverlay', {}, { root: true })
        try {
            const data = await this.$authapi.USER_UPDATE(context.state.token, payload, payload.id)
            if (data === true) {
                context.dispatch('notify/displayNotification', notification('success', 'user_update_success'), { root: true })
            }
        } catch (error) {
            context.dispatch('notify/displayNotification', notification('error', error.message), { root: true })
        } finally {
            context.dispatch('disableLoadingOverlay', {}, { root: true })
        }
    }
}

export default actions

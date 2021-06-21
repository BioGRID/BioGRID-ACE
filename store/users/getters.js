const getters = {
    isLoggedIn: (state) => {
        if (state.user) {
            return true
        }
        return false
    },
    isPermitted: state => (testClass) => {
        if (state.class === 'admin') {
            return true
        } else if (state.class === 'poweruser' && ['poweruser', 'manager', 'standard', 'observer', 'public'].includes(testClass)) {
            return true
        } else if (state.class === 'manager' && ['manager', 'standard', 'observer', 'public'].includes(testClass)) {
            return true
        } else if (state.class === 'standard' && ['standard', 'observer', 'public'].includes(testClass)) {
            return true
        } else if (state.class === 'observer' && ['observer', 'public'].includes(testClass)) {
            return true
        } else if (state.class === 'public' && ['public'].includes(testClass)) {
            return true
        }
        return false
    },
    getUser: state => state.user,
    getUserClass: state => state.user.class,
    getUsers: state => state.users,
    getUserDetails: state => (userID) => {
        return state.users[userID]
    },
    getPermission: state => (permissionName) => {
        return state.permissions[permissionName]
    },
    getToken: state => state.token
}

export default getters

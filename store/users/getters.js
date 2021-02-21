const getters = {
    isLoggedIn: (state) => {
        if (state.user) {
            return true
        } 
        return false
    },
    isPermitted: (state) => (testRole) => {
        if (state.role === 'admin') {
            return true
        } else if (state.role === 'manager' && ['manager','user','observer'].includes(testRole)) {
            return true
        } else if (state.role === 'user' && ['user','observer'].includes(testRole)) {
            return true
        } else if (state.role === 'observer' && ['observer'].includes(testRole)) {
            return true
        } 
        return false
    }
}

export default getters

export const state = () => ({
    user: null,
    token: null,
    class: null,
    minPasswordLength: 10,
    users: {},
    permissions: {},
    permissionLevels: [
        { text: 'Public', value: 'public' },
        { text: 'Observer', value: 'observer' },
        { text: 'Standard', value: 'standard' },
        { text: 'Manager', value: 'manager' },
        { text: 'Power User', value: 'poweruser' },
        { text: 'Admin', value: 'admin' }
    ],
    forceLogout: false
})

export const state = () => ({
    loadingOverlayVisible: false,
    navItems: [
        { to: '/', icon: 'mdi-home-circle', title: 'HOME', classVal: '' },
        { to: '/test', icon: 'mdi-star', title: 'TEST', classVal: '' },
        { to: '/test/admin', icon: 'mdi-star', title: 'ADMIN', classVal: '' },
        { to: '/login', icon: 'mdi-check', title: 'LOGOUT', classVal: '' }
    ]
})

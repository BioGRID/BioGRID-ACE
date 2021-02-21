/**
 * Check to see if a user is authorized to visit an observer page
 * a page before displaying the page
 */
export default function (context: any) {
    if (!context.store.getters['users/isLoggedIn']) {
        return context.redirect('/login')
    }
    if (!context.store.getters['users/isPermitted']("observer")) {
        return context.redirect('/error/unauthorized')
    }
}
/**
 * Check to see if a user is authorized to visit an admin page
 * a page before displaying the page
 */
export default function (context: any) {
    if (!context.store.getters['users/isLoggedIn']) {
        return context.redirect('/login')
    }
    if (!context.store.getters['users/isPermitted']("admin")) {
        return context.redirect('/error/unauthorized')
    }
}

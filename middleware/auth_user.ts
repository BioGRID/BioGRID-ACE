/**
 * Check to see if a user is authorized to visit an user page
 * a page before displaying the page
 */
export default function (context: any) {
    if (context.$permissions.canAccess()) {
        if (!context.$permissions.isPermitted('user')) {
            return context.redirect('/error/unauthorized')
        }
        return
    }
    return context.redirect('/login')
}

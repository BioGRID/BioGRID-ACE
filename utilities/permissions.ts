/**
 * A service class for dealing with permission checking
 * in components where it's required
 */

export default class Permissions {
    private $store: any

    constructor ($store: any) {
        this.$store = $store
    }

    public canAccess (): boolean {
        return this.$store.getters['users/isLoggedIn']
    }

    public isPermitted (permName: string): boolean {
        // If user is logged in, check to see if they have the
        // appropriate permission level
        if (this.canAccess()) {
            return this.$store.getters['users/isPermitted'](permName)
        }
        return false
    }
}

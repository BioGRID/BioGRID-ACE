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

    public convertPermissionLevelToInteger (permissionLevel: string) {
        switch (permissionLevel) {
            case 'public': return 0
            case 'observer': return 1
            case 'standard': return 2
            case 'manager': return 3
            case 'poweruser': return 4
            case 'admin': return 5
        }
        return 6
    }
}

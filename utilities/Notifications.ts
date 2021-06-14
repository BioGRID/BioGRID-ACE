// This is used for generating notification messages
// in a standardized way that can be incorporated into multiple
// different views

import { StringHash, AnyHash } from '@/utilities/types'

export default function notification (type: string, id: string) {
    const colors: StringHash = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
        default: 'primary'
    }

    // Keep this alphabetical so it's easier to maintain
    // No periods, exclamation marks, question marks etc at end of sentences
    // Start each with capital letter, and all remaining lower case unless
    // they are proper names
    const messages: AnyHash = {
        login: {
            error: {
                notfound: 'Unrecognized username',
                unauthorized: 'Unrecognized username/password combination',
                serverdown: 'Authentication server is not accessible',
                apisdown: 'Requests to one or more required apis has failed, please try again later'
            }
        },
        permission: {
            add: {
                success: 'Successfully added new permission',
                conflict: 'Permission with this name already exists',
                unknown: 'Unable to add permission'
            },
            update: {
                success: 'Successfully updated permission details',
                conflict: 'Permission details conflict with an existing permission. Unable to update',
                unknown: 'Unable to update permission information'
            }
        },
        user: {
            add: {
                success: 'Successfully added new user',
                conflict: 'User information conflicts with an existing user (username or email)',
                unknown: 'Unable to add user'
            },
            update: {
                success: 'Successfully updated user information',
                conflict: 'User information conflicts with an existing user (same name or email)',
                unknown: 'Unable to update user information'
            },
            logout: {
                unauthorized: 'Account logout is not authorized for this user',
                inaccessible: 'Logout server is currently inaccessible'
            }
        },
        curationgroup: {
            add: {
                success: 'Successfully added new curation group',
                conflict: 'Curation group name conflicts with an existing curation group',
                unknown: 'Unable to add curation group'
            },
            update: {
                success: 'Successfully updated curation group',
                conflict: 'Curation group name conflicts with an existing curation group',
                unknown: 'Unable to update curation group'
            }
        },
        dataset: {
            fetch: {
                nonexistant: 'The publication ID you submitted does not exist. Please try an alternative ID',
                improper: 'Improperly formatted elastic search query',
                offline: 'Publication fetching service is currently offline',
                unrecognized: 'Unrecognized elastic search index',
                timeout: 'Max attempts to fetch publication exceeded. Please try again later',
                maximumreached: 'You have the maximum number of datasets already opened. Please close an existing open dataset before attempting to load an additional one'
            }
        },
        history: {
            add: {
                unknown: 'Unable to add new history entry',
                improper: 'Improperly formatted history entry, unable to add'
            }
        },
        curate: {
            workflow: {
                blockexists: 'One or more of the blocks selected already exists in the workflow, they cannot be added twice'
            }
        }
    }

    const getMessage = (source: string, operation: string, msgtype: string) => {
        try {
            return messages[source][operation][msgtype]
        } catch (error) {
            return undefined
        }
    }

    let color: string = colors.default
    if (colors[type] !== undefined) {
        color = colors[type]
    }

    const idSplit: string[] = id.split('_')
    let message: string = getMessage(idSplit[0], idSplit[1], idSplit[2])

    if (message === undefined) {
        console.log('Notification undefined for ' + id + ' in notifications.ts')
        message = 'unknown notification'
    }

    return {
        message,
        color
    }
}

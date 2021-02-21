import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

// Allows only admin level users to change the status of a user within
// the system
exports.setUserRole = functions.https.onCall(async (data, context) => {
    if (context.auth) {
        if (!context.auth.token.role || context.auth.token.role !== 'admin') {
            return {
                status: 'error',
                message: 'Permission denied'
            }
        } else {
            try {
                const user = await admin.auth().getUserByEmail(data.email)
                await admin.auth().setCustomUserClaims(user.uid, {
                    role: data.role
                })
                return {
                    status: 'success',
                    message: 'Successfully changed role to ' + data.role
                }
            } catch (error) {
                return {
                    status: 'error',
                    message: error
                }
            }
        }
    }

    return {
        status: 'error',
        message: 'No auth instance detected'
    }
})

// Adds a default role to any newly created user
exports.addDefaultRole = functions.auth.user().onCreate(async (user) => {
    if (user.email) {
        try {
            await admin.auth().setCustomUserClaims(user.uid, {
                role: 'user'
            })
        } catch (error) {
            console.log(error)
        }
    }
})

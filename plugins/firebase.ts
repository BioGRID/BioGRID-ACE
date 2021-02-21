import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

const config = {
    apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
    authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGE_SENDING_ID,
    appId: process.env.NUXT_ENV_FIREBASE_APP_ID
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

// Listen for auth status changes
const auth = firebase.auth()
export default (context: any) => {
    auth.onIdTokenChanged(async (user) => {
        await context.store.dispatch('users/updateUser', { user })
    })
}

const functions = firebase.functions()

export { auth, functions }

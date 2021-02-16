import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
    authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NUXT_ENV_FIREBASE_DATABASE_URL,
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
        if (!user) {
            context.app.router.push('/login')
        } else {
            await context.store.commit('users/SET_USER', { user })
        }
    })
}

export { auth }

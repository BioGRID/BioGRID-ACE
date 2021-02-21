
// LIBRARIES
import Vuex from 'vuex'

// UTILITIES
import { createLocalVue } from '@vue/test-utils'

describe('store/index', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    let NuxtStore
    let store
    beforeAll(async () => {
        const storePath = `${process.env.buildDir}/store.js`
        NuxtStore = await import(storePath)
    })

    beforeEach(async () => {
        store = await NuxtStore.createStore()
    })

    describe('store/index/loadingOverlayVisible', () => {
        test('loadingOverlayVisible is false', () => {
            expect(store.state.loadingOverlayVisible).toBeFalsy()
        })
    })
})

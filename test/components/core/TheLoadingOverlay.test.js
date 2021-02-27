// LIBRARIES
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// COMPONENTS
import TheLoadingOverlay from '@/components/core/TheLoadingOverlay.vue'

// UTILITIES
import { shallowMount, createLocalVue } from '@vue/test-utils'

// SETUP LOCALIZED VUE
const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper = null

// RUN BEFORE EACH TEST
beforeEach(() => {
    const vuetify = new Vuetify()
    const store = new Vuex.Store({
        state: {
            loadingOverlayVisible: false
        }
    })
    wrapper = shallowMount(TheLoadingOverlay, {
        localVue,
        vuetify,
        store
    })
})

// RUN AFTER EACH TEST
afterEach(() => {
    wrapper.destroy()
})

describe('components/core/TheLoadingOverlay', () => {
    test('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('renders properly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('defaults to invisible', () => {
        expect(wrapper.vm.loadingOverlayVisible).toBe(false)
    })
})

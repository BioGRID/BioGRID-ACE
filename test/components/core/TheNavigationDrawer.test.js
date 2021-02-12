// LIBRARIES
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// COMPONENTS
import TheNavigationDrawer from '@/components/core/TheNavigationDrawer.vue'

// UTILITIES
import { shallowMount, createLocalVue } from '@vue/test-utils'

// SETUP LOCALIZED VUE
const localVue = createLocalVue()
localVue.use(Vuex)

// SETUP MOCKS
const $nuxt = { $on: jest.fn() }
const mocks = {
    $nuxt
}

let wrapper = null

// RUN BEFORE EACH TEST
beforeEach(() => {
    const vuetify = new Vuetify()
    wrapper = shallowMount(TheNavigationDrawer, {
        mocks,
        localVue,
        vuetify
    })
})

// RUN AFTER EACH TEST
afterEach(() => {
    wrapper.destroy()
})

describe('TheNavigationDrawer', () => {
    test('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('renders properly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('when created, listener is set for event bus', () => {
        expect($nuxt.$on).toHaveBeenCalledWith('toggleDrawerVariant', wrapper.vm.toggleDrawerVariant)
    })
    test('toggle drawer variant', () => {
        expect(wrapper.vm.miniVariant).toBeFalsy()
        wrapper.vm.toggleDrawerVariant()
        expect(wrapper.vm.miniVariant).toBeTruthy()
    })
})

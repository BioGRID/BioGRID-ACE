// LIBRARIES
import Vuetify from 'vuetify'

// COMPONENTS
import errorPage from '@/pages/error/notfound.vue'

// UTILITIES
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
    const vuetify = new Vuetify()
    wrapper = shallowMount(errorPage, {
        localVue,
        vuetify
    })
})

afterEach(() => {
    wrapper.destroy()
})

describe('pages/error/notfound', () => {
    test('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('renders properly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})

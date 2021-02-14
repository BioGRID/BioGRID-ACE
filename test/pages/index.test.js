
// LIBRARIES
import Vuetify from 'vuetify'

// COMPONENTS
import index from '@/pages/index.vue'

// UTILITIES
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
    const vuetify = new Vuetify()
    wrapper = shallowMount(index, {
        localVue,
        vuetify
    })
})

afterEach(() => {
    wrapper.destroy()
})

describe('pages/index.vue', () => {
    test('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('renders properly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})

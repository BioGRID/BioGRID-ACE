
// LIBRARIES
import Vuetify from 'vuetify'

// COMPONENTS
import TheFooter from '@/components/core/TheFooter.vue'

// UTILITIES
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
    const vuetify = new Vuetify()
    wrapper = shallowMount(TheFooter, {
        localVue,
        vuetify
    })
})

afterEach(() => {
    wrapper.destroy()
})

describe('components/core/TheFooter', () => {
    test('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('renders properly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})

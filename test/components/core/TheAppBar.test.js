
// LIBRARIES
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// COMPONENTS
import TheAppBar from '@/components/core/TheAppBar.vue'

// UTILITIES
import { mount, createLocalVue } from '@vue/test-utils'

// SETUP LOCALIZED VUE
const localVue = createLocalVue()
localVue.use(Vuex)

// SETUP MOCKS
const $nuxt = { $emit: jest.fn() }
const mocks = {
    $nuxt
}

let wrapper = null

// RUN BEFORE EACH TEST
beforeEach(() => {
    const vuetify = new Vuetify()
    const store = new Vuex.Store({
        state: {
            navItems: []
        }
    })
    wrapper = mount(TheAppBar, {
        mocks,
        localVue,
        vuetify,
        store
    })
})

// RUN AFTER EACH TEST
afterEach(() => {
    wrapper.destroy()
})

describe('TheAppBar', () => {
    test('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('renders properly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('app bar nav icon click fires an emit event', async () => {
        await wrapper.find('.navDrawerIcon').trigger('click')
        expect($nuxt.$emit).toHaveBeenCalledWith('toggleDrawerVariant')
    })
})

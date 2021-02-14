
// LIBRARIES
import Vuetify from 'vuetify'

// COMPONENTS
import index from '@/pages/login/index.vue'

// UTILITIES
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

let wrapper
let emailField
let passwordField

beforeEach(async () => {
    const vuetify = new Vuetify()
    wrapper = mount(index, {
        localVue,
        vuetify
    })

    emailField = await wrapper.find('input[name="email"]')
    passwordField = await wrapper.find('input[name="password"]')
})

afterEach(() => {
    wrapper.destroy()
})

describe('pages/login/index.vue', () => {
    test('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('renders properly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('email field has errors with invalid email', () => {
        emailField.setValue('test')
        expect(wrapper.vm.emailErrors.length).toBeGreaterThan(0)
    })
    test('email field has no errors with valid email', () => {
        emailField.setValue('test@gmail.com')
        expect(wrapper.vm.emailErrors.length).toBe(0)
    })
    test('email field has error if originally valid but then erased', () => {
        emailField.setValue('test@gmail.com')
        expect(wrapper.vm.emailErrors.length).toBe(0)
        emailField.setValue('')
        expect(wrapper.vm.emailErrors.length).toBeGreaterThan(0)
    })
    test('password field has error if originally valid but then erased', () => {
        passwordField.setValue('supersecret')
        expect(wrapper.vm.passwordErrors.length).toBe(0)
        passwordField.setValue('')
        expect(wrapper.vm.passwordErrors.length).toBeGreaterThan(0)
    })
    test('login button is disabled if any field errors exist', () => {
        expect(wrapper.vm.isInvalid).toBeTruthy()
        emailField.setValue('test@gmail.com')
        expect(wrapper.vm.isInvalid).toBeTruthy()
        emailField.setValue('')
        expect(wrapper.vm.isInvalid).toBeTruthy()
        passwordField.setValue('supersecret')
        expect(wrapper.vm.isInvalid).toBeTruthy()
        emailField.setValue('test@gmail.com')
        expect(wrapper.vm.isInvalid).toBeFalsy()
    })
    test('enter key on email or password field triggers login', async () => {
        const spyLogin = jest.spyOn(wrapper.vm, 'login')
        await emailField.trigger('keyup.enter')
        expect(spyLogin).toHaveBeenCalled()
        await passwordField.trigger('keyup.enter')
        expect(spyLogin).toHaveBeenCalled()
    })
    test('button click triggers login', async () => {
        const spyLogin = jest.spyOn(wrapper.vm, 'login')
        emailField.setValue('test@gmail.com')
        passwordField.setValue('supersecret')
        const button = await wrapper.find('button')
        button.trigger('click')
        expect(spyLogin).toHaveBeenCalled()
    })
})

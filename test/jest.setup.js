import Vue from 'vue'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'
import Vuelidate from 'vuelidate'
import { Component } from 'nuxt-property-decorator'

Component.registerHooks(['validations'])

Vue.use(Vuelidate)
Vue.use(Vuetify)

// Mock Nuxt Components
config.stubs.nuxt = { template: '<div />' }
config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
config.stubs['no-ssr'] = { template: '<span><slot /></span>' }

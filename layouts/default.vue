<template>
  <v-app dark>
    <TheNavigationDrawer />
    <TheAppBar />
    <v-main>
        <nuxt />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TheFooter from '@/components/core/TheFooter.vue'
import TheAppBar from '@/components/core/TheAppBar.vue'
import TheNavigationDrawer from '@/components/core/TheNavigationDrawer.vue'

@Component({
    components: {
        TheFooter,
        TheAppBar,
        TheNavigationDrawer
    }
})
export default class DefaultLayout extends Vue {}
</script>

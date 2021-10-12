<template>
    <v-container fluid class="index-page pa-2">
        <v-container fluid class="pt-0">
            {{ datasetID }}
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DatasetViewPage extends Vue {
    private datasetID: number = 0

    public asyncData (context: any) {
        const slug: number = context.route.params.slug
        if (!Number.isInteger(Number(slug))) {
            return context.redirect('/error/notfound')
        }

        return {
            datasetID: Number(slug)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

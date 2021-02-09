<template>
    <div class="the-footer">
        <v-footer
            app
            color="primary"
            inset
            :fixed="false"
        >
            <v-container class="pa-0">
                <v-row>
                    <v-col
                        class="text-center white--text"
                        cols="12"
                    >
                        <span>Copyright &copy; {{ new Date().getFullYear() }}, <a :href="copyrightLinkout" :title="copyrightOwner">{{ copyrightOwner }}</a>, All Rights Reserved</span>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheFooter extends Vue {
    private copyrightOwner: string = 'BioGRID Project'
    private copyrightLinkout: string = 'https://thebiogrid.org'
}
</script>

<style lang="scss" scoped>
     a, a:visited {
         color: #ffcc2d;
         font-weight: bold;
         text-decoration: none;
     }
     a:hover {
         color: #cc0910;
     }
</style>

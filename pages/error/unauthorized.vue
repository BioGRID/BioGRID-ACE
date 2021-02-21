<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex class="text-center">
                <v-card outlined width="800" height="320" class="mx-auto" raised>
                    <v-container>
                        <v-row>
                            <v-col sm="6" class="pa-0">
                                <v-card flat class="mx-auto ml-0">
                                    <v-img
                                        height="319px"
                                        class="pa-0"
                                        :src="require('~/assets/images/permission_denied.jpg')"
                                    />
                                </v-card>
                            </v-col>
                            <v-col sm="6">
                                <v-card flat class="text-left mr-3" style="height: 295px">
                                    <v-row>
                                        <v-col sm="12">
                                            <h1 class="display-1 font-weight-condensed">
                                                Unauthorized (401)
                                            </h1>
                                            <p class="mt-3">
                                                Unfortunately, you've attempted to access a location, in which your account has insufficient permissions to view. If you believe this is in error, please contact the application administrator and request an elevation of your permission level. We apologize for any inconvenience this may have caused.
                                            </p>
                                            <v-btn
                                                size="x-large"
                                                color="primary"
                                                to="/"
                                            >
                                                Return to Home
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Error401 extends Vue {
    get layout () {
        return 'fullpage'
    }
}

</script>

<style lang="scss" scoped>
</style>

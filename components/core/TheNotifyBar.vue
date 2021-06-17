<template>
    <div id="ace-notifybar">
        <v-snackbar
            app
            :value="notifyBar"
            :bottom="true"
            :color="notifyColor"
            :timeout="notifyTimeout"
            @input="closeNotifyBar"
        >
            <span id="notifyMessage">{{ notifyMessage }}</span>
            <template #action="{ attrs }">
                <v-btn
                    dark
                    text
                    v-bind="attrs"
                    @click="closeNotifyBar"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const notify = namespace('notify')

@Component
export default class TheNotifyBar extends Vue {
    @notify.State private notifyColor!: string;
    @notify.State private notifyBar!: boolean;
    @notify.State private notifyMessage!: string;
    @notify.State private notifyTimeout!: number;

    private closeNotifyBar () {
        this.$store.dispatch('notify/hideNotifyBar')
    }
}
</script>

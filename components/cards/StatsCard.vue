<template>
    <div class="stats-card">
        <v-card
            tile
            :color="color"
            :dark="dark"
            :to="to"
        >
            <v-icon
                :dark="dark"
                :color="iconColor"
                class="float-right pa-4"
                :size="60"
            >
                {{ icon }}
            </v-icon>
            <v-card-title
                class="display-2"
            >
                {{ value }}
                <span class="subtitle-1 font-weight-light mt-8 ml-2">
                    {{ smallValue }}
                </span>
            </v-card-title>
            <v-card-subtitle
                class="font-weight-bold subtitle-1 text-left pt-2"
            >
                {{ title }}
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class StatsCard extends Vue {
    @Prop(String) private icon!: string;
    @Prop(String) private to!: string;
    @Prop({ type: String, default: 'primary' }) private iconColor!: string;
    @Prop({ type: String, default: 'secondary' }) private color!: string;
    @Prop({ type: Boolean, default: false }) private dark!: boolean;
    @Prop({ type: String, default: undefined }) private title!: string;
    @Prop({ type: String, default: undefined }) private value!: string;
    @Prop({ type: String, default: undefined }) private smallValue!: string;
}
</script>

<style lang="scss">
</style>

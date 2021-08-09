<template>
    <div class="ace-data-table-search-field">
        <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            :clearable="true"
            :value="searchText"
            class="pr-5 pl-5 mt-4 mb-2"
            @keyup.enter="filterSubmit()"
            @click:append="filterSubmit()"
            @click:clear="clearSubmit()"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ACEDataTableSearchField extends Vue {
    private searchText: string = ''

    private filterSubmit () {
        this.$emit('query', this.searchText)
    }

    private clearSubmit () {
        this.$emit('query', '')
    }
}

</script>

<style lang="scss" scoped>
</style>

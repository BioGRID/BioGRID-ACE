<template>
    <div id="datasetentities">
        <ACEElasticDataTable
            class="pb-2"
            title="Curated Data"
            table-class="pa-1"
            :columns="tableHeaders"
            :rows-per-page="rowsPerPage"
            :display-rows="displayRows"
            :filtered-row-count="filteredRowCount"
            :total-row-count="totalRowCount"
            :has-expanded="hasExpanded"
            :has-row-checkbox="hasRowCheckbox"
            :pagination="true"
            :show-search="true"
            @query="fetchData"
        >
            <template slot="defaultRow" slot-scope="{ row }">
                <td class="text-center">
                    <input
                        type="checkbox"
                        :value="row._source.entity_id"
                        :checked="row.is_checked"
                    >
                    </checkbox>
                </td>
                <td v-for="(column, colIndex) in tableHeaders" :key="colIndex" :class="column.className">
                    {{ fetchColumnContent( column, row ) }}
                </td>
            </template>
            <template slot="expandedRow" slot-scope="{ row, rowIndex }">
                <td :colspan="expandedColspan">
                    <v-sheet
                        color="amber lighten-4"
                        class="pa-2 ml-2 mr-2"
                    >
                        EXPANDED CONTENT {{ row }} {{ rowIndex }}
                    </v-sheet>
                </td>
            </template>
        </ACEElasticDataTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import ACEElasticDataTable from '@/components/data/ACEElasticDataTable.vue'
import { TableColumn, TableSort, SearchTagLookup } from '@/utilities/types'
import bodybuilder from 'bodybuilder'
import { elasticExtract } from '@/utilities/elasticextractor'
import { buildSearchQuery, buildSortQuery } from '@/utilities/elasticsearchbuilder'

const curation = namespace('curation')

@Component({
    components: {
        ACEElasticDataTable
    }
})
export default class DatasetEntities extends Vue {
    @curation.State private attributeTypes!: any;
    @curation.State private entityFamilies!: any;
    @Prop() private dataset!: any;
    private displayRows: object[] = [];
    private darkMode: boolean = false;
    private totalRowCount: number = 0;
    private hasExpanded: boolean = true;
    private hasRowCheckbox: boolean = true;
    private filteredRowCount: number = 0;
    private rowsPerPage: number = 25;
    private searchTagLookup: SearchTagLookup = {
        '#B': 'participant_summary.BAIT.names',
        '#P': 'participant_summary.PREY.names',
        '#BO': 'participant_summary.BAIT.organism_abbreviations',
        '#PO': 'participant_summary.PREY.organism_abbreviations',
        '#U': 'history.user_name',
        '#D': 'history.addeddate'
    };

    private created () {
        this.getTotalCount()
    }

    get expandedColspan () {
        let addonCols = 0
        if (this.hasExpanded) { addonCols++ }
        if (this.hasRowCheckbox) { addonCols++ }

        return this.tableHeaders.length + addonCols
    }

    get tableHeaders () {
        if (this.entityFamilies[1] !== undefined) {
            return this.entityFamilies[1].columns
        }

        return []
    }

    private async getTotalCount () {
        const query = this.getBaseQuery()
        const count = await this.$elasticapi.ELASTIC_COUNT(this.$store.getters['users/getToken'], query.build(), 'entity')
        this.totalRowCount = count
    }

    private getBaseQuery () {
        return bodybuilder()
            .filter('term', 'dataset_id', this.dataset.dataset_id)
            .filter('term', 'entity_type.family', 'Binary Interaction')
            .filter('term', 'history.method', 'ACTIVATED')
    }

    private async fetchData (paginationPage: number, tableSortDetails: TableSort[], sortOrderTracker: number[], searchText: string) {
        let query = this.getBaseQuery()

        const sortQuery = buildSortQuery(tableSortDetails, sortOrderTracker, this.tableHeaders)

        query = buildSearchQuery(searchText, query, this.searchTagLookup, this.attributeTypes)
        query = query.size(this.rowsPerPage)
            .from(((paginationPage - 1) * this.rowsPerPage))

        const formattedQuery: any = query.build()
        formattedQuery.sort = sortQuery

        const data = await this.$elasticapi.ELASTIC_QUERY(this.$store.getters['users/getToken'], formattedQuery, 'entity')
        if (data !== undefined && data.hits.total.value > 0) {
            this.displayRows = []
            let hit: any
            for (hit of data.hits.hits) {
                hit.is_expanded = false
                hit.is_checked = false
                this.displayRows.push(hit)
            }
            this.filteredRowCount = data.hits.total.value
        } else {
            this.displayRows = []
            this.filteredRowCount = 0
        }
    }

    private fetchColumnContent (column: TableColumn, row: any) {
        if (column.formatFunc === undefined) {
            return this.fetchObjectValueFromString(row._source, column.field)
        } else {
            return elasticExtract(column.formatFunc, row._source, column.formatFuncParams)
        }
    }

    private fetchObjectValueFromString (obj: any, field: string) {
        // Converts a string like participants.organism.organism_abbreviation
        // into actual refrences within the obj
        return field.split('.').reduce((o, i) => o[i], obj)
    }
}

</script>

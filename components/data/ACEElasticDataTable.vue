<template>
    <div class="ace-elastic-data-table">
        <v-row no-gutters>
            <v-col xl="8" lg="8" md="6" sm="12" xs="12">
                <v-card-title class="pb-0 mb-3 mt-2 headline">
                    <strong>{{ title }}</strong>
                </v-card-title>
                <v-card-subtitle>
                    Showing <strong>{{ startRange }}</strong> to <strong>{{ endRange }}</strong> of <strong>{{ filteredRowCount }}</strong> entries <span v-if="filteredRowCount !== totalRowCount">(filtered from <strong>{{ totalRowCount }}</strong> total entries)</span>
                </v-card-subtitle>
            </v-col>
            <v-col xl="4" lg="4" md="6" sm="12" xs="12">
                <v-text-field
                    v-if="showSearch"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    :clearable="true"
                    :value="searchText"
                    class="pr-5 pl-5 mt-4 mb-2"
                    @change="searchText=$event"
                    @keyup.enter="filterSubmit()"
                    @click:append="filterSubmit()"
                />
            </v-col>
        </v-row>
        <table :class="tableClass">
            <thead>
                <tr>
                    <th
                        v-if="hasRowCheckbox"
                    />
                    <th
                        v-for="(column,index) in columns"
                        :key="index"
                        :class="columnClass(column)"
                        :width="columnWidth(column)"
                        @click="column.sortable ? sortBy(index) : null"
                    >
                        <div class="tableSearchTagWrap">
                            <span
                                v-if="column.searchTag !== undefined"
                                class="tableSearchTag"
                                @click.stop="appendSearchTag( column.searchTag )"
                            >
                                [{{ column.searchTag }}]
                            </span>
                        </div>

                        <div>
                            {{ column.title }}
                            <v-icon
                                v-if="tableSortDetails[index].sortDirection === 'asc'"
                                dark
                                small
                            >
                                mdi-arrow-up
                            </v-icon>
                            <v-icon
                                v-if="tableSortDetails[index].sortDirection === 'desc'"
                                dark
                                small
                            >
                                mdi-arrow-down
                            </v-icon>
                            <v-icon
                                v-if="tableSortDetails[index].sortOrder && tableSortDetails[index].sortDirection"
                                dark
                                small
                            >
                                mdi-numeric-{{ tableSortDetails[index].sortOrder }}-box
                            </v-icon>
                        </div>
                    </th>
                    <th
                        v-if="hasExpanded"
                    />
                </tr>
            </thead>
            <tbody>
                <template v-for="(row, rowIndex) in displayRows">
                    <tr :key="rowIndex + '-expand'" :class="rowClass(rowIndex)">
                        <slot name="defaultRow" :row="row" :rowIndex="rowIndex" />
                        <td
                            v-if="hasExpanded"
                            class="text-center expandedColumn"
                        >
                            <v-btn
                                medium
                                class="datatable-expand-row"
                                :icon="true"
                                title="Click to expand row for additional details"
                                @click="toggleExpandRow(rowIndex)"
                            >
                                <v-icon v-if="row.is_expanded">
                                    mdi-chevron-up
                                </v-icon>
                                <v-icon v-if="!row.is_expanded">
                                    mdi-chevron-down
                                </v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    <tr
                        v-if="hasExpanded"
                        v-show="row.is_expanded"
                        :key="rowIndex"
                    >
                        <slot name="expandedRow" :row="row" :rowIndex="rowIndex" />
                    </tr>
                </template>
                <template v-if="displayRows.length <= 0">
                    <tr>
                        <td :colspan="expandedColspan">
                            <div class="text-center">
                                Your filter matched zero entries. Please try again or remove the filter to view more data...
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <v-pagination
            v-if="showPagination"
            v-model="paginationPage"
            :length="paginationSize"
            :page="paginationPage"
            dark
            total-visible="8"
            class="mt-5"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { TableColumn, TableSort, NumericHash } from '@/utilities/types'
import { tokenizeSearchString } from '@/utilities/helpers'

@Component
export default class ACEElasticDataTable extends Vue {
    @Prop(String) private title!: string
    @Prop(Boolean) private showSearch!: boolean
    @Prop(Array) private columns!: TableColumn[]
    @Prop(Array) private displayRows!: any[]
    @Prop(Number) private rowsPerPage!: number
    @Prop(Number) private totalRowCount!: number
    @Prop(Number) private filteredRowCount!: number
    @Prop(Boolean) private pagination!: boolean
    @Prop(String) private tableClass!: string
    @Prop(Boolean) private hasExpanded!: boolean
    @Prop(Boolean) private hasRowCheckbox!: boolean
    private tableSortDetails: TableSort[] = []
    private searchText: string = ''
    private sortOrderTracker: number[] = []
    private paginationPage: number = 1
    private paginationSize: number = 1
    private startRange: number = 1
    private endRange: number = this.rowsPerPage
    private loading: boolean = true
    private rowsExpanded: boolean[] = []
    private showPagination: boolean = this.pagination

    private created () {
        this.initializeSortDetails()
        this.generateDisplayRows()
    }

    private initializeSortDetails () {
        const sortData: NumericHash = {}
        this.columns.forEach((column, columnIndex) => {
            this.tableSortDetails.push({
                sortDirection: column.sortDirection,
                sortOrder: column.sortOrder
            })

            if (column.sortOrder >= 0 && column.sortDirection !== '') {
                sortData[column.sortOrder] = columnIndex
            }
        })

        const defaultSortTracker: number[] = []
        Object.keys(sortData).sort().forEach((key) => {
            defaultSortTracker.push(sortData[key])
        })

        this.sortOrderTracker = defaultSortTracker
    }

    @Watch('rowsPerPage')
    private onRowsPerPageChanged () {
        this.updatePagination()
    }

    @Watch('paginationPage')
    private onPaginationPageChanged () {
        this.generateDisplayRows()
        this.updateRange()
    }

    @Watch('filteredRowCount')
    private onFilteredRowCountChanged () {
        this.updateRange()
        this.updatePagination()
    }

    @Watch('totalRowCount')
    private onTotalRowCountChanged () {
        // this.updatePagination()
    }

    @Watch('searchText')
    private onSearchTextChanged () {
        if (this.searchText === null || this.searchText === '') {
            this.generateDisplayRows()
        }
    }

    get expandedColspan () {
        let addonCols = 0
        if (this.hasExpanded) { addonCols++ }
        if (this.hasRowCheckbox) { addonCols++ }

        return this.columns.length + addonCols
    }

    private filterSubmit () {
        this.refreshResults()
    }

    private refreshResults () {
        // We do not need to generate display rows
        // if the pagination page needs to be reset to 1
        // since changing that, will also call generateDisplayRows
        if (this.paginationPage !== 1) {
            this.paginationPage = 1
        } else {
            this.generateDisplayRows()
        }
    }

    private tokenizeSearchTerms () {
        // If Undefined/Null, then no tokens
        if (this.searchText === null || this.searchText === undefined) {
            return []
        }

        // If nothing but empty space, also no tokens
        const parseText = this.searchText.trim()
        if (parseText === '') {
            return []
        }

        const searchTerms: string[] = tokenizeSearchString(this.searchText)
        const finalTerms: string[] = []
        for (const term of searchTerms) {
            if (term.trim().length !== 0) {
                finalTerms.push(term)
            }
        }

        return finalTerms
    }

    private updatePagination () {
        const rowsToShow = this.rowsPerPage
        let numPages = Math.floor(this.filteredRowCount / rowsToShow)
        if ((this.filteredRowCount % this.rowsPerPage) > 0) {
            numPages += 1
        }
        this.paginationSize = numPages
        if (numPages <= 1) {
            this.showPagination = false
        } else {
            this.showPagination = true
        }
    }

    private updateRange () {
        this.startRange = ((this.paginationPage - 1) * this.rowsPerPage) + 1
        const endRange = this.paginationPage * this.rowsPerPage
        if (endRange > this.filteredRowCount) {
            this.endRange = this.filteredRowCount
        } else {
            this.endRange = endRange
        }
    }

    private generateDisplayRows () {
        this.$store.dispatch('toggleLoadingOverlay', {})
        this.$emit('query', this.paginationPage, this.tableSortDetails, this.sortOrderTracker, this.searchText)
        this.$store.dispatch('toggleLoadingOverlay', {})
    }

    private sortBy (index: number) {
        if (index in this.tableSortDetails) {
            if (this.tableSortDetails[index].sortDirection === 'asc') {
                this.tableSortDetails[index].sortDirection = 'desc'
            } else if (this.tableSortDetails[index].sortDirection === '') {
                this.tableSortDetails[index].sortDirection = 'asc'
                this.sortOrderTracker.push(index)
                this.tableSortDetails[index].sortOrder = this.sortOrderTracker.indexOf(index) + 1
            } else {
                this.tableSortDetails[index].sortDirection = ''
                this.tableSortDetails[index].sortOrder = 0
                // Remove this one from the tracker
                this.sortOrderTracker = this.sortOrderTracker.filter(colID => colID !== index)
                // Update all remaining entries in the tracker, in case order has
                // changed from what it was previously
                this.sortOrderTracker.forEach((trackerIndex) => {
                    this.tableSortDetails[trackerIndex].sortOrder = this.sortOrderTracker.indexOf(trackerIndex) + 1
                })
            }

            this.refreshResults()
        }
    }

    private columnClass (column: TableColumn) {
        const classes = []
        if (column.className !== undefined && column.className !== '') {
            classes.push(column.className)
        }
        if (column.sortable) {
            classes.push('columnSortable')
        }
        return classes.join(' ')
    }

    private columnWidth (column: TableColumn) {
        if (column.width !== undefined && column.width !== '') {
            return column.width
        }
    }

    private compareByString (value: any, search: string) {
        return value != null &&
        search != null &&
        typeof value !== 'boolean' &&
        value.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase()) !== -1
    }

    private appendSearchTag (searchTag: string) {
        if (this.searchText === undefined || this.searchText === null || this.searchText === '') {
            this.searchText = searchTag + ':'
        } else {
            this.searchText = this.searchText + ' ' + searchTag + ':'
        }
    }

    private rowClass (index: number) {
        if ((index % 2) === 0) {
            return 'even-row'
        }

        return 'odd-row'
    }

    private toggleExpandRow (rowID: number) {
        if (this.displayRows[rowID].is_expanded === true) {
            this.displayRows[rowID].is_expanded = false
        } else {
            this.displayRows[rowID].is_expanded = true
        }
    }
}

</script>

<style lang="scss" scoped>
    table {
        width: 100%;
        border-spacing: 1px;
        &.smallFont {
            font-size: 12px;
        }
        tr {
            border: 0;
            th {
                font-size: 12px;
                background-color: var(--v-info-base);
                color: #FFF;
                border: 0;
                margin: 0;
                padding: 5px;

                &.columnSortable {
                    cursor: pointer;
                }

                .tableSearchTagWrap {
                    height: 20px;
                    display: block;
                    .tableSearchTag {
                        cursor: pointer;
                        color: var( --v-tertiary-base );
                        &:hover {
                            color: var( --v-secondary-base );
                        }
                    }
                }
            }

            td {
                &.expandedColumn {
                    width: 4%;
                }
            }
        }

        tbody tr.even-row {
            background-color: rgba(70, 68, 68, 0.05);
        }

    }
</style>

<template>
    <div class="ontology-tools">
        <v-container fluid class="pt-0">
            <h3>Ontology Search</h3>
            <v-divider class="mb-3" />
            <v-row>
                <v-col
                    cols="12"
                    xl="6"
                    lg="6"
                    md="6"
                    sm="12"
                    xs="12"
                >
                    <v-text-field
                        v-model.trim="ontologySearchString"
                        solo
                        flat
                        outlined
                        style="border-radius: 0"
                    >
                        <template #append>
                            <v-btn
                                depressed
                                tile
                                color="primary"
                                class="ma-0"
                                @click="findSearchItems"
                            >
                                <v-icon>mdi-magnify</v-icon>
                                Search
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    xl="6"
                    lg="6"
                    md="6"
                    sm="12"
                    xs="12"
                >
                    <v-select
                        v-model.trim="ontologyOption"
                        label="In Ontology"
                        :items="ontologyOptions"
                        :menu-props="{ offsetY: true }"
                        attach
                        @change="changeOntology"
                    />
                </v-col>
            </v-row>
            <v-row class="mt-n7">
                <v-col
                    cols="12"
                    xl="8"
                    lg="8"
                    md="8"
                    sm="12"
                    xs="12"
                >
                    <v-tabs
                        v-model="activeTab"
                        color="cyan"
                        dark
                        slider-color="yellow"
                    >
                        <v-tab key="1" ripple>
                            Popular
                        </v-tab>
                        <v-tab key="2" ripple>
                            Search
                        </v-tab>
                        <v-tab key="3" ripple>
                            Tree
                        </v-tab>
                        <v-tab-item key="1" class="tab-container">
                            <v-card flat>
                            <v-card-text>Contents for Item 1 go here</v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item key="2" class="tab-container">
                            <v-card flat>
                            <v-card-text>
                                <h3>{{ searchResultsCount }}</h3>
                                <v-list two-line>
                                    <template v-for="(searchResultsItem, index) in searchResultsItems">
                                        <v-subheader
                                            v-if="searchResultsItem.header"
                                            :key="searchResultsItem.header"
                                            v-text="searchResultsItem.header"
                                        />
                                        <v-divider
                                            v-else-if="searchResultsItem.divider"
                                            :key="index"
                                            :inset="searchResultsItem.inset"
                                        />
                                        <v-list-item
                                            v-else
                                            :key="searchResultsItem.title"
                                        >
                                            <v-list-item-content>
                                                <v-list-item-title v-html="searchResultsItem.title" />
                                                <v-list-item-subtitle v-html="searchResultsItem.subtitle" />
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-list>
                            </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item key="3" class="tab-container">
                            <v-card flat>
                                <v-card-text>
                                    <v-treeview
                                        v-model="ontologyBrowseTree"
                                        :load-children="fetchItems"
                                        :items="ontologyItems"
                                        hoverable
                                        selection-type="independent"
                                        dense
                                        selected-color="indigo"
                                        return-object
                                        expand-icon="mdi-chevron-down"
                                    >
                                        <template #prepend="{ item }">
                                            <v-icon v-if="!item.children" color="success">
                                                mdi-leaf
                                            </v-icon>
                                        </template>
                                        <template #label="{ item }">
                                            {{ item.name }}
                                            <v-icon
                                                dark
                                                color="black"
                                                @click="openTermDialog(item)"
                                            >
                                                mdi-information
                                            </v-icon>
                                        </template>
                                        <template #append="{ item }">
                                            <v-tooltip
                                                attach
                                                left
                                            >
                                                <template #activator="{ on }">
                                                    <v-btn
                                                        class="ma-1"
                                                        fab
                                                        dark
                                                        x-small
                                                        color="primary"
                                                        @click="addSelectedTerm(item)"
                                                        v-on="on"
                                                    >
                                                        <v-icon dark>
                                                            mdi-plus
                                                        </v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Add Term - {{ item.name }}</span>
                                            </v-tooltip>
                                            <v-tooltip
                                                attach
                                                left
                                            >
                                                <template #activator="{ on }">
                                                    <v-btn
                                                        class="ma-1"
                                                        fab
                                                        dark
                                                        x-small
                                                        color="primary"
                                                        @click="addSelectedQualifier(item)"
                                                        v-on="on"
                                                    >
                                                        <v-icon dark>
                                                            mdi-folder-plus
                                                        </v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Add Qualifier, {{ item.name }}, to checked term/s</span>
                                            </v-tooltip>
                                        </template>
                                    </v-treeview>
                                    <v-dialog
                                        v-model="ontologyTermDialog"
                                        scrollable
                                        max-width="900px"
                                    >
                                        <v-card
                                            v-model="selectedOntologyTermInfo"
                                            style="max-height: 1200px"
                                        >
                                            <v-card-title>
                                                {{ selectedOntologyTermInfo.name }}
                                            </v-card-title>
                                            <v-card-text>
                                                {{ selectedOntologyTermInfo.definition }}
                                            </v-card-text>
                                            <v-divider class="mx-4" />
                                            <v-card-title v-if="selectedOntologyTermInfo.parents && (selectedOntologyTermInfo.parents).length > 0">
                                                Condensed Tree View
                                            </v-card-title>
                                            <v-card-text
                                                v-if="selectedOntologyTermInfo.parents && (selectedOntologyTermInfo.parents).length > 0"
                                                style="max-height: 600px"
                                            >
                                                <v-col
                                                    v-if="loadingCondensedTreeProgress"
                                                    class="subtitle-1 text-center"
                                                    cols="12"
                                                >
                                                    Creating Condensed Tree
                                                </v-col>
                                                <v-progress-linear
                                                    v-if="loadingCondensedTreeProgress"
                                                    :indeterminate="true"
                                                />
                                                <v-treeview
                                                    v-if="!loadingCondensedTreeProgress"
                                                    v-model="ontologyCondensedTree"
                                                    :items="ontologyCondensedTreeTerms"
                                                    expand-icon="mdi-chevron-down"
                                                    dense
                                                    open-all
                                                    hoverable
                                                    return-object
                                                />
                                            </v-card-text>
                                            <v-card-title v-if="selectedOntologyTermInfo.parents && (selectedOntologyTermInfo.parents).length > 0">
                                                Parents [Relationship]
                                            </v-card-title>
                                            <v-card-text>
                                                <ul>
                                                    <li
                                                        v-for="(content,index) in selectedOntologyTermInfo.parents"
                                                        :key="index"
                                                    >
                                                        <strong>{{ content.relationships }}</strong>: {{ content.name }} ({{ content.ontology_term_id }})
                                                    </li>
                                                </ul>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn
                                                    color="primary"
                                                    text
                                                    @click="ontologyTermDialog = false"
                                                >
                                                Close
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-col>
                <v-col
                    cols="12"
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    xs="12"
                >
                    <v-container fluid class="selected-items-container">
                         <v-row>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <h3>Selected Terms</h3>
                            </v-col>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-menu
                                    attach
                                    nudge-bottom="40"
                                >
                                    <template #activator="{ on }">
                                        <v-btn class="float-right mt-n2" color="success" v-on="on">
                                            <v-icon>mdi-settings</v-icon>
                                            Tools
                                        </v-btn>
                                    </template>

                                    <v-list dense>
                                        <v-list-item
                                            v-for="(link, i) in selectedTermsMenuLinks"
                                            :key="i"
                                            :to="link.to"
                                        >
                                            <v-list-item-content>
                                                <v-list-item-title v-text="link.text" />
                                            </v-list-item-content>
                                            <v-list-item-icon>
                                                <v-icon v-text="link.icon" />
                                            </v-list-item-icon>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-divider class="mb-3" />
                        <v-row no-gutters>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="12"
                                sm="12"
                                xs="12"
                            >
                                <v-treeview
                                    v-model="selectedTermsTree"
                                    :items="selectedTerms"
                                    expand-icon="mdi-chevron-down"
                                    dense
                                    selectable
                                    selection-type="independent"
                                    hoverable
                                    return-object
                                >
                                    <template #append="{ selectedTerm }">
                                        <v-btn
                                            color="success"
                                            fab
                                            x-small
                                            @click="removeQualifier(selectedTerm)"
                                        >
                                            <v-icon dark>
                                                mdi-close
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                </v-treeview>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { buildSearchQueryFromSearchString, buildOntologyParentsQuery, buildOntologyItemQuery, buildOntologyRootQuery } from '@/utilities/elasticsearchbuilder'
import { OntologyRecord } from '@/utilities/types'
import { isStringInArrayOfObjects } from '@/utilities/helpers'

const annotation = namespace('annotation')

@Component
export default class OntologyTools extends Vue {
    @annotation.State private ontologies!: OntologyRecord[]
    private ontologyOption: number = 0
    private ontologyBrowseTree: any[] = []
    private ontologyCondensedTree: any[] = []
    private ontologyCondensedTreeTerms: any[] = []
    private loadingCondensedTreeProgress: boolean = false
    private ontologyItems: any[] = []
    private ontologyID: number = 0
    private ontologyTermDialog: boolean = false
    private selectedOntologyTermInfo: any = {}
    private tabs: any = null
    private activeTab: number = 0
    private ontologySearchString: string = ''
    private searchResultsCount: string = 'Search for terms above to populate this list...'
    private searchResultsItems: any[] = []
    private selectedTermsTree: any[] = []
    private selectedTerms: any[] = []
    private selectedTermsMenuLinks: object[] = []

    get ontologyOptions () {
        const ontologyOptions: object[] = []
        for (const ontology of Object.values(this.ontologies)) {
            if (ontology.deprecated === 0) {
                ontologyOptions.push({
                    text: ontology.name,
                    value: ontology.ontology_id
                })
           }
        }
        return ontologyOptions.sort(this.alphaOptionsSort)
    }

    private async openTermDialog (item: any) {
        // If the ontology item selected is our custom name given to start each onotology tree print out a different set of information
        this.ontologyTermDialog = true
        this.loadingCondensedTreeProgress = true
        if (item.id.startsWith('BIOGRID_ROOT_NAME_')) {
            this.selectedOntologyTermInfo.name = item.name
            this.selectedOntologyTermInfo.definition = 'asdfasdfa'
        } else {
            this.selectedOntologyTermInfo.name = item.name + ' ( ' + item.id + ')'
            this.selectedOntologyTermInfo.definition = item.definition
        }
        this.selectedOntologyTermInfo.parents = item.parents
        // clear out the Condensed Tree Arrays
        this.ontologyCondensedTreeTerms = []
        this.ontologyCondensedTreeTerms = await this.getCondensedTreeItems(item.id)
        this.loadingCondensedTreeProgress = false
    }

    private addSelectedTerm (item: any) {
        // make sure term is not already in the selectedTerms object
        if (isStringInArrayOfObjects(item.id, this.selectedTerms, 'id', [])) {
            this.selectedTerms.push({ id: item.id, name: item.name, children: [] })
        }
    }

    private addSelectedQualifier (item: any) {
        for (const selectedTerm of Object.values(this.selectedTermsTree)) {
            selectedTerm.children.push({ id: item.id, name: item.name, children: [] })
        }
    }

    private searchOntology () {
        this.activeTab = 1
    }

    private changeOntology () {
        // empty out the tree and items for the next ontology
        this.ontologyBrowseTree = []
        this.ontologyItems = []

        this.ontologyID = this.ontologyOption
        const children: any = []

        this.ontologyItems = [{
            id: 'BIOGRID_ROOT_NAME_' + this.ontologyID,
            name: this.ontologies[this.ontologyOption].name,
            children
        }]

        this.fetchItems(this.ontologyItems[0], true)
    }

    private async getCondensedTreeItems (itemID: any) {
        const tree: any = []

        // grab the ontology record from the elastic database for a given ontology id
        const ontologyItemRecord = await this.fetchIndividualItem(itemID)

        if (ontologyItemRecord && ontologyItemRecord.length > 0) {
            const ontologyItem = ontologyItemRecord[0]
            // base case when we find the root term with no parents
            if (ontologyItem._source.parents.length === 0) {
                tree.push({ id: ontologyItem._source.ontology_term_id, name: ontologyItem._source.name, children: [] })
            } else {
                // go through all the parents and find any "is_a" or "part_of" relationships
                const children: any = []
                let parent: any = []
                for (parent of Object.values(ontologyItem._source.parents)) {
                    if ((parent.relationships.includes('is_a') >= 0) || (parent.relationships.includes('part_of') >= 0)) {
                        children.push({ id: parent.ontology_term_id, name: parent.name, children: await this.getCondensedTreeItems(parent.ontology_term_id) })
                    }
                }

                tree.push({ id: ontologyItem._source.ontology_term_id, name: ontologyItem._source.name, children })
            }
        }

        return tree
    }

    private async fetchIndividualItem (itemID: any) {
        let query = null

        query = buildOntologyItemQuery(itemID, this.ontologyID)

        const count = await this.$elasticapi.ELASTIC_COUNT('1', query.build(), 'ontology')
        if (count !== 0) {
            query = query.size(count)
            const data = await this.$elasticapi.ELASTIC_QUERY('1', query.build(), 'ontology')

            if (data !== undefined && data.hits.total.value > 0) {
                return data.hits.hits
            } else {
                return []
            }
        }
    }

    private async fetchItems (item: any, getRootTerm: boolean) {
        let query = null

        if (getRootTerm) {
            query = buildOntologyRootQuery(this.ontologyID)
        } else {
            query = buildOntologyParentsQuery(item.id, this.ontologyID)
        }

        const count = await this.$elasticapi.ELASTIC_COUNT('1', query.build(), 'ontology')
        if (count !== 0) {
            query = query.size(count)
            const data = await this.$elasticapi.ELASTIC_QUERY('1', query.build(), 'ontology')

            if (data !== undefined && data.hits.total.value > 0) {
                let hit: any
                for (hit of data.hits.hits) {
                    let foundChild: boolean = false
                    if (getRootTerm) {
                        foundChild = true
                    } else {
                        // go through parents and make sure the itemID is of relationships type "is_a" or "part_of"
                        let value: any = []
                        for (value of Object.values(hit._source.parents)) {
                            if (value.ontology_term_id === item.id) {
                                if (value.relationships.includes('is_a') >= 0 || value.relationships.includes('part_of') >= 0) {
                                    foundChild = true
                                }
                            }
                        }
                    }

                    if (foundChild) {
                        if (hit._source.child_count === 0) {
                            item.children.push({ id: hit._id, name: hit._source.name, definition: hit._source.definition, parents: hit._source.parents })
                        } else {
                            item.children.push({ id: hit._id, name: hit._source.name, definition: hit._source.definition, parents: hit._source.parents, children: [] })
                        }
                    }
                }

                // sort the children alphabetically
                item.children.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1)
            }
        }
    }

    private async findSearchItems () {
        this.searchResultsCount = 'Performing query ....'

        this.searchResultsItems = []
        this.activeTab = 1

        let query = buildSearchQueryFromSearchString(this.ontologySearchString, this.ontologyID)

        const count = await this.$elasticapi.ELASTIC_COUNT('1', query.build(), 'ontology')
        if (count > 200) {
            this.searchResultsCount = 'Your search query resulted in ' + count + ' results. Please consider refining your search to narrow down the number of hits. For exact searches put double quotes around the search term "Query String".'
        } else if (count !== 0) {
            query = query.size(count)
            const data = await this.$elasticapi.ELASTIC_QUERY('1', query.build(), 'ontology')
            if (data !== undefined && data.hits.total.value > 0) {
                let hit: any
                for (hit of data.hits.hits) {
                    this.searchResultsItems.push({ title: hit._id, subtitle: hit._source.name })
                }
                this.searchResultsCount = count + ' Matching Searched Terms Displayed'
            }
        } else {
            this.searchResultsCount = 'Your search query returned no results. Are you sure you selected the correct ontology to search via the dropdown list?'
        }
    }

    private alphaOptionsSort (a: any, b: any) {
        if (a.text > b.text) {
            return 1
        } else if (a.text < b.text) {
            return -1
        }
        return 0
    }
}
</script>

<style lang="scss">
.v-input__append-outer {
    margin: 0 !important;
}
.ontology-tools {
    padding: 15px 0px 0px 10px;
    border-style: solid;
    border-width: 1px;
    border-color: grey;
    background-color: lightgrey;
}
.selected-items-container {
    padding: 15px 0px 0px 10px;
    border-style: solid;
    border-width: 1px;
    border-color: grey;
    background-color: white;
}
.tab-container {
    max-height: 700px;
    overflow-y: auto;
    overflow-x: auto;
}
.custom-tool-tip {
    background-color: white;
    border-style: solid;
    color: black;
}
.v-tooltip__content {
  pointer-events: initial;
}
</style>

<template>
    <div class="dataset-details-card">
        <v-card
            tile
            class="pa-3 mt-3"
            :color="color"
            :dark="dark"
        >
            <v-icon
                color="orange darken-2"
                title="Click to show/hide dataset details"
                class="float-right"
                @click="toggleDatasetCollapsed()"
            >
                mdi-arrow-split-horizontal
            </v-icon>

            <div class="overline">
                BioGRID Dataset ({{ datasetID }})
            </div>
            <div class="headline font-weight-bold">
                {{ title }}
            </div>
            <p class="body-2 mb-0 font-weight-regular">
                {{ journal }} {{ pubDate }} {{ pageDetails }} <span v-html="doi"></span> <span v-html="pmid"></span>
            </p>
            <p
                v-if="showAuthors && !datasetCollapsed"
                class="pt-3 subtitle-1 font-weight-medium"
            >
                {{ datasetAuthors() }}
            </p>
            <p
                 v-if="!datasetCollapsed"
                class="body-1"
            >
                <span v-html="abstract"></span>
            </p>

            <p
                v-if="showKeywords && !datasetCollapsed"
                class="subtitle-2 font-weight-medium mb-0"
            >
                <strong>Keywords: </strong> {{ keywords() }}
            </p>

            <p
                 v-if="showMeshTerms && !datasetCollapsed"
                class="subtitle-2 font-weight-medium mb-0"
            >
                <strong>Mesh Terms: </strong> {{ meshTerms() }}
            </p>
            <v-alert
                v-if="datasetState !== 'active'"
                type="error"
                dense
                class="mt-5 mr-n5 ml-n5 mb-n5"
            >
                Dataset State: {{ datasetState }}
            </v-alert>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class DatasetDetails extends Vue {
    @Prop() private dataset!: any
    @Prop({ type: String, default: '' }) private color!: string
    @Prop({ type: Boolean, default: false }) private dark!: boolean
    @Prop({ type: Boolean, default: false }) private collapsed!: boolean
    private showAuthors: boolean = true
    private showKeywords: boolean = true
    private showMeshTerms: boolean = true
    private datasetCollapsed: boolean = false

    private created () {
        this.datasetCollapsed = this.collapsed
    }

    private datasetAuthors () {
        if (this.dataset) {
            if (this.dataset.authors.length > 0) {
                return this.dataset.authors.join(', ')
            } else if (this.dataset.collectives.length > 0) {
                return this.dataset.collectives.join(', ')
            }
        } else {
            return ''
        }
        this.showAuthors = false
    }

    private keywords () {
        if (this.dataset && this.dataset.keywords.length > 0) {
            return this.dataset.keywords.join(', ')
        }
        this.showKeywords = false
    }

    private meshTerms () {
        if (this.dataset && this.dataset.mesh_terms.length > 0) {
            return this.dataset.mesh_terms.join(', ')
        }
        this.showMeshTerms = false
    }

    get datasetState () {
        if (this.dataset && this.dataset.state) {
            return this.dataset.state
        }
        return ''
    }

    get datasetID () {
        if (this.dataset && this.dataset.dataset_id) {
            return this.dataset.dataset_id
        }
        return ''
    }

    get title () {
        if (this.dataset && this.dataset.title) {
            return this.dataset.title
        }
        return ''
    }

    get abstract () {
        if (this.dataset && this.dataset.abstract) {
            return this.dataset.abstract
        }
        return ''
    }

    get journal () {
        if (this.dataset && this.dataset.journal_abbreviation !== '') {
            return this.dataset.journal_abbreviation + ' | '
        }
        return ''
    }

    get pubDate () {
        if (this.dataset && this.dataset.pub_date !== '') {
            return this.dataset.pub_date + ' | '
        }
        return ''
    }

    get pageDetails () {
        let pageDetails = ''
        if (this.dataset) {
            if (this.dataset.volume !== '') {
                if (this.dataset.issue !== '') {
                    if (this.dataset.pagination !== '') {
                        pageDetails = 'vol:' + this.dataset.volume + ', iss:' + this.dataset.issue + ', pg:' + this.dataset.pagination
                    } else {
                        pageDetails = 'vol:' + this.dataset.volume + ', iss:' + this.dataset.issue
                    }
                } else {
                    pageDetails = 'vol:' + this.dataset.volume
                }
            } else if (this.dataset.issue !== '') {
                if (this.dataset.pagination !== '') {
                    pageDetails = 'iss:' + this.dataset.issue + ', pg:' + this.dataset.pagination
                } else {
                    pageDetails = 'iss:' + this.dataset.issue
                }
            } else if (this.dataset.pagination !== '') {
                pageDetails = 'pg:' + this.dataset.pagination
            }
            return pageDetails + ' | '
        } else {
            return ''
        }
    }

    get doi () {
        if (this.dataset && this.dataset.doi !== '') {
            return 'doi: <a class="plainLink" href="https://doi.org/' + this.dataset.doi + '" target="_BLANK">' + this.dataset.doi + '</a> | '
        }
        return ''
    }

    get pmid () {
        if (this.dataset && this.dataset.source_type === 'pubmed') {
            return 'pmid: <a class="plainLink" href="https://www.ncbi.nlm.nih.gov/pubmed/?term=' + this.dataset.source_id + '" target="_BLANK">' + this.dataset.source_id + '</a>'
        }
        return ''
    }

    private toggleDatasetCollapsed () {
        this.datasetCollapsed = !this.datasetCollapsed
    }
}
</script>

<style lang="scss">
</style>


import { SearchTagLookup, TableSort, TableColumn, AttributeTypeHash } from '@/utilities/types'
import bodybuilder from 'bodybuilder'

export function buildSearchQuery (searchText: string, queryStructure: any, searchTagLookup: SearchTagLookup, attributeLookup: AttributeTypeHash) {
    if (searchText === null || searchText === undefined || searchText.length <= 0) {
        return queryStructure
    }

    // Extract all the tags via a regular expression
    const tagRegex = /([#|@])([A-Z0-9]+):/gm
    const matchedTags = [...searchText.matchAll(tagRegex)]

    // Check if tag is in either the search tag lookup
    // or the attribute type hash based on prefix
    for (const tag of matchedTags) {
        if (tag[0].startsWith('#')) {
            if (searchTagLookup['#' + tag[2]] !== undefined) {
                // if found, replace it with the correct field mapping
                // depending on what it was
                searchText = searchText.replace(tag[0], searchTagLookup['#' + tag[2]] + ':')
            } else {
                // if not found, remove it from the search string
                searchText = searchText.replace(tag[0], '')
            }
        } else if (tag[0].startsWith('@')) {
            if (attributeLookup[tag[2]] !== undefined) {
                // if found, replace it with the correct field mapping
                // depending on what it was
                const attributeInfo = attributeLookup[tag[2]]
                if (attributeInfo.attribute_type_category_id === 1) {
                    searchText = searchText.replace(tag[0], 'keyword_attributes.' + attributeInfo.shortcode + '.text:')
                } else if (attributeInfo.attribute_type_category_id === 2) {
                    searchText = searchText.replace(tag[0], 'score_attributes.' + attributeInfo.shortcode + ':')
                } else if (attributeInfo.attribute_type_category_id === 3) {
                    searchText = searchText.replace(tag[0], 'text_attributes.' + attributeInfo.shortcode + ':')
                }
            } else {
                // if not found, remove it from the search string
                searchText = searchText.replace(tag[0], '')
            }
        }
    }

    // create a query using the newly build search string
    queryStructure = queryStructure.query('query_string', {
        query: searchText,
        default_field: 'all_text'
    })

    return queryStructure
}

export function buildSortQuery (tableSortDetails: TableSort[], sortOrderTracker: number[], tableHeaders: TableColumn[]) {
    const sortOptions = []
    for (const colID of sortOrderTracker) {
        const sortOption: any = {}
        const col = tableHeaders[colID]
        sortOption[col.field] = {
            order: tableSortDetails[colID].sortDirection
        }

        if (col.sortNested !== undefined) {
            sortOption[col.field].nested = col.sortNested
        }

        sortOptions.push(sortOption)
    }
    return sortOptions
}

// Build elastic query to return all ontolgy terms found for the users search query against the selected ontology
export function buildSearchQueryFromSearchString (searchTerm: string, ontologyID: number) {
    return bodybuilder()
        .filter('term', 'ontology.ontology_id', ontologyID)
        .query('query_string', {
            query: searchTerm,
            fields: ['ontology_term_id', 'name']
        })
}

// Build elastic query to find all ontology terms where it is found in the parents_terms list. Used to build out the ontology treeview
export function buildOntologyParentsQuery (itemID: string, ontologyID: number) {
    return bodybuilder()
        .filter('term', 'ontology.ontology_id', ontologyID)
        .filter('term', 'parent_terms', itemID)
        .filter('term', 'deprecated', false)
}

// Build elastic query to find a given ontology item within the ontology selected
export function buildOntologyItemQuery (itemID: string, ontologyID: number) {
    return bodybuilder()
        .filter('term', 'ontology.ontology_id', ontologyID)
        .filter('term', 'ontology_term_id', itemID)
        .filter('term', 'deprecated', false)
}

// Build elastic query to find the root of a given ontology
export function buildOntologyRootQuery (ontologyID: number) {
    return bodybuilder()
        .filter('term', 'ontology.ontology_id', ontologyID)
        .filter('term', 'is_root', true)
        .filter('term', 'deprecated', false)
}

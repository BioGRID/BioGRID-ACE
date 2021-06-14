const mutations = {
    CURATION_UPDATE_CURATION_GROUPS: (state, curationGroups) => {
        state.curationGroups = curationGroups
    },
    CURATION_ADD_DATASET: (state, dataset) => {
        state.openDatasets.set(dataset.dataset_id, dataset)
    },
    CURATION_REMOVE_DATASET: (state, datasetID) => {
        state.openDatasets.delete(datasetID)
    },
    CURATION_TRUNCATE_DATASETS: (state) => {
        state.openDatasets.clear()
    },
    CURATION_TOGGLE_DATASET_COLLAPSED: (state) => {
        state.datasetCollapsed = !state.datasetCollapsed
    },
    CURATION_ADD_HISTORY: (state, payload) => {
        state.openHistory.set(payload.refID, payload.history)
    },
    CURATION_REMOVE_HISTORY: (state, refID) => {
        state.openHistory.delete(refID)
    },
    CURATION_TRUNCATE_HISTORY: (state) => {
        state.openHistory.clear()
    },
    CURATION_UPDATE_ATTRIBUTE_TYPES: (state, attributeTypes) => {
        state.attributeTypes = attributeTypes
    },
    CURATION_UPDATE_PROCESSING_TASKS: (state, processingTasks) => {
        state.processingTasks = processingTasks
    },
    CURATION_ADD_DRAWER_LINK: (state, payload) => {
        state.curationDrawerLinkMap.set(payload.refID, payload.link)
    },
    CURATION_REMOVE_DRAWER_LINK: (state, refID) => {
        state.curationDrawerLinkMap.delete(refID)
    },
    CURATION_TRUNCATE_DRAWER_LINKS: (state) => {
        state.curationDrawerLinkMap.clear()
    },
    CURATION_UPDATE_CURRENT_DRAWER_LINKS: (state, links) => {
        state.currentCurationDrawerLinks = links
    },
    CURATION_UPDATE_ENTITY_FAMILIES: (state, entityFamilies) => {
        state.entityFamilies = entityFamilies
    },
    CURATION_UPDATE_ENTITY_WORKFLOWS: (state, entityWorkflows) => {
        state.entityWorkflows = entityWorkflows
    }
}

export default mutations

const getters = {
    getCurationGroup: state => (curationGroupID) => {
        return state.curationGroups[curationGroupID]
    },
    getDatasetCurationOption: state => (optionValue) => {
        return state.getDatasetCurationOptions[optionValue]
    },
    getOpenDataset: state => (datasetID) => {
        return state.openDatasets.get(datasetID)
    },
    getOpenHistory: state => (datasetID) => {
        return state.openHistory.get(datasetID)
    }
}

export default getters

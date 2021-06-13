const mutations = {
    ANNOTATION_UPDATE_ORGANISMS: (state, organisms) => {
        state.organisms = organisms
    },
    ANNOTATION_UPDATE_ONTOLOGIES: (state, ontologies) => {
        state.ontologies = ontologies
    }
}

export default mutations

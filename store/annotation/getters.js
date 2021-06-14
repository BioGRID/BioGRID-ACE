const getters = {
    getOrganism: state => (organismID) => {
        return state.organisms[organismID]
    },
    getOntology: state => (ontologyID) => {
        return state.ontologies[ontologyID]
    }
}

export default getters

const getters = {
    getOrganism: state => (organismID) => {
        return state.organisms[organismID]
    }
}

export default getters

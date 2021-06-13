const actions = {
    async fetch_organisms (context) {
        const data = await this.$annotationapi.ORGANISM_FETCH(context.state.token)
        if (data !== undefined) {
            const organismHash = {}
            for (const organism of data) {
                organismHash[Number(organism.id)] = organism
            }
            context.commit('ANNOTATION_UPDATE_ORGANISMS', organismHash)
        } else {
            throw new Error('Unable to fetch list of organisms from annotation api')
        }
    }
    /* fetch_ontologies: (context, payload) => {
        return API_ONTOLOGY_GETALL( (data: OntologyRecord[]) => {
            const ontologyHash: OntologyHash = {};
            for (const ontologyRecord of data) {
                ontologyHash[Number(ontologyRecord.ontology_id)] = ontologyRecord;
            }
            context.commit( 'ANNOTATION_UPDATE_ONTOLOGIES', ontologyHash );
        });
    }, */
}

export default actions

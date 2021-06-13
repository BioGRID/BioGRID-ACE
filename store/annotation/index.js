export const state = () => ({
    organisms: {},
    ontologies: {},
    experimentalRoles: [
        { name: 'ancillary', id: 'MI:0684' },
        { name: 'bait', id: 'MI:0496' },
        { name: 'enhanced gene', id: 'MI:2352' },
        { name: 'enhancer gene', id: 'MI:2351' },
        { name: 'hypostatic gene', id: 'MI:2354' },
        { name: 'luminescence acceptor', id: 'MI:2335' },
        { name: 'luminescence acceptor donor pair', id: 'MI:2336' },
        { name: 'luminescence donor', id: 'MI:2334' },
        { name: 'luminescence transmitter', id: 'MI:2341' },
        { name: 'neutral component', id: 'MI:0497' },
        { name: 'prey', id: 'MI:0498' },
        { name: 'putative self', id: 'MI:0898' },
        { name: 'self', id: 'MI:0503' },
        { name: 'suppressed gene', id: 'MI:0582' },
        { name: 'suppressor gene', id: 'MI:0581' },
        { name: 'unspecified role', id: 'MI:0499' }
    ],
    participantTypes: [
        { name: 'chemical', id: '3' },
        { name: 'gene', id: '1' },
        { name: 'uniprot protein', id: '2' }
    ],
    identifierTypes: [
        { name: 'all identifiers', id: '1' },
        { name: 'official symbols + aliases + systematic names', id: '2' },
        { name: 'official symbols', id: '3' },
        { name: 'systematic names', id: '4' },
        { name: 'aliases', id: '5' },
        { name: 'uniprot accessions', id: '6' },
        { name: 'entrez gene ids', id: '7' },
        { name: 'refseq accessions', id: '8' },
        { name: 'sgd ids', id: '9' },
        { name: 'flybase ids', id: '10' },
        { name: 'wormbase ids', id: '11' },
        { name: 'mgi ids', id: '12' }
    ]
})

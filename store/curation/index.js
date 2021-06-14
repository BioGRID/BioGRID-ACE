export const state = () => ({
    curationGroups: {},
    openDatasets: new Map(),
    openHistory: new Map(),
    curationDrawerLinkMap: new Map(),
    currentCurationDrawerLinks: [],
    datasetCurationOptions: {
        ABSTRACT: { text: 'Abstract Read', value: 'ABSTRACT', color: 'light-green', icon: 'mdi-note-text-outline' },
        ACCESSED: { text: 'Accessed', value: 'ACCESSED', color: 'light-blue', icon: 'mdi-eye' },
        FULLTEXT: { text: 'FullText Read', value: 'FULLTEXT', color: 'green', icon: 'mdi-note-text' },
        INPROGRESS: { text: 'In Progress', value: 'INPROGRESS', color: 'indigo', icon: 'mdi-progress-clock' },
        ONHOLD: { text: 'On Hold', value: 'ONHOLD', color: 'amber', icon: 'mdi-alert' },
        QUALITYCONTROL: { text: 'Quality Control', value: 'QUALITYCONTROL', color: 'brown', icon: 'mdi-progress-wrench' },
        UNABLETOACCESS: { text: 'Unable to Access', value: 'UNABLETOACCESS', color: 'pink', icon: 'mdi-cloud-lock' },
        WRONGGROUP: { text: 'Wrong Group', value: 'WRONGGROUP', color: 'purple', icon: 'mdi-clock-fast' }
    },
    attributeTypes: {},
    processingTasks: {},
    maxProcessingTasks: 60,
    entityFamilies: {},
    entityWorkflows: {}
})

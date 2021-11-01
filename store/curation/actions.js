import bodybuilder from 'bodybuilder'
import notification from '@/utilities/notifications'

const actions = {
    toggleDatasetCollapsed (context) {
        context.commit('CURATION_TOGGLE_DATASET_COLLAPSED')
    },
    async fetch_curation_groups (context) {
        const data = await this.$curationapi.CURATION_GROUP_FETCH()
        if (data !== undefined) {
            const curationGroupHash = {}
            for (const curationGroup of data) {
                curationGroupHash[Number(curationGroup.curation_group_id)] = curationGroup
            }
            context.commit('CURATION_UPDATE_CURATION_GROUPS', curationGroupHash)
        } else {
            throw new Error('Unable to fetch list of curation groups from curation api')
        }
    },
    async fetch_attribute_types (context) {
        const data = await this.$curationapi.ATTRIBUTE_TYPE_FETCH(context.state.token)
        if (data !== undefined) {
            const attributeTypeHash = {}
            for (const attributeType of data) {
                attributeTypeHash[attributeType.shortcode] = attributeType
            }
            context.commit('CURATION_UPDATE_ATTRIBUTE_TYPES', attributeTypeHash)
        } else {
            throw new Error('Unable to fetch list of attribute types from curation api')
        }
    },
    async fetch_processing_tasks (context, payload) {
        console.info('Fetching Processing Tasks')
        const data = await this.$curationapi.TASK_FETCH(context.state.token, context.state.maxProcessingTasks, payload.userID)
        if (data !== undefined) {
            const processingTaskHash = {}
            for (const task of data) {
                processingTaskHash[task.processing_id] = task
            }
            context.commit('CURATION_UPDATE_PROCESSING_TASKS', processingTaskHash)
        } else {
            throw new Error('Unable to fetch recent processing tasks from curation api')
        }
    },
    async fetch_history (context, payload) {
        const data = await this.$curationapi.HISTORY_FETCH(context.state.token, payload.refID, payload.refType)
        if (data !== undefined) {
            context.commit('CURATION_ADD_HISTORY', { refID: payload.refID, history: data })
        } else {
            throw new Error('Unable to fetch curation history')
        }
    },
    remove_dataset (context, payload) {
        context.commit('CURATION_REMOVE_HISTORY', payload.dataset_id)
        context.commit('CURATION_REMOVE_DATASET', payload.dataset_id)
        context.commit('CURATION_REMOVE_DRAWER_LINK', payload.dataset_id)
        context.dispatch('rebuild_current_drawer_links')
    },
    truncate_datasets (context) {
        context.commit('CURATION_TRUNCATE_HISTORY')
        context.commit('CURATION_TRUNCATE_DATASETS')
        context.commit('CURATION_TRUNCATE_DRAWER_LINKS')
        context.dispatch('rebuild_current_drawer_links')
    },
    async fetch_dataset (context, payload) {
        const query = bodybuilder()
            .filter('term', 'source_id', payload.sourceID)
            .filter('term', 'source_type', payload.sourceType)
            .build()

        const data = await this.$elasticapi.ELASTIC_QUERY(context.state.token, query, 'dataset')
        if (data === undefined) {
            context.dispatch('notify/displayNotification', notification('error', 'dataset_fetch_offline'), { root: true })
            return undefined
        } else if (data.hits.total.value === 1) {
            const dataset = data.hits.hits[0]._source
            context.commit('CURATION_ADD_DATASET', dataset)
            context.dispatch('fetch_history', { refID: dataset.dataset_id, refType: 'dataset' }, {})
            context.dispatch('add_curation_drawer_link', { dataset_id: dataset.dataset_id }, {})
            return dataset.dataset_id
        }
        return 0
    },
    async fetch_dataset_by_id (context, payload) {
        const query = bodybuilder()
            .filter('term', 'dataset_id', payload.datasetID)
            .build()

        const data = await this.$elasticapi.ELASTIC_QUERY(context.state.token, query, 'dataset')
        if (data === undefined) {
            context.dispatch('notify/displayNotification', notification('error', 'dataset_fetch_offline'), { root: true })
            return undefined
        } else if (data.hits.total.value === 1) {
            const dataset = data.hits.hits[0]._source
            context.commit('CURATION_ADD_DATASET', dataset)
            context.dispatch('fetch_history', { refID: dataset.dataset_id, refType: 'dataset' }, {})
            context.dispatch('add_curation_drawer_link', { dataset_id: dataset.dataset_id }, {})
            return dataset.dataset_id
        }
        return 0
    },
    add_curation_drawer_link (context, payload) {
        const dataset = context.getters.getOpenDataset(payload.dataset_id)
        if (dataset !== undefined) {
            let datasetInfo = 'Pubmed: ' + dataset.source_id
            if (dataset.source_type !== 'pubmed') {
                datasetInfo = dataset.source_type + ' ' + dataset.source_id
            }
            const curationNavDrawerLink = {
                to: '/curation/DatasetView/' + payload.dataset_id,
                icon: 'mdi-book-open-page-variant',
                text: 'View Dataset',
                subtitle: datasetInfo
            }

            context.commit('CURATION_ADD_DRAWER_LINK', { refID: payload.dataset_id, link: curationNavDrawerLink })
            context.dispatch('rebuild_current_drawer_links')
        }
    },
    rebuild_current_drawer_links (context) {
        const curationDrawerLinkList = []
        for (const val of context.state.curationDrawerLinkMap.values()) {
            curationDrawerLinkList.push(val)
        }
        context.commit('CURATION_UPDATE_CURRENT_DRAWER_LINKS', curationDrawerLinkList)
    },
    async fetch_entity_families (context) {
        const data = await this.$curationapi.ENTITY_FAMILY_FETCH()
        if (data !== undefined) {
            const entityFamilyHash = {}
            for (const entityFamily of data) {
                entityFamilyHash[entityFamily.entity_family_id] = entityFamily
            }
            context.commit('CURATION_UPDATE_ENTITY_FAMILIES', entityFamilyHash)
        } else {
            throw new Error('Unable to fetch list of entity families from curation api')
        }
    },
    async fetch_entity_workflows (context) {
        const data = await this.$curationapi.ENTITY_WORKFLOW_FETCH()
        if (data !== undefined) {
            const entityWorkflowHash = {}
            for (const entityWorkflow of data) {
                entityWorkflowHash[entityWorkflow.entity_workflow_id] = entityWorkflow
            }
            context.commit('CURATION_UPDATE_ENTITY_WORKFLOWS', entityWorkflowHash)
        } else {
            throw new Error('Unable to fetch list of entity workflows from curation api')
        }
    }
}

export default actions

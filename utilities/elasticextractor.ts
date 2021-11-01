
export function elasticExtract (type: string, entity: any, params: any) {
    switch (type.toUpperCase()) {
        case 'PID_ER' :
            return extract_PID_ER(entity, params)

        case 'PN_ER' :
            return extract_PN_ER(entity, params)

        case 'OABB_ER' :
            return extract_OABB_ER(entity, params)

        case 'EKA_SC' :
            return extract_EKA_SC(entity, params)

        default:
            return 'test'
    }
}

// Determine which participant ids correspond to a specific
// experimental role definition, and return the list of ids
// PARTICIPANT_IDS_BY_EXPERIMENTAL_ROLE
function extract_PID_ER (entity: any, params: any): number[] {
    const participantAttributes = entity.participant_attributes
    const participantSet: number[] = []
    for (const attribute of participantAttributes) {
        if (attribute.attribute_type_id === 28) {
            if (attribute.attribute_text === params.role) {
                participantSet.push(attribute.participant_id)
            }
        }
    }

    return participantSet
}

// Return a string representing the name of all participants
// matching the specific experimental role
// PARTICIPANT_NAMES_BY_EXPERIMENTAL_ROLE
function extract_PN_ER (entity: any, params: any): string {
    const participantIDs = extract_PID_ER(entity, params)
    const participantSet: string[] = []
    for (const participant of entity.participants) {
        if (participantIDs.includes(participant.participant_id)) {
            participantSet.push(participant.name)
        }
    }
    return participantSet.join(',')
}

// Return a string representing the abbreviation of all organisms
// matching the specific experimental role
// ORGANISM_ABBREVIATION_BY_EXPERIMENTAL_ROLE
function extract_OABB_ER (entity: any, params: any): string {
    const participantIDs = extract_PID_ER(entity, params)
    const participantSet: string[] = []
    for (const participant of entity.participants) {
        if (participantIDs.includes(participant.participant_id)) {
            participantSet.push(participant.organism.abbreviation)
        }
    }
    return participantSet.join(',')
}

// Return a string representing the combination of all experimental
// attributes matching a specific type
// EXPERIMENTAL_KEYWORD_ATTRIBUTE_BY_SHORTCODE
function extract_EKA_SC (entity: any, params: any) {
    return entity.keyword_attributes[params.shortcode].text.join(',')
}

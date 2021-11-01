/**
 * This file is for declaring shared interfaces that can be
 * re-used in different areas of the site for typescript verification
 **/

/**
 * GENERIC TYPES
 */

export interface StringHash {
    [index: string]: string;
}

export interface NumericHash {
    [index: string]: number;
}

export interface ObjectHash {
    [index: string]: object;
}

export interface AnyHash {
    [index: string]: any;
}

 /**
 * LINKOUT LISTS FOR BUILDING URLS
 */

export interface Linkout {
    to: string;
    text: string;
    title: string;
    icon?: string;
    internal?: boolean;
    target?: string;
    prefix?: string;
    image?: string;
    accessLevel?: string;
}

/**
 * ADMIN TOOLS FOR THE ADMIN INDEX
 */

export interface AdminTool {
    to: string;
    icon: string;
    color: string;
    title: string;
    desc: string;
    access_level: string;
}

/**
 * Tables
 */

 export interface TableColumn {
    title: string;
    field: string;
    sortable: boolean;
    searchable: boolean;
    searchTag?: string | undefined;
    searchName: string;
    sortDirection: string;
    sortOrder: number;
    sortNested?: object | undefined;
    className?: string;
    width?: string;
    formatFunc?: string;
    formatFuncParams?: object;
}

export interface TableSort {
    sortDirection: string;
    sortOrder: number;
}

export interface QueryRestriction {
    type: string;
    field: string;
    value: string;
}

export interface SearchTagLookup {
    [tag: string]: string;
}

export interface ElasticContentField {
    title: string;
    field: string;
}

export interface ElasticContentValue {
    title: string;
    value: string;
}

/**
 * AUTH API
 */

export interface UserLogin {
    email: string;
    password: string;
}

export interface PermRecord {
    id: number;
    name: string;
    description: string;
    category: string;
    level: string;
}

export interface PermHash {
    [key: string]: PermRecord;
}

/**
 * ANNOTATION API
 */

export interface OrganismEntry {
    id: number;
    common_name: string;
    official_name: string;
    abbreviation: string;
    strain: string;
    deprecated: number;
}

export interface OrganismHash {
    [key: number]: OrganismEntry;
}

export interface OntologyRecord {
    ontology_id: number;
    name: string;
    abbreviation: string;
    prefix: string;
    url: string;
    deprecated: number;
}

export interface OntologyHash {
    [key: number]: OntologyRecord;
}

/**
 * CURATION API
 */

export interface CurationDrawerLink {
    to: string;
    icon: string;
    text: string;
    subtitle?: string;
}

export interface CurationDrawerHash {
    [key: number]: CurationDrawerLink;
}

export interface HistoryEntry {
    history_id: number;
    method: string;
    reference_id: number;
    reference_type: string;
    curation_group_id: number;
    comment: string;
    state: string;
    user_id: number;
    added_date: string;
}

export interface AttributeTypeEntry {
    attribute_type_id: number;
    name: string;
    attribute_type_category_id: number;
    shortcode: string;
    deprecated: number;
}

export interface AttributeTypeHash {
    [tag: string]: AttributeTypeEntry;
}

export interface CurationGroupEntry {
    curation_group_id: number;
    name: string;
    description: string;
    organisms: number[];
    users: number[];
    deprecated: number;
}

export interface CurationGroupHash {
    [key: number]: CurationGroupEntry;
}

export interface TaskPayload {
    options: StringHash;
    data: object | null;
}

export interface TaskNotes {
    [key: string]: string[];
}

export interface LastRun {
    Time: string;
    Valid: boolean;
}

export interface ProcessingTask {
    processing_id: number;
    task: string;
    payload: TaskPayload;
    processing_code?: string;
    priority: number;
    state: string;
    status_code: number;
    status_message: string;
    stats?: NumericHash;
    notes?: TaskNotes;
    user_id: number;
    last_run?: LastRun;
    added_date?: string;
}

export interface ProcessingTaskHash {
    [key: number]: ProcessingTask;
}

export interface EntityWorkflowBlock {
    name: string;
    title: string;
    description: string;
    type: string;
    required: boolean;
    settings?: Record<string, string|number|string[]|boolean>;
    valid?: boolean | undefined;
    state?: string | undefined;
    data?: any;
}

export interface EntityWorkflowEntry {
    entity_workflow_id: number;
    name: string;
    entity_family_id: number;
    workflow: EntityWorkflowBlock[];
    user_id: number;
    deprecated: number;
}

export interface EntityWorkflowHash {
    [key: number]: EntityWorkflowEntry;
}

export interface EntityFamilyEntry {
    entity_family_id: number;
    name: string;
    columns: TableColumn[];
    user_id: number;
    deprecated: number;
}

export interface EntityFamilyHash {
    [key: number]: EntityFamilyEntry;
}

/**
 * CHEMICALS
 */

 export interface ChemicalEntry {
    chemical_id: number;
    name: string;
    description: string;
    chemical_type: string;
    source: string;
    source_id: string;
    synonyms: string;
    formula: string;
    inchi: string;
    inchikey: string;
    smile: string;
    molecular_weight: string;
    dbxrefs: object[];
    deprecated: number;
}

export interface ChemicalSynonymMap {
    [synonymID: string]: string;
}

export interface DatasetCurationOption {
    text: string;
    value: string;
    color: string;
    icon: string;
}

export interface DatasetCurationOptionHash {
    [key: string]: DatasetCurationOption;
}

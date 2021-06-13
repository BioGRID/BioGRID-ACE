/**
 * API Class for the Curation API
 */

 export default class CurationAPI {
     private $axios: any
     private apiURL: string | undefined

     constructor (context: any) {
         this.apiURL = context.$config.curationAPIURL
         this.$axios = context.$axios
     }
}

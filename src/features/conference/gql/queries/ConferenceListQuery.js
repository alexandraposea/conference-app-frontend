import { gql } from '@apollo/client'
import ConferenceFragments from './fragments'

export const CONFERENCE_LIST_QUERY = gql`  
 query conferenceList($pager: PagerInput!, $filters: ConferenceFilterInput, $email: String!) {  
    conferenceList(pager: $pager, filters: $filters) { 
        pagination(pager: $pager, filters: $filters) {
            currentPage {
                page
                pageSize
            }
            totalCount
        }   
        values {        
           ...conference     
            type {          
                id         
                name       
            }        
            category {         
                id         
                name       
            }       
            location { 
                    id         
                    county {           
                        id           
                        name         
                        }         
                    country {           
                        id           
                        name         
                    }         
                    city {            
                        id           
                        name         
                    }        
                }       
                speakers {         
                    id          
                    name         
                    isMainSpeaker       
                }       
                status(userEmail: $email) {         
                    id          
                    name        
                }      
            }    
        }  
    }
    ${ConferenceFragments.conference}
`

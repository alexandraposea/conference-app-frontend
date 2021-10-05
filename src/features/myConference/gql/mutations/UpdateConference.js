import { gql } from '@apollo/client'
import ConferenceFragments from 'features/conference/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'

export const UPDATE_CONFERENCE = gql`
    mutation saveConference($input: ConferenceInput!) {
        saveConference(input: $input) {
            ...conference
            type {
                ...type
            }
            category {
                 ...category
            }
            location {
                ...location
                city {
                    ...city
                }
                 county{
                    ...county
                }
                country{
                    ...country
                }
            }
            speakers {
                ...speaker
            }
        }
    }


${ConferenceFragments.conference}
${ConferenceFragments.speaker}
${ConferenceFragments.location}
${CommonFragments.type}
${CommonFragments.category}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
`
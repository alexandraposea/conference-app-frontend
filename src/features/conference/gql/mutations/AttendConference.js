import { gql } from '@apollo/client'
import ConferenceFragments from 'features/conference/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'

const ATTEND_CONFERENCE = gql`
    mutation attend($input: Attendee) {
        attend(input: $input) {
            code
            suggestedConferences {
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

}
${CommonFragments.category}
${ConferenceFragments.conference}
${ConferenceFragments.speaker}
${ConferenceFragments.location}
${CommonFragments.type}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
`

export default ATTEND_CONFERENCE
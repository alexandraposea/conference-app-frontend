import { gql } from '@apollo/client'
import ConferenceFragments from 'features/conference/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'

export const CONFERENCE_QUERY = gql`
query conferenceById($id: ID!) {
  conference(id: $id) {
    ...conference
    location {
      ...location
      country {
        ...country
      }
      county {
       ...county
      }
      city {
       ...city
      }
    }
    speakers {
      ...speaker
    }
    type {
      ...type
    }
    category {
      ...category
    }
  }
}
${ConferenceFragments.conference}
${ConferenceFragments.location}
${ConferenceFragments.speaker}
${CommonFragments.type}
${CommonFragments.category}
${CommonFragments.city}
${CommonFragments.country}
${CommonFragments.county}
`
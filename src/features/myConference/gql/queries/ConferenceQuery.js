import { gql } from '@apollo/client'
import ConferenceFragments from 'features/conference/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'

export const CONFERENCE_QUERY = gql`
query conferenceData($id: ID!, $isNew: Boolean!) {
  conference(id: $id) @skip(if: $isNew){
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
  typeList {
    ...type
  }
  categoryList {
    ...category
  }
  cityList {
    ...city
  }
  countyList {
    ...county
  }
  countryList {
    ...country
  }
},
${ConferenceFragments.conference}
${ConferenceFragments.speaker}
${ConferenceFragments.location}
${CommonFragments.type}
${CommonFragments.category}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
`
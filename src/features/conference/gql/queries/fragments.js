import { gql } from '@apollo/client'

const Fragments = {
    conference: gql`
    fragment conference on Conference {
       id
       name
       startDate
       endDate 
    }
    `,
    location: gql`
    fragment location on Location {
        id
        name
        address
        latitude
        longitude
    }
    `,
    speaker: gql`
    fragment speaker on Speaker {
      id
      name
      nationality
      rating
      isMainSpeaker
    }
    `,
    
}


export default Fragments
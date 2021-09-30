import { gql } from '@apollo/client'

const Fragments = {
    conference: gql`
    fragment conference on Conference {
       id
       name
       startDate
       endDate 
    }
`}


export default Fragments
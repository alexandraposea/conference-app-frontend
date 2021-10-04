import { gql } from '@apollo/client'

const ATTEND_CONFERENCE = gql`
    mutation attend($input: Attendee) {
        attend(input: $input)
    }
`

export default ATTEND_CONFERENCE
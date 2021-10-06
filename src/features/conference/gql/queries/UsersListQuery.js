import { gql } from '@apollo/client'

const USERS_LIST_QUERY = gql`
query users($id: ID!) {
  users(id: $id) {
    attendeeEmail
  }
}
 `

export default USERS_LIST_QUERY
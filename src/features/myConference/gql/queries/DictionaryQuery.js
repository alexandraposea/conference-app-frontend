import { gql } from '@apollo/client'

export const DICTIONARY_QUERY = gql`
query getDictionaries {
  typeList {
    id
    name
    code
  }
  categoryList {
    id
    name
    code
  }
  countryList {
    id
    name
    code
  }
  countyList {
    id
    name
    code
  }
  cityList {
    id
    name
    code
  }
}
`
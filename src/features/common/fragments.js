import { gql } from '@apollo/client'

const Fragments = {
    country: gql`
        fragment country on Country {
            id
            name 
            code
        }
        `,
    county: gql`
      fragment county on County {
          id
          name 
          code
      }
      `,
    city: gql`
        fragment city on City {
            id
            name 
            code
        }
        `,
    type: gql`
          fragment type on Type {
              id
              name 
          }
          `,
    category: gql`
       fragment category on Category {
           id
           name 
       }
       `
}

export default Fragments;
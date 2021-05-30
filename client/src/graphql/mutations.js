import gql from 'graphql-tag';

export const ADD_INDIVIDUAL_MUTATION = gql`
mutation addIndividual($name: String! $date: Date! $picture: String!){
    createContact(name: $name, birthdate: $date, picture: $picture){
        _id
    }
}
`
export const DELETE_INDIVIDUAL_BY_ID_MUTATION = gql`
mutation deleteByID($id: ID!){
    deleteContact(id: $id){
        _id
    }
}`

export const UPDATE_INDIVIDUAL_BY_ID_MUTATION = gql`
mutation updateByID($id: ID! $name: String $birthdate: Date $picture: String){
    updateContact(id: $id, name: $name, birthdate: $birthdate, picture: $picture){
        _id
        name
    }
}`

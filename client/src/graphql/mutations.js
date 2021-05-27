import gql from 'graphql-tag';

export const ADD_INDIVIDUAL_MUTATION = gql`
mutation addIndividual($name: String! $date: String!){
    createIndividual(name: $name, birthdate: $date){
        id
    }
}
`
export const DELETE_INDIVIDUAL_BY_ID_MUTATION = gql`
mutation deleteByID($id: ID!){
    deleteIndividual(id: $id){
        id
    }
}`

export const UPDATE_INDIVIDUAL_BY_ID_MUTATION = gql`
mutation updateByID($id: ID! $name: String $birthdate: String){
    updateIndividual(id: $id, name: $name, birthdate: $birthdate){
        id
        name
    }
}`
export const UPDATE_SPREADSHEET_ID = gql`
mutation setSpreadSheetID($spreadsheetId: String!){
    setSpreadSheetId(spreadsheetId: $spreadsheetId)
}
`
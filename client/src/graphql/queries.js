import gql from 'graphql-tag';

export const FETCH_BIRDAYS_DATE_QUERY = gql`
    query dateDateBirthDays($date: String!){   
        getBirthdate(value: $date){
            isoString
            individuals{
                id
                name
            }
        }
    }
`
export const FETCH_BIRTHDAYS_MONTH_QUERY = gql`
    query monthBirthdays($from: String!, $to: String!){
        getBirthdates(startDate: $from, endDate: $to){
            isoString
            individuals{
                id
                name
            }
        }
    }
`
export const FETCH_INDIVIDUAL_BY_ID_QUERY = gql`
    query getIndividual($id: ID!){
        getIndividual(id: $id){
            name
            birthdate{
                isoString
            }
        }
    }
`

export const FETCH_INDIVIDUAL_BY_NAME_QUERY = gql`
    query getIndividuals($name: String!){
        getIndividuals(name: $name){
            id
            name
            birthdate{
                isoString
            }
        }
    }
`

export const FETCH_DRIVE_FILES = gql`
    query{
        listDriveSpreadSheets{
            id
            name
        }
    }
`
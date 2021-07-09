import gql from 'graphql-tag';

export const FETCH_BIRDAYS_DATE_QUERY = gql`
    query dateDateBirthDays($date: Date!){   
        getBirthdatesByDate(date: $date){
           _id
           name
           birthdate
           picture
        }
    }
`
export const FETCH_BIRTHDAYS_MONTH_QUERY = gql`
    query monthBirthdays($month: Int!){
        getBirthdatesByMonth(month: $month){
            _id
            name
            birthdate
            picture
        }
    }
`
export const FETCH_INDIVIDUAL_BY_ID_QUERY = gql`
    query getContactById($id: ID!){
        getContactById(id: $id){
            name
            birthdate
            picture
        }
    }
`

export const FETCH_INDIVIDUAL_BY_NAME_QUERY = gql`
    query getContactsByName($name: String!){
        getContactsByName(name: $name){
            _id
            name
            birthdate
            picture
        }
    }
`
export const LIST_AVATARS_QUERY = gql`
    query{
        listAvatars
    }
`
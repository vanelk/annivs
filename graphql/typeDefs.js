const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Date
  type Query {
    getContactById(id: ID!): Contact
    getContactsByName(name: String!): [Contact]
    getBirthdatesByDate(date: Date!): [Contact]
    getBirthdatesByMonth(month: Int!): [Contact]
    listAvatars: [String]
  }
  type Mutation {
      createContact(name: String!, birthdate: Date!, picture:String!): Contact
      updateContact(id: ID!, name: String, birthdate: Date, picture:String): Contact
      deleteContact(id: ID!): Contact
  }
  type Contact {
      _id: ID
      name: String
      birthdate: Date
      picture: String
  }
`;
module.exports = typeDefs;
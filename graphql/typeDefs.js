const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getIndividual(id: ID!): Individual
    getIndividuals(name: String): [Individual]
    getBirthdate(value: String!): Birthdate
    getBirthdates(startDate: String!, endDate: String!): [Birthdate]
    listDriveSpreadSheets: [Spreadsheet]
  }
  type Mutation {
      createIndividual(name: String!, birthdate: String!): Individual
      updateIndividual(id: ID!, name: String, birthdate: String): Individual
      deleteIndividual(id: ID!): Individual
      setSpreadSheetId(spreadsheetId: String!): String
  }
  type Individual {
      id: ID
      name: String
      birthdate: Birthdate
  }
  type Birthdate {
      timestamp: String
      isoString: String
      individuals: [Individual]
  }
  type Spreadsheet{
    id: String,
    name: String
  }
`;
module.exports = typeDefs;
const birthdateResolvers = require("./birthdate");
const individualResolvers = require("./contact");
const avatarResolvers = require("./avatars");
const { GraphQLScalarType } = require("graphql");
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
})
const resolvers = {
    Date: dateScalar,
    Query: {
        ...individualResolvers.Query,
        ...birthdateResolvers.Query,
        ...avatarResolvers.Query

    },
    Mutation: {
        ...individualResolvers.Mutation
    }
        

   
};
module.exports = resolvers;
const birthdateResolvers = require("./birthdate");
const individualResolvers = require("./individual");
const userResolvers = require("./user");
const resolvers = {
    Query: {
        ...individualResolvers.Query,
        ...birthdateResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...individualResolvers.Mutation,
        ...userResolvers.Mutation
    }
        

   
};
module.exports = resolvers;
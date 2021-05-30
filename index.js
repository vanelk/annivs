const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const router = require("./routers/index")
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(router);


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});



server.applyMiddleware({ app });

mongoose.connect(
    process.env.mongodb_uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
).then(() => {
    app.listen(
        process.env.PORT,
        () => console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    );
})


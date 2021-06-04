const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const router = require("./routers/index")
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const path = require("path");
const findAndPushNotifications = require("./utils/notificationFunc");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(router);
console.log(process.env)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});



server.applyMiddleware({ app });

mongoose.connect(
    process.env.mongodb_uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
).then(() => {
    app.listen(
        process.env.PORT,
        () => console.log(`Running server at port ${process.env.PORT}`)
    );
})
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
setInterval(findAndPushNotifications, 24*3600*1000);
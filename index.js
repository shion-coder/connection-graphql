const mongoose = require('mongoose');
const { ApolloServer, PubSub } = require('apollo-server');

const typeDefs = require('./graphql/type-defs');
const resolvers = require('./graphql/resolvers');

const { mongoURI } = require('./config/keys');

/* -------------------------------------------------------------------------- */

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    throw new Error(err);
  });

// Setup server
const pubsub = new PubSub();

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req, pubsub }) });

const port = process.env.PORT || 4000;

server.listen(port).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });

const port: number = Number.parseInt(process.env.PORT || '4000');

app.listen(port, () => {
  console.log(`🚀  App ready at port: ${port}`);
});

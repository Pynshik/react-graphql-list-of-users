import express from 'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './src/TypeDefs.js';
import resolvers from './src/Resolvers.js';

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    const app = express();
    app.use(cors());
    server.applyMiddleware({ app });
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  }

startApolloServer(typeDefs, resolvers)

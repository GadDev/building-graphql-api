const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

//resolvers
const resolvers = require('./resolvers');
//Schema
const typeDefs = require('./typeDefs');

dotEnv.config();

const app = express();

//set cors
app.use(cors());

//body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

//setup graphql server
apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
	res.send({ message: 'hello thre' });
});

app.listen(PORT, () => {
	console.log(`listen listening on PORT: ${PORT}`);
	console.log(`GraphQL Endpoint: ${apolloServer.graphqlPath}`);
});

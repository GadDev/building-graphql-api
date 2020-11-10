const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
//set env variables
const { tasks, users } = require('./constants');
dotEnv.config();

const app = express();

//set cors
app.use(cors());

//body parser middleware
app.use(express.json());

const typeDefs = gql`
	type Query {
		greetings: String!
		tasks: [Task!]
		task(id: ID!): Task
		users: [User!]
		user(id: ID!): User
	}
	input createTaskInput {
		name: String!
		completed: Boolean!
		userId: ID!
	}
	type Mutation {
		createTask(input: createTaskInput!): Task
	}

	type User {
		id: ID!
		name: String!
		email: String!
		tasks: [Task!]
	}
	type Task {
		id: ID!
		name: String!
		completed: Boolean!
		user: User!
	}
`;

const resolvers = {
	//Query reso
	Query: {
		greetings: () => 'Hello there',
		tasks: () => tasks,
		task: (_, args, cxt, info) => tasks.find((task) => task.id === args.id),
		users: () => users,
		user: (_, { id }, cxt, info) => users.find((user) => user.id === id),
	},
	Mutation: {
		createTask: (_, { input })
	},
	//Field resolver
	Task: {
		user: (parent, args, ctx, info) => {
			return users.find((user) => user.id === parent.userId);
		},
	},
	User: {
		tasks: (parent, args, ctx, info) => {
			return tasks.filter((task) => task.userId === parent.id);
		},
	},
};

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

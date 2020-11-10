const { gql } = require('apollo-server-express');
//Schema
module.exports = gql`
	# Root level type
	extend type Query {
		tasks: [Task!]
		task(id: ID!): Task
	}
	input createTaskInput {
		name: String!
		completed: Boolean!
		userId: ID!
	}
	extend type Mutation {
		createTask(input: createTaskInput!): Task
	}
	# Field type
	type Task {
		id: ID!
		name: String!
		completed: Boolean!
		user: User!
	}
`;

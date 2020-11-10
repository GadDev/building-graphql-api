const uuid = require('uuid');
const { tasks, users } = require('../constants');

module.exports = {
	//Query reso
	Query: {
		tasks: () => tasks,
		task: (_, args, cxt, info) => tasks.find((task) => task.id === args.id),
	},
	Mutation: {
		createTask: (_, { input }) => {
			const task = { ...input, id: uuid.v4() };
			tasks.push(task);
			return task;
		},
	},
	//Field resolver
	Task: {
		user: (parent, args, ctx, info) => {
			return users.find((user) => user.id === parent.userId);
		},
	},
};

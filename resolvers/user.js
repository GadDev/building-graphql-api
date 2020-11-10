const { tasks, users } = require('../constants');

module.exports = {
	//Query reso
	Query: {
		users: () => users,
		user: (_, { id }, cxt, info) => users.find((user) => user.id === id),
	},
	Mutation: {},

	User: {
		tasks: (parent, args, ctx, info) => {
			return tasks.filter((task) => task.userId === parent.id);
		},
	},
};

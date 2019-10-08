const resolvers = {
    Query: {
        users: (parent, args, { models }) => models.User.findAll(),
        user: (parent, { id }, { models }) => models.User.findByPk(id),
        // me: () => me,
    },
    Mutation: {
        makeUser: (parent, { id, name }, { models }) => {
            const user = {
                name
            };
            return models.User.create(user);
        },
        removeUser: (parent, { id }, { models }) => {
            return models.User.destroy({
                where: {
                    id
                }
            })
        },
        register: async (parent, { name, username, password }, { models }) => {
            const user = {
                name,
                username,
                password
            };

            try {
                const registeredUser = await models.User.create(user);
                return typeof registeredUser.id === 'number';
            } catch (error) {
                console.error(error);
            }
            return false;
        }
    },
    User: {
        car: (parent, args, { models }) => {
            return models.Car.findAll({
                where: {
                    userId: parent.id
                }
            });
        }
    }
};

module.exports = resolvers;

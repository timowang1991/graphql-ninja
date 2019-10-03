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

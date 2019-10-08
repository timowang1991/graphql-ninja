const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const { id, name, username } = user;
    return jwt.sign({ id, name, username }, secret, { expiresIn });
}

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
        },
        login: async (parent, { username, password }, { models, secret }) => {
            const user = await models.User.findOne({
                where: { username }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const validPassword = await user.validatePassword(password);
            if (!validPassword) {
                throw new Error('Password is incorrect');
            }

            return {
                token: createToken(user, secret, '30m')
            }
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

// parent, args, context, info

const resolvers = {
    Query: {
        cars: (parent, args, { models }) => models.Car.findAll(),
        car: (parent, { id }, { models }) => models.Car.findByPk(id),
    },
    Mutation: {
        createCar: (parent, { make, model, colour }, { models, me }) => {
            if (!me) {
                throw new Error('Not authenticated');
            }
            const car = {
                make,
                model,
                colour,
                userId: me.id,
            };
            return models.Car.create(car);
        },
        removeCar: (parent, { id }, { models }) => {
            return models.Car.destroy({
                where: {
                    id
                }
            });
        }
    },
    Car: {
        owner: (parent, args, { models }) => {
            return models.User.findByPk(parent.userId)
        }
    },
};

module.exports = resolvers;

const { sequelize } = require('./models/database');
const models = require('./models');

const createData = () => [
    models.User.create({
        name: 'Tamas',
        username: 'tamas',
        password: 'test1',
        cars: [{
            make: 'Mercede',
            model: 'A250',
            colour: 'black'
        }]
    }, {
        include: [models.Car]
    }),

    models.User.create({
        name: 'Susan',
        username: 'susan',
        password: 'test2',
        cars: [{
            make: 'Toyota',
            model: 'Yaris',
            colour: 'Red'
        }]
    }, {
        include: [models.Car]
    }),

    models.User.create({
        name: 'Steven',
        username: 'steven',
        password: 'test3',
        cars: [{
            make: 'Fiat',
            model: '500',
            colour: 'Yellow',
        }, {
            make: 'Ford',
            model: 'Focus',
            colour: 'Green',
        }]
    }, {
        include: [models.Car]
    })
];

sequelize.sync({ force: true, logging: console.log }).then(async () => {
    console.log('sequelize before createData');
    return Promise.all(createData());
}).then((createDataRes) => {
    console.log('createDataRes', createDataRes);
}).catch((err) => {
    console.log('err', err);
});

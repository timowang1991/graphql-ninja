const Sequelize = require('sequelize');
const sequelize = new Sequelize('graphql', 'root', 'hLEV9CgRRibW2zv92eN2', {
    dialect: 'mysql',
    // operatorsAliases: false,
    define: {
        timestamps: false,
    }
});

module.exports = {
    sequelize
};

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
        }
    })

    User.associate = models => {
        // 1 -> M
        // DELETE CASCADE
        User.hasMany(models.Car, { onDelete: 'CASCADE' })
    }

    return User;
};

module.exports = user;

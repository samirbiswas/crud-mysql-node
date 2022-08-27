module.exports = (sequelize, types) => {
    const User = sequelize.define(
        'users',
        {
            id: {
                type: types.INTEGER(10).UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            username: {
                type: types.STRING(30),
            },

            email: {
                type: types.STRING(255),
            },
            password: {
                type: types.CHAR(60),
            },
            user_type: {
                type: types.ENUM('admin', 'employee'),
            },

        },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        },
    );

    return User;
};
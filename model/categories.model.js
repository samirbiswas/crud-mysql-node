module.exports = (sequelize, types) => {
    const Categories = sequelize.define(
      'categories',
      {
        id: {
          type: types.INTEGER(11).UNSIGNED,
          unique: true,
          autoIncrement: true,
          primaryKey: true,
        },
        category_name: {
          type: types.STRING(255),
        },
        category_details: {
          type: types.STRING(255),
        },
      
        category_status: {
          type: types.ENUM("enable", "disable"),
          defaultValue: "enable"
          
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
      },
    );
    return Categories;
  };
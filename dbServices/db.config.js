const Config = function () {
  // for production
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        username: 'test_user',
        dbName: 'test_db',
        password: '',
        host: 'host_ip',
        dialect: 'mysql',
      };

    default:
      return {
        username: 'root',
        dbName: 'mydb',
        password: '',
        host: 'localhost',
        dialect: 'mysql',
      };
  }
};

module.exports = Config();
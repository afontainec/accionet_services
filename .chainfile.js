const path = require('path');

module.exports = {
  models: {
    directory: path.join(process.cwd(), '/chinchapp/models')
  },
  controllers: {
    directory: path.join(process.cwd(), '/chinchapp/controllers')
  },
  views: {
    directory: path.join(process.cwd(), '/chinchapp/views'),
    angular: path.join(process.cwd(), '/chinchapp/'),
  },
  routes: {
    directory: path.join(process.cwd(), '/chinchapp/routes')
  },
  access: path.join(process.cwd(), 'access.js'),
  knex:  path.join(process.cwd(), 'knex.js'),
  thewall: path.join(process.cwd(), 'thewall.js'),
};

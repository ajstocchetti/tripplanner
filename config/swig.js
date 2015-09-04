var swig = require('swig');

function config(app) {
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  swig.setDefaults({ cache: false });
}

module.exports = {
  config: config
};

'use strict';

const Stream = require('stream');
const Hoek = require('hoek');
const Moment = require('moment');

const internals = {
  defaults: {
    format: 'YYMMDD/HHmmss.SSS',
    utc: true,
    color: true
  }
};

internals.utility = {

  //format http request type with different color

  formatHttpMethod(method, settings) {

    const httpMethodColor = {
      get: 32,
      delete: 31,
      put: 36,
      post: 33
    };

    let httpMethod = method.toLowerCase();

    //check color setting is enabled or not.

    if (settings.color) {
      const color = httpMethodColor[method.toLowerCase()] || 34;
      httpMethod = `\x1b[1;${color}m${httpMethod}\x1b[0m`;
    }

    return httpMethod;
  },

}

class Console extends Stream.Transform {

  constructor(config) {

    super({objectMode : true});

    config = config || {};
    this._settings = Hoek.applyToDefaults(internals.defaults, config);
  }

  _transform(data, enc, next) {

    next(null, data);
  }

}

module.exports = Console;

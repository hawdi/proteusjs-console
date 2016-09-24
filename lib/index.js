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

  //format http request method with different color

  formatHttpMethod(method, settings) {

    const httpMethodColor = {
      get: 32,
      delete: 31,
      put: 36,
      post: 33
    };

    let httpMethod = method.toLowerCase();

    //check color setting is enabled or not. (ansicolor)

    if (settings.color) {
      const color = httpMethodColor[method.toLowerCase()] || 34;
      httpMethod = `\x1b[1;${color}m${httpMethod}\x1b[0m`;
    }

    return httpMethod;
  },

  //format status code of http response.

  formatHttpStatusCode(statusCode, settings) {

    let color;
    if (statusCode && settings.color) {
      color = 32;
      if (statusCode >= 500) {
        color = 31;
      }
      else if (statusCode >= 400) {
        color = 33;
      }
      else if (statusCode >= 300) {
        color = 36;
      }

      return `\x1b[${color}m${statusCode}\x1b[0m`;
    }

    return statusCode;
  },

  //common for all services

  formatOutput(event, settings) {

    let timestamp = Moment(parseInt(event.timestamp, 10));

    if (settings.utc) {
      timestamp = timestamp.utc();
    }

    timestamp = timestamp.format(settings.format);

    const objName = ` [${event.object}] `;

    const output = `${timestamp},${objName}${event.data}`;

    return output + `\n`;
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

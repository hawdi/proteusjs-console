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
      get: 32,  //green
      delete: 31, //red
      put: 36,  //cyan
      post: 33  //yellow
    };

    let httpMethod = method.toLowerCase();

    //check color setting is enabled or not. (ansicolor)

    if (settings.color) {
      const color = httpMethodColor[method.toLowerCase()] || 34; //default blue
      httpMethod = `\x1b[1;${color}m${httpMethod}\x1b[0m`;
    }

    return httpMethod;
  },

  //format status code of http response.

  formatHttpStatusCode(statusCode, settings) {

    let color;
    if (statusCode && settings.color) {
      color = 32; //green
      if (statusCode >= 500) {
        color = 31; //red
      }
      else if (statusCode >= 400) {
        color = 33; //yellow
      }
      else if (statusCode >= 300) {
        color = 36; //cyan
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

  formatServerLog(event, settings) {

    const logData = (event.data) ? event.data : '';
    const data = `${logData} pid: (7980)`;

    const response = {
      timestamp: event.timestamp,
      object : event.object,
      data: data
    };

    return internals.utility.formatOutput(response, settings);
  },

  //format server response

  formatServerResponse(event, settings) {

    const query = event.query ? JSON.stringify(event.query) : '';
    const method = internals.utility.formatHttpMethod(event.method, settings);
    const statusCode = internals.utility.formatHttpStatusCode(event.statusCode, settings) || '';

    const output = `${event.instance}: ${method} ${event.path} ${query} ${statusCode} (${event.responseTime}ms)`;

    const response = {
      timestamp: event.timestamp,
      object : event.object,
      data: output
    };

    return internals.utility.formatOutput(response, settings);
  },
}

class Console extends Stream.Transform {

  constructor(config) {

    super({objectMode : true});

    config = config || {};
    this._settings = Hoek.applyToDefaults(internals.defaults, config);
  }

  _transform(data, enc, next) {

    const eventName = data.event;
    const objName = data.object;

    if (objName === 'server') {

      if(eventName === 'response') {
        return next(null, internals.utility.formatServerResponse(data, this._settings));
      } else if(eventName === 'log') {
        return next(null, internals.utility.formatServerLog(data, this._settings));
      }
    }

    next(null, data);
  }

}

module.exports = Console;

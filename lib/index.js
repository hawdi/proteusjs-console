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

  //format server log
  formatServerLog(event, settings) {

    const logData = (event.data) ? event.data : '';
    const data = `${logData} pid: (${event.pid})`;

    const log = {
      timestamp: event.timestamp,
      object : event.object,
      data: data
    };

    return internals.utility.formatOutput(log, settings);
  },

  //format request
  formatServerRequest(event, settings) {

    const method = internals.utility.formatHttpMethod(event.method, settings);

    const data = `${method} ${event.path}`;

    const request = {
      timestamp: event.timestamp,
      object : event.object,
      data: data
    };

    return internals.utility.formatOutput(request, settings);
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

  //format server ops
  formatServerOps(event, settings) {

    const memory = Math.round(event.proc.mem.rss / (1024 * 1024));
    const output = `memory: ${memory}Mb, uptime (seconds): ${event.proc.uptime}, load: [${event.os.load}]`;

    const ops = {
      timestamp: event.timestamp,
      object : event.object,
      data: output
    };

    return internals.utility.formatOutput(ops, settings);
  },

  //format db method with different color
  formatDBMethod(method, settings) {

    const dbMethodColor = {
      select: 32,  //green
      delete: 31, //red
      update: 36,  //cyan
      insert: 33  //yellow
    };

    let dbMethod = method.toLowerCase();

    //check color setting is enabled or not. (ansicolor)

    if (settings.color) {
      const color = dbMethodColor[method.toLowerCase()] || 34; //default blue
      dbMethod = `\x1b[1;${color}m${dbMethod}\x1b[0m`;
    }

    return dbMethod;
  },

  //format db call related query event
  formatDBQuery(event, settings) {

    const query = event.sql;
    const method = internals.utility.formatDBMethod(event.method, settings);

    const output = `${method} sql: ${query}`;

    const dbQuery = {
      timestamp: event.timestamp,
      object : event.object,
      data: output
    };

    return internals.utility.formatOutput(dbQuery, settings);
  },

  //format query end
  formatDBEnd(event, settings) {

    const message = event.message;
    const output = `info: ${message}`;

    const end = {
      timestamp: event.timestamp,
      object : event.object,
      data: output
    };

    return internals.utility.formatOutput(end, settings);
  },

  //format db query error
  formatDBQueryError(event, settings) {

    const message = event.message;
    const output = `error: ${message}`;

    const queryError = {
      timestamp: event.timestamp,
      object : event.object,
      data: output
    };

    return internals.utility.formatOutput(queryError, settings);
  },

  //format db error
  formatDBError(event, settings) {

    const message = event.message;
    const output = `error: ${message}`;

    const error = {
      timestamp: event.timestamp,
      object : event.object,
      data: output
    };

    return internals.utility.formatOutput(error, settings);
  },

  //http request
  formatHttpRequest(event, settings) {

    const method = internals.utility.formatHttpMethod(event.method, settings);

    const output = `${event.protocol} ${method} ${event.href}`;

    const request = {
      timestamp: event.timestamp,
      object : event.object,
      data: output
    };

    return internals.utility.formatOutput(request, settings);
  },

  //http response
  formatHttpResponse(event, settings) {

    const method = internals.utility.formatHttpMethod(event.method, settings);
    const statusCode = internals.utility.formatHttpStatusCode(event.statusCode, settings) || '';

    const output = `${method} ${event.href} ${statusCode}`;

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
    const type = data.type;

    if (objName === 'server') {

      if(eventName === 'response') {
        return next(null, internals.utility.formatServerResponse(data, this._settings));
      } else if(eventName === 'ops') {
        return next(null, internals.utility.formatServerOps(data, this._settings));
      } else if(eventName === 'log') {
        return next(null, internals.utility.formatServerLog(data, this._settings));
      } else if(eventName === 'request') {
        return next(null, internals.utility.formatServerRequest(data, this._settings));
      }

    } else if(type === 'database') {
      if(eventName === 'query') {
        return next(null, internals.utility.formatDBQuery(data, this._settings));
      } else if(eventName === 'queryerror') {
        return next(null, internals.utility.formatDBQueryError(data, this._settings));
      } else if(eventName === 'error') {
        return next(null, internals.utility.formatDBError(data, this._settings));
      } else if(eventName === 'end') {
        return next(null, internals.utility.formatDBEnd(data, this._settings));
      }

    } else if(type === 'httpclient') {
      if(eventName === 'request') {
        return next(null, internals.utility.formatHttpRequest(data, this._settings));
      } else if(eventName === 'response') {
        return next(null, internals.utility.formatHttpResponse(data, this._settings));
      }
    }

    next(null, data);
  }

}

module.exports = Console;

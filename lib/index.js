'use strict';

const stream = require('stream');

class Console extends stream.Transform {

  constructor() {

    super({objectMode : true});
  }

  _transform(data, enc, next) {

    next(null, data);
  }

}

module.exports = Console;

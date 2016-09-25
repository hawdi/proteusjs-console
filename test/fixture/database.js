'use strict';

const externals = { };

externals.query = {
  object: 'knex',
  event: 'query',
  type: 'database',
  timestamp: 1474810261545,
  method: 'select',
  sql: 'select * from `log`',
  options: {},
  timeout: false
};

externals.end = {
  object: 'knex',
  event: 'end',
  type: 'database',
  timestamp: 1474810261552,
  message: 'Query executed successfully'
};

externals.queryError = {
  object: 'knex',
  event: 'queryerror',
  type: 'database',
  timestamp: 1474810894738,
  message: 'select * from `logg` - ER_NO_SUCH_TABLE: Table \'sample.logg\' doesn\'t exist'
};

externals.error = {
  object: 'knex',
  event: 'error',
  type: 'database',
  timestamp: 1474810894741,
  message: 'select * from `logg` - ER_NO_SUCH_TABLE: Table \'sample.logg\' doesn\'t exist'
};

module.exports = externals;

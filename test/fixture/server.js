'use strict';

const externals = { };

externals.log = {
  object: 'server',
  event: 'log',
  timestamp: 1474805684562,
  tags: [ ],
  data: 'server log info',
  pid: 5624
};

externals.ops = {
  object: 'server',
  event: 'ops',
  timestamp: 1474807544930,
  host: 'Geek',
  pid: 5624,
  os: {
    load: [ 0, 0, 0 ],
    mem: {
      total: 4186288128,
      free: 1512509440
    },
    uptime: 739677.6765322
  },
  proc: {
    uptime: 1862.209,
    mem: {
      rss: 19337216,
      heapTotal: 39521360,
      heapUsed: 35841224
    },
    delay: 0.14639198780059814
  },
  load: {
    requests: {},
    concurrents: { '6200': 0 },
    responseTimes: {},
    sockets: {
      http: [Object],
      https: [Object]
    }
  }
};

externals.request = {
  object: 'server',
  event: 'request',
  timestamp: 1474809218227,
  tags: [ undefined ],
  data: undefined,
  pid: 176,
  id: '1474809218210:Geek:176:itinbpd2:10000',
  method: 'get',
  path: '/hapiget'
};

externals.response = {
  object: 'server',
  event: 'response',
  timestamp: 1474809218210,
  id: '1474809218210:Geek:176:itinbpd2:10000',
  instance: 'http://localhost:6200',
  labels: [],
  method: 'get',
  path: '/hapiget',
  query: {},
  responseTime: 52,
  statusCode: 200,
  pid: 176,
  httpVersion: '1.1',
  source: {
    remoteAddress: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
    referer: undefined
  },
  route: '/hapiget',
  log: [
    {
      request: '1474809218210:Geek:176:itinbpd2:10000',
      timestamp: 1474809218222,
      tags: [Object],
      data: [Object],
      internal: true
    },
    {
      request: '1474809218210:Geek:176:itinbpd2:10000',
      timestamp: 1474809218227,
      tags: [Object],
      data: undefined,
      internal: false
    },
    {
      request: '1474809218210:Geek:176:itinbpd2:10000',
      timestamp: 1474809218231,
      tags: [Object],
      data: [Object],
      internal: true
    },
    {
      request: '1474809218210:Geek:176:itinbpd2:10000',
      timestamp: 1474809218260,
      tags: [Object],
      data: undefined,
      internal: true
    }
  ]
};

externals.requestError = {
  object: 'server',
  event: 'error',
  timestamp: 1475161410291,
  id: '1475161410291:Geek:6200:itoh0h3t:10000',
  url: {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '',
    query: {},
    pathname: '/hapi500_2',
    path: '/hapi500_2',
    href: '/hapi500_2'
  },
  method: 'get',
  pid: 6200,
  errorMessage: 'Uncaught error: x is not defined',
  errorStack: 'ReferenceError: Uncaught error: x is not defined'
};

module.exports = externals;

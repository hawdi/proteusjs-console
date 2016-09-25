'use strict';

const externals = { };

externals.httpRequest = {
  object: 'wreck',
  event: 'request',
  type: 'httpclient',
  timestamp: 1474811899297,
  protocol: 'http:',
  method: 'GET',
  host: 'json.org',
  href: 'http://json.org/example.html',
  headers: {}
};

externals.httpResponse = {
  object: 'wreck',
  event: 'response',
  type: 'httpclient',
  timestamp: 1474811900098,
  method: 'GET',
  host: 'json.org',
  href: 'http://json.org/example.html',
  statusCode: 200,
  statusMessage: 'OK',
  headers: {
    date: 'Sun, 25 Sep 2016 13:58:23 GMT',
    server: 'Apache',
    'last-modified': 'Sat, 10 Mar 2007 23:08:05 GMT',
    etag: '"a7-6240-42b5a9cd37f40"',
    'accept-ranges': 'bytes',
    'content-length': '25152',
    connection: 'close',
    'content-type': 'text/html'
  }
};

module.exports = externals;

'use strict';

const Lab = require('lab');
const Code = require('code');
const Moment = require('moment');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

const Streams = require('./fixture/streams');
const Server = require('./fixture/server');
const Database = require('./fixture/database');
const HttpClient = require('./fixture/httpclient');

const Console = require('..');

describe('ProteusjsConsole', () => {

  describe('Server Events', () => {

    it('returns a formatted string for "log" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Server.log);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/121444.562, [server:log] server log info pid: (5624)\n');
        done();
      });
    });

    it('returns a formatted string for "ops" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Server.ops);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/124544.930, [server:ops] memory: 18Mb, uptime (seconds): 1862.209, load: [0,0,0]\n');
        done();
      });
    });

    it('returns a formatted string for "request" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Server.request);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/131338.227, [server:request] \u001b[1;32mget\u001b[0m /hapiget\n');
        done();
      });
    });

    it('returns a formatted string for "response" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Server.response);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/131338.210, [server:response] http://localhost:6200: \u001b[1;32mget\u001b[0m /hapiget {} \u001b[32m200\u001b[0m (52ms)\n');
        done();
      });
    });

  });

  describe('Database Events', () => {

    it('returns a formatted string for "query" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Database.query);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/133101.545, [knex:query] \u001b[1;32mselect\u001b[0m [ sql: select * from `log` ]\n');
        done();
      });
    });

    it('returns a formatted string for "end" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Database.end);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/133101.552, [knex:end] \u001b[1;32minfo\u001b[0m: Query executed successfully\n');
        done();
      });
    });

    it('returns a formatted string for "query error" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Database.queryError);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/134134.738, [knex:queryerror] \u001b[1;31merror\u001b[0m: [ select * from `logg` - ER_NO_SUCH_TABLE: Table \'sample.logg\' doesn\'t exist ]\n');
        done();
      });
    });

    it('returns a formatted string for "error" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(Database.error);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/134134.741, [knex:error] \u001b[1;31merror\u001b[0m: [ select * from `logg` - ER_NO_SUCH_TABLE: Table \'sample.logg\' doesn\'t exist ]\n');
        done();
      });
    });

  });

  describe('HttpClient Events', () => {

    it('returns a formatted string for "request" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(HttpClient.httpRequest);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/135819.297, [wreck:request] \u001b[1;32mget\u001b[0m http://json.org/example.html\n');
        done();
      });
    });

    it('returns a formatted string for "response" events', { plan: 2 }, (done) => {

      const reporter = new Console();
      const out = new Streams.Writer();
      const reader = new Streams.Reader();

      reader.pipe(reporter).pipe(out);
      reader.push(HttpClient.httpResponse);
      reader.push(null);
      reader.once('end', () => {

        expect(out.data).to.have.length(1);
        expect(out.data[0]).to.be.equal('160925/135820.098, [wreck:response] \u001b[1;32mget\u001b[0m http://json.org/example.html (\u001b[32m200\u001b[0m|OK)\n');
        done();
      });
    });

  });

});

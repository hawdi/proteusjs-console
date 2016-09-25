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

});

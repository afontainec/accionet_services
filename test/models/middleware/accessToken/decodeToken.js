process.env.NODE_ENV = 'test';

const codemaster = require('codemaster');

const Req = codemaster.utils.mocks.express.req;
const { assert } = require('chai');
const jwt = require('jsonwebtoken');
const knex = require('../../../../knex');
const accessToken = require('../../../../models/middleware/accessToken');

const secret = process.env.JWT_SECRET || 'JWT_SECRET_FOR ACCIONET';

const ONE_HOUR = 60 * 60;
const now = new Date().getTime() / 1000;
const YESTERDAY = now - 24 * ONE_HOUR;
const TOMORROW = now + 24 * ONE_HOUR;
describe('Middleware: accessToken: decodeToken', () => { // eslint-disable-line


  // eslint-disable-next-line no-undef
  before(async () => {
    await knex.seed.run();
  });

  it('req is undefined', (done) => { // eslint-disable-line
    accessToken.decodeToken(null, null, () => {
      done();
    });
  });

  it('req has a user_id', (done) => { // eslint-disable-line
    const req = Req.generate();
    req.user_id = 44;
    accessToken.decodeToken(req, null, () => {
      assert.isUndefined(req.user);
      done();
    });
  });


  it('no token present', (done) => { // eslint-disable-line
    const req = Req.generate();
    delete req.isAuthenticated;
    accessToken.decodeToken(req, null, () => {
      assert.isUndefined(req.user);
      assert.isFalse(req.isAuthenticated());
      done();
    });
  });

  it('token is present but expired', (done) => { // eslint-disable-line
    const req = Req.generate();
    const token = jwt.sign({ user: 1, exp: YESTERDAY }, secret);
    req.headers.Authorization = `Bearer ${token}`;
    delete req.isAuthenticated;
    accessToken.decodeToken(req, null, () => {
      assert.isUndefined(req.user);
      assert.isFalse(req.isAuthenticated());
      done();
    });
  });

  it('token is valid', (done) => { // eslint-disable-line
    const req = Req.generate();
    const token = jwt.sign({ user: 1, exp: TOMORROW }, secret);
    req.headers.Authorization = `Bearer ${token}`;
    delete req.isAuthenticated;
    accessToken.decodeToken(req, null, () => {
      assert.equal(req.user.id, 1);
      assert.equal(req.user.access.length, 1);
      assert.equal(req.user.access[0].role, 'admin');
      assert.isTrue(req.isAuthenticated());
      done();
    });
  });
});

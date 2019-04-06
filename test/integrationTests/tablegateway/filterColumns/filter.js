// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai'); // eslint-disable-line
const knex = require('../../../../knex');
const Coffee = require('../../../../models/coffee-example');
const Utils = require('codemaster').utils;

const assert = chai.assert; //eslint-disable-line


// Our parent block
describe('TABLE GATEWAY: filter columns', () => { // eslint-disable-line
  before(async () => { // eslint-disable-line
    await knex.seed.run();
  });

  it('filter attributes', async () => { // eslint-disable-line
    const entry = ['price', 'name', 'get out'];
    const filtered = await Coffee.filterColumns(entry);
    assert.deepEqual(filtered, ['name', 'price']);
  });

  it('input is not an array', async () => { // eslint-disable-line
    const filtered = await Coffee.filterColumns('entry');
    assert.deepEqual(filtered, []);
  });
});

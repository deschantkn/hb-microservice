import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import JWTHelper from '../../../helpers/jwtHelper';

chai.use(chaiHttp);

describe('PATCH /api/json/patch', () => {
  it('should patch json object with valid parameters', (done) => {
    const data = {
      json: {
        baz: 'qux',
        foo: 'bar',
      },
      patch: [
        { op: 'replace', path: '/baz', value: 'boo' },
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' },
      ],
    };
    const result = {
      baz: 'boo',
      hello: ['world'],
    };
    const token = JWTHelper.signToken({ username: 'fsdfsd' });

    chai
      .request(app)
      .patch('/api/json/patch')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'data');
        assert.deepEqual(res.body.data, result);
        done();
      });
  });

  it('should fail to patch json object with invalid token', (done) => {
    const data = {};
    const token = 'invalid token';

    chai
      .request(app)
      .patch('/api/json/patch')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Token is invalid');
        done();
      });
  });

  it('should fail to patch json object with missing token', (done) => {
    const data = {};
    const token = '';

    chai
      .request(app)
      .patch('/api/json/patch')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Token is missing');
        done();
      });
  });

  it('should reject request if json or patch objects are missing', (done) => {
    const data = {};
    const token = JWTHelper.signToken({ username: 'fsdfsd' });

    chai
      .request(app)
      .patch('/api/json/patch')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        done();
      });
  });

  it('should fail patching if patch object is invalid', (done) => {
    const data = {
      json: {
        baz: 'qux',
        foo: 'bar',
      },
      patch: [
        { o: 'replace', path: '/baz', value: 'boo' }, // typo in op property
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' },
      ],
    };
    const token = JWTHelper.signToken({ username: 'fsdfsd' });

    chai
      .request(app)
      .patch('/api/json/patch')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        done();
      });
  });

  it('should fail patching if json object is invalid', (done) => {
    const data = {
      json: {
        ba: 'qux', // typo in baz property
        foo: 'bar',
      },
      patch: [
        { o: 'replace', path: '/baz', value: 'boo' }, // typo in op property
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' },
      ],
    };
    const token = JWTHelper.signToken({ username: 'fsdfsd' });

    chai
      .request(app)
      .patch('/api/json/patch')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        done();
      });
  });
});

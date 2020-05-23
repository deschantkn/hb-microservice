import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';

chai.use(chaiHttp);

describe('POST /api/auth/login', () => {
  it('should return a jwt token with any non-null username and password', (done) => {
    const data = {
      username: 'testusername',
      password: 'password',
    };

    chai
      .request(app)
      .post('/api/auth/login')
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body.data, 'token');
        done();
      });
  });

  it('should reject request missing username or password', (done) => {
    const data = {
      username: 'testusername',
    };

    chai
      .request(app)
      .post('/api/auth/login')
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        done();
      });
  });

  it('should reject unhandled routes with status 404', (done) => {
    chai
      .request(app)
      .get('/api/auth/login') // unhandled method
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Not Found');
        done();
      });
  });
});

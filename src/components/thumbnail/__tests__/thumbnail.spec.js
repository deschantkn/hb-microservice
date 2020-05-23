import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import JWTHelper from '../../../helpers/jwtHelper';

chai.use(chaiHttp);

describe('POST /api/thumbnail/generate', () => {
  it('should generate thumbnail with valid parameters', (done) => {
    const data = {
      imgUrl:
        'https://images.pexels.com/photos/318391/pexels-photo-318391.jpeg',
    };
    const token = JWTHelper.signToken({ username: 'dfdsdfg' });
    chai
      .request(app)
      .post('/api/thumbnail/generate')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.header['content-type'], 'image/jpeg');
        done();
      });
  }).timeout(10000);

  it('should fail to generate thumbnail with invalid image url', (done) => {
    const data = {
      imgUrl:
        'https://image.pexel.com/photos/318351/pexels-photdo-31839d1.jpeg',
    };
    const token = JWTHelper.signToken({ username: 'dfdsdfg' });
    chai
      .request(app)
      .post('/api/thumbnail/generate')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        done();
      });
  });

  it('should reject request if token is missing', (done) => {
    const data = {};
    const token = '';
    chai
      .request(app)
      .post('/api/thumbnail/generate')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Token is missing');
        done();
      });
  });

  it('should reject request if token is invalid', (done) => {
    const data = {};
    const token = 'invalid';
    chai
      .request(app)
      .post('/api/thumbnail/generate')
      .set('Authorization', token)
      .send(data)
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Token is invalid');
        done();
      });
  });
});

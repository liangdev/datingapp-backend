const superagent = require('supertest')
const app = require('./app')
const request = () => superagent(app.listen())


describe('Routes', function() {

  describe('GET /text', function() {
    it('should return 200', function(done) {
      request()
        .get('/text')
        .expect(200, done);
    })
  })

})

const dashboard = require("../routes/dashboardRoute");
const mongoose = require("mongoose");
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
app.use('/common', dashboard);

describe('/dashboard route', function () {
    const username = "academypurpose";
    const password = "1234567890";
    const cluster = "cluster0.ri2w0";
    const dbname = "parkingmanagement";
    this.timeout(20000);
    beforeEach(async () => {
        await mongoose.connect(
            `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
          );
    });

    afterEach(async () => {
        await mongoose.connection.close();
    });

    it('should return status code', function (done) {
        request(app)
            .get('/common/dashboard')
            .then(function (response) {
                assert.equal(response.status, 200);
            })
            done();
    });

    it('should return parkingManagementDetails', function (done) {
        request(app)
            .get('/common/parkingManagementDetails')
            .then(function (response) {
                assert.equal(response.status, 200);
                expect(response).to.have.own.property('parkingLotData');
                expect(response).to.have.own.property('floorData');
                expect(response).to.have.own.property('slotData');
                expect(response).to.have.own.property('bookingData');
            })

            done();
    });

});


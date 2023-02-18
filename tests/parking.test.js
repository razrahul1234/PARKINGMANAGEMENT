const parking = require("../routes/parkingroutes");
const mongoose = require("mongoose");
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
app.use('/parking', parking);

describe('/parking route', function () {
    const username = "academypurpose";
    const password = "1234567890";
    const cluster = "cluster0.ri2w0";
    const dbname = "parkingmanagement";
    this.timeout(20000);
    before(async () => {
        await mongoose.connect(
            `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
          );
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it('should return status code on adding parking lot', function (done) {
        request(app)
            .post('/parking/addParkingLot')
            .send({ parking_lot_name: "Parking 3" })
            .then(function (response) {
                assert.equal(response.status, 200);
            })
            done();
    });

    it('should fetch parkingLot', function (done) {
        request(app)
            .get('/parking/parkingLot')
            .then(function (response) {
                assert.equal(response.status, 200);
            })

            done();
    });

    it('should add floorDetails', function (done) {
        request(app)
            .post('/parking/addFloorDetails')
            .send({floor_id: 2, parking_lot_id: 2, floor_number:3, status:'active'})
            .then(function (response) {
                assert.equal(response.status, 200);
            })

            done();
    });

    it('should add spot', function (done) {
        request(app)
            .post('/parking/addSpot')
            .send({floor_id: 2, parking_lot_id: 2, size_of_slots:3, status:'available'})
            .then(function (response) {
                assert.equal(response.status, 200);
            })

            done();
    });

});
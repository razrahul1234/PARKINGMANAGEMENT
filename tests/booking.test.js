const booking = require("../routes/bookingRoute");
const mongoose = require("mongoose");
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
const sinon = require('sinon');

app.use('/booking', booking);

describe('/booking route', function () {
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
        const spy = sinon.spy(booking, 'findSlots');
        booking.findSlots({body: {slot_id}}, 'small');

        request(app)
            .post('/booking/addBooking')
            .send({ size_of_slots: "medium" })
            .then(function (response) {
                assert.equal(response.status, 200);
            })
            done();
    });

    it('should return status on releasing spot', function (done) {
        request(app)
            .post('/booking/releaseBooking')
            .send({ booking_id: 1 })
            .then(function (response) {
                assert.equal(response.status, 200);
            })

            done();
    });

});
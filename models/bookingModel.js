const mongoose = require("mongoose");

const bookingDetailsSchema = new mongoose.Schema({
    booking_id: {
        type: Number,
        required: true
    },
    slot_id: {
        type: Number,
        required: true,
    },
    floor_id: {
        type: Number,
        required: true,
    },
    parking_lot_id: {
        type: Number
    },
    size_of_slots: {
        type: String
    },
    check_in_time: {
        type: String,
        default: new Date()
    },
    check_out_time: {
        type: String
    }
});

const BookingDetailsModel = mongoose.model("booking_details", bookingDetailsSchema);

module.exports = { BookingDetailsModel };
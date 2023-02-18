const mongoose = require("mongoose");

const parkingLotSchema = new mongoose.Schema({
    parking_lot_id: {
        type: Number,
        required: true,
    },
    // number_of_floors: {
    //     type: Number,
    //     default: 0,
    // },
    parking_lot_name: {
        type: String
    },
    status: {
        type: String
    }
});

const floorDetailsSchema = new mongoose.Schema({
    floor_id: {
        type: Number,
        required: true,
    },
    parking_lot_id: {
        type: Number,
        required: true,
    },
    // smaller_slots_count: {
    //     type: Number
    // },
    // medium_slots_count: {
    //     type: Number
    // },
    // large_slots_count: {
    //     type: Number
    // },
    // xlarge_slots_count: {
    //     type: Number
    // },
    // number_of_floor_added: {
    //     type: Number
    // },
    floor_number: {
        type: Number,
        required: true
    },
    status: {
       type: String
    }
});

const slotDetailsSchema = new mongoose.Schema({
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
    status: {
        type: String
    }
});


const ParkingLotModel = mongoose.model("parkingspaces", parkingLotSchema);
const FloorDetailsModel = mongoose.model("floor_details", floorDetailsSchema);
const SlotDetailsModel = mongoose.model("slot_details", slotDetailsSchema);

module.exports = { ParkingLotModel, FloorDetailsModel, SlotDetailsModel };
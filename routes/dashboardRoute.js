var express = require('express');
const { BookingDetailsModel } = require('../models/bookingModel');
var { ParkingLotModel, FloorDetailsModel, SlotDetailsModel } = require('../models/parkingModel');
var router = express.Router();

router.get('/dashboard', async function (req, res, next) {
    try {
        const parkingLotCount = await ParkingLotModel.find({}).count();
        const floorCount = await FloorDetailsModel.find({}).count();
        const totalSlotCount = await SlotDetailsModel.find({}).count();
        const bookingCount = await BookingDetailsModel.find({}).count();

        const smallSlotCount = await SlotDetailsModel.find({size_of_slots: 'small'}).count();
        const mediumSlotCount = await SlotDetailsModel.find({size_of_slots: 'medium'}).count();
        const largeSlotCount = await SlotDetailsModel.find({size_of_slots: 'large'}).count();
        const xlargeSlotCount = await SlotDetailsModel.find({size_of_slots: 'x-large'}).count();

        const jsonData = [
            {title: "PARKING LOT" ,count : parkingLotCount},
            {title: 'FLOOR', count:floorCount},
            {title: 'SLOT', count:totalSlotCount, small:smallSlotCount, medium:mediumSlotCount, large:largeSlotCount,xlarge:xlargeSlotCount},
            {title: 'BOOKING', count:bookingCount},
        ];
        res.json(jsonData);
    } catch (error) {
        res.send(error);
    }

})

router.get('/parkingManagementDetails', async function (req, res, next) {
    try {
        const parkingLotData = await ParkingLotModel.find({});
        const floorData = await FloorDetailsModel.find({});
        const slotData = await SlotDetailsModel.find({});
        const bookingData = await BookingDetailsModel.find({});
        const jsonData = {
            parkingLotData: parkingLotData,
            floorData: floorData,
            slotData: slotData,
            bookingData: bookingData,
            };
        res.json(jsonData);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;
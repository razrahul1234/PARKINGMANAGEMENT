var express = require('express');
var router = express.Router();

var { ParkingLotModel, FloorDetailsModel, SlotDetailsModel } = require('../models/parkingModel');

router.post('/addParkingLot', async function(req, res, next) {
    try {
      await ParkingLotModel.find({}).sort({"parking_lot_id":-1}).limit(1)
      .exec( async (error,data) => {
        if(data && data.length>0)
           req.body.parking_lot_id = data[0].parking_lot_id + 1;
        else
           req.body.parking_lot_id = 1;
        
        const parkinglot = new ParkingLotModel(req.body);
        await parkinglot.save();
        res.json(parkinglot); 
       }
      )
      
    } catch (error) {
      res.status(500).send(error);
    }
});


router.get('/parkingLot', async function(req, res, next) {
    const parkinglot = await ParkingLotModel.find({});
    try {
      res.json(parkinglot);
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.post('/addFloorDetails', async function(req, res, next) {
  try {
    await FloorDetailsModel.find({}).sort({"floor_id":-1}).limit(1)
    .exec( async (error,data) => {
      if(data && data.length>0)
          req.body.floor_id = data[0].floor_id + 1;
      else 
          req.body.floor_id  = 1;
  
      const floor = new FloorDetailsModel(req.body);
      await floor.save();
      res.json(floor); 
     }
    )
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/addSpot', async function(req, res, next) {
  try {
    await SlotDetailsModel.find({}).sort({"slot_id":-1}).limit(1)
    .exec( async (error,data) => {
      if(data && data.length>0)
           req.body.slot_id = data[0].slot_id + 1;
      else
           req.body.slot_id = 1;

      let slot = new SlotDetailsModel(req.body);
      await slot.save();
      res.json(slot); 
     }
    )
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

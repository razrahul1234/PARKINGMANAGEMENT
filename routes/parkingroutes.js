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
    let floor_id = 0;
    let floor_details_array = [];
    await FloorDetailsModel.find({}).sort({"floor_id":-1}).limit(1)
    .exec( async (error,data) => {
      
      if(data && data.length>0)
          floor_id = floor_id + data[0].floor_id + 1;
      // else 
      //     req.body.floor_id  = 1;
  
      // for(let i=0;i<req.body.number_of_floor_added;i++){
      //   let insertdata = { floor_id: floor_id + 1, floor_number: floor_id, status: 'active', parking_lot_id: req.body.parking_lot_id};
      //   floor_details_array.push(insertdata);
      // }
      // floor_details_array.forEach(async (data, i) => {
      //   const floor = new FloorDetailsModel(data);
      //   await floor.save();
      // })
      // res.send(`${floor_details_array.length} floors has been added to Parking Lot ${req.body.parking_lot_id}`); 
     }
    )

    const floor_available = await FloorDetailsModel.find({parking_lot_id: req.body.parking_lot_id});

    for(let i=1;i<=req.body.number_of_floor_added;i++){
      let insertdata = { floor_id: floor_id + i, floor_number: floor_available.length+i, status: 'active', parking_lot_id: req.body.parking_lot_id};
      floor_details_array.push(insertdata);
    }

    floor_details_array.forEach(async (data, i) => {
      const floor = new FloorDetailsModel(data);
      await floor.save();
    })
    res.send(`${floor_details_array.length} floors has been added to Parking Lot ${req.body.parking_lot_id}`);

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

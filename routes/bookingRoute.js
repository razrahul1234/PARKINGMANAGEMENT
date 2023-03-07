var express = require('express');
const { BookingDetailsModel } = require('../models/bookingModel');
var { SlotDetailsModel,ParkingLotModel, FloorDetailsModel,  } = require('../models/parkingModel');
var router = express.Router();

router.post('/addBooking', async function(req, res, next) {
  try {
    let size_of_slots = req.body.size_of_slots;
    let slotdetails = await findSlots(req,size_of_slots);

    if(slotdetails && slotdetails.length>0){
      await bookingAdded(req, res, next, slotdetails)
    } else if(size_of_slots === 'small'){
           size_of_slots = "medium";
           slotdetails = await findSlots(req,size_of_slots);
           if(slotdetails && slotdetails.length>0){
               await bookingAdded(req, res, next, slotdetails)
           } else {
               size_of_slots = "large";
               slotdetails = await findSlots(req,size_of_slots);
               if(slotdetails && slotdetails.length>0){
                await bookingAdded(req, res, next, slotdetails)
               } else {
                  size_of_slots = "x-large";
                  slotdetails = await findSlots(req,size_of_slots);
                  if(slotdetails && slotdetails.length>0){
                    await bookingAdded(req, res, next, slotdetails)
                  } else {
                     res.json({data:{}, message: "NO SLOT FOUND"});
                  }
               }

           }
      } else if(size_of_slots === "medium") {
            size_of_slots = "large";
            slotdetails = await findSlots(req,size_of_slots);
            if(slotdetails && slotdetails.length>0){
              await bookingAdded(req, res, next, slotdetails)
            } else {
              size_of_slots = "x-large";
              slotdetails = await findSlots(req,size_of_slots);
              if(slotdetails && slotdetails.length>0){
               await bookingAdded(req, res, next, slotdetails)
              } else {
                  res.json({data:{}, message: "NO SLOT FOUND"});
              }
            }
      } else if(size_of_slots === "large"){
              size_of_slots = "x-large";
              slotdetails = await findSlots(req,size_of_slots);
              if(slotdetails && slotdetails.length>0){
                await bookingAdded(req, res, next, slotdetails)
              } else {
                  res.json({data:{}, message: "NO SLOT FOUND"});
              }
      } else {
              res.json({data:{}, message: "NO SLOT FOUND"});
      }
    }
   catch (error) {
    res.status(500).send(error);
  }
});

router.post('/releaseBooking', async function(req, res, next) {
  //  await BookingDetailsModel.deleteMany({});
  //  await SlotDetailsModel.deleteMany({})
  //  await ParkingLotModel.deleteMany({})
  //  await FloorDetailsModel.deleteMany({})
  //  res.json("collection deleted");
  try{
     const bookingdetails = await BookingDetailsModel.findOneAndUpdate({booking_id: req.body.booking_id, parking_lot_id: req.body.parking_lot_id }, {check_out_time: new Date()});
     console.log(bookingdetails);
    //  bookingdetails.then(async (booking) => {
       const slot = await SlotDetailsModel.findOneAndUpdate({slot_id: bookingdetails.slot_id }, {status: 'available' });
       res.json(bookingdetails);
    //  })
  } catch(error){
    res.send(error);
  }
});




async function findSlots(req,size){
  const slotdetails = await SlotDetailsModel.find({size_of_slots: size, status: 'available', parking_lot_id: req.body.parking_lot_id });
  return slotdetails;
}

async function slotBook(slotdetails){
  const randomslotindex = Math.floor(Math.random() * slotdetails.length);
  const filter = { slot_id: slotdetails[randomslotindex].slot_id, status: 'available' };
  const update = { status: "booked" };
  return await SlotDetailsModel.findOneAndUpdate(filter,update);
}

async function bookingAdded(req, res, next, slotdetails){
    await BookingDetailsModel.find({}).sort({"booking_id":-1}).limit(1)
    .exec( async (error,data) => {
      if(data && data.length>0)
         req.body.booking_id = data[0].booking_id + 1;
      else
         req.body.booking_id = 1;

      const slotbook = await slotBook(slotdetails);
      req.body.floor_id = slotbook.floor_id;
      req.body.parking_lot_id= slotbook.floor_id;
      req.body.slot_id = slotbook.floor_id;
      const booking = new BookingDetailsModel(req.body);
      await booking.save().then(async (savedresponse) => {
        res.json({data: savedresponse, message:"Slot Booked" });
      }).catch(err => {
        res.send(err);
      });
     }
    )
}



module.exports = router;

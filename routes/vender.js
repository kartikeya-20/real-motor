var express = require('express');
var router = express.Router();
require('dotenv').config();
const config = require('../config');
const fs = require("fs");
const path = require("path");
const moment = require('moment-timezone');
const multer = require('multer');
const mongoose = require('mongoose');
const venderSchema = require('../models/venderSchema')
const venderWorkSchema = require('../models/venderWork');
const carVerifiedImage = require('../models/carVerifiedImage');
const bookingSchema = require('../models/booking');
const jobCart = require('../models/jobCart');
const venderNotification = require('../models/venderNotification')
const notificationSchema = require('../models/notification')
const jobcartV5Schema = require('../models/jobCartV5');
const jobCartV5 = require('../models/jobCartV5');
const serviceSchema2 = require("../models/service2")
//------------------venderDetails-----------kevil --------------


router.post('/addNewVenderDetails', async function (req, res) {
  try {
    const { workshopName, ownerName, phone, workshopAddress, lat, long, gstImage, panCartImage, gumastadharaImage, venderStatus, fcm } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const file = req.file;

    const get = await venderSchema.aggregate([{
      $match: {
        phone: phone
      }
    }
    ]);

    if (get.length >= 1) {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Number Already Exits' })
    }


    let add = await new venderSchema({
      workshopName: workshopName,
      ownerName: ownerName,
      phone: phone,
      workshopAddress: workshopAddress,
      lat: lat,
      long: long,
      fcm:fcm
    });

    if (add != null) {
      await add.save()
      return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
    }
  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});

router.post('/getVenderDetails', async function (req, res) {
  try {
    const { venderId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(venderId)
      }
    }
    ]);
    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: " Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getAllVender', async function (req, res) {
  try {
    // const {venderId} = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderSchema.aggregate([{
      $match: {
        // _id: mongoose.Types.ObjectId(venderId)
      }
    }
    ]);
    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: " Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/UpdateVenderDetails', async function (req, res) {
  try {
    const { workshopName, venderId, ownerName, phone, workshopAddress, lat, long, gstImage, panCartImage, gumastadharaImage, venderStatus } = req.body

    const update = await venderSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(venderId)
      }
    }
    ]);

    let imagePath = [];
    if (gstImage != undefined && gstImage != null && gstImage != [] && gstImage != "") {
      if (gstImage.length > 0) {
        let listStringToBase64 = gstImage.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    let panCartImagePath = [];
    if (panCartImage != undefined && panCartImage != null && panCartImage != [] && panCartImage != "") {
      if (panCartImage.length > 0) {
        let listStringToBase64 = panCartImage.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          panCartImagePath.push(path);
        });
      }
    }
    pan = panCartImagePath.pop()

    let gumastadharaImagePath = [];
    if (gumastadharaImage != undefined && gumastadharaImage != null && gumastadharaImage != [] && gumastadharaImage != "") {
      if (gumastadharaImage.length > 0) {
        let listStringToBase64 = gumastadharaImage.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          gumastadharaImagePath.push(path);
        });
      }
    }
    gumastadgara = gumastadharaImagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        workshopName: workshopName != undefined ? workshopName : update[0].workshopName,
        ownerName: ownerName != undefined ? ownerName : update[0].ownerName,
        phone: phone != undefined ? phone : update[0].phone,
        workshopAddress: workshopAddress != undefined ? workshopAddress : update[0].workshopAddress,
        lat: lat != undefined ? lat : update[0].lat,
        long: long != undefined ? long : update[0].long,
        venderStatus: venderStatus != undefined ? venderStatus : update[0].venderStatus,

        gstImage: gstImage != undefined ? img : update[0].gstImage,
        gumastadharaImage: gumastadharaImage != undefined ? gumastadgara : update[0].gumastadharaImage,
        panCartImage: panCartImage != undefined ? pan : update[0].panCartImage,

      }
      let updateIss = await venderSchema.findByIdAndUpdate(venderId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/addNewVenderUploadDocument', async function (req, res) {
  try {
    const { workshopName, venderId, ownerName, phone, workshopAddress, lat, long, gstImage, panCartImage, gumastadharaImage, venderStatus, panCartNumber, gstNumber } = req.body

    const update = await venderSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(venderId)
      }
    }
    ]);

    let imagePath = [];
    if (gstImage != undefined && gstImage != null && gstImage != [] && gstImage != "") {
      if (gstImage.length > 0) {
        let listStringToBase64 = gstImage.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    let panCartImagePath = [];
    if (panCartImage != undefined && panCartImage != null && panCartImage != [] && panCartImage != "") {
      if (panCartImage.length > 0) {
        let listStringToBase64 = panCartImage.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          panCartImagePath.push(path);
        });
      }
    }
    pan = panCartImagePath.pop()

    let gumastadharaImagePath = [];
    if (gumastadharaImage != undefined && gumastadharaImage != null && gumastadharaImage != [] && gumastadharaImage != "") {
      if (gumastadharaImage.length > 0) {
        let listStringToBase64 = gumastadharaImage.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          gumastadharaImagePath.push(path);
        });
      }
    }
    gumastadgara = gumastadharaImagePath.pop()
console.log(img)
    if (update.length == 1) {
      let updateIs;
      updateIs = {
        gstImage: img != undefined ? img : "", 
        gumastadharaImage: gumastadgara != undefined ? gumastadgara: "",
        panCartImage: pan != undefined ?pan: "",
        gstNumber: gstNumber != undefined ? gstNumber : update[0].gstNumber,
        panCartNumber: panCartNumber != undefined ? panCartNumber : update[0].panCartNumber,

      }
      let updateIss = await venderSchema.findByIdAndUpdate(venderId, updateIs, { new: true })

      let updateIsss;
      updateIsss = {
        venderStatus: 4
      }
      let updateIssss = await venderSchema.findByIdAndUpdate(venderId, updateIsss, { new: true })


      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getCheckVenderVerified', async function (req, res) {
  try {
    const { venderId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(venderId)
      }
    }
    ]);
    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, checkVerifiedStatus: get[0].venderStatus, count: get.length, Data: get, Message: " Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getLoginVender', async function (req, res) {
  try {
    const { phone , fcm } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderSchema.aggregate([{
      $match: {
        phone: phone
      }
    }
    ]);
    if (get.length > 0) {
      let updateIs;
      updateIs = {
        fcm: fcm
      }
      let updateIss = await venderSchema.findByIdAndUpdate(get[0]._id, updateIs)
      return res.status(200).json({ IsSuccess: true, status: 1, count: get.length, Data: get, Message: "Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, status: 0, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getVenderBookingList', async function (req, res) {
  try {
    const { venderId, workshopStatus } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderWorkSchema.aggregate([{
      $match: {
        $and: [{
          venderId: mongoose.Types.ObjectId(venderId)
        }, {
          workshopStatus: workshopStatus
        }]
      }
    },
    {
      $lookup: {
        from: "userdetails",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      }
    },
    {
      $lookup: {
        from: "bookings",
        localField: "bookingId",
        foreignField: "_id",
        as: "bookingDetails",
      }
    },
    {
      $unwind: {
        path: "$bookingDetails"
      }
    },
    {
      $unwind: {
        path: "$userDetails"
      }
    },
    {
      $project: {
        "workshopStatus": 1,
        "serviceStatus": 1,
        "bookingDetails.pickupDate": 1,
        "bookingDetails.pickupTime": 1,
        "bookingDetails.name": 1,
        "bookingDetails.address": 1,
        "bookingDetails.instruction": 1,
        "bookingDetails.phone": 1,
        "bookingDetails.lat": 1,
        "bookingDetails.long": 1,
        "bookingDetails._id": 1,
        "bookingDetails.bookingId": 1,
        "verified": 1

        // "userDetails":1
      }
    }
    ]);

    console.log(get)
    if (get.length > 0) {

      a = get[0]._id.toString()
      console.log(a.toString())
      //console.log(userId.split(""))
      data = a.slice(-6);
      return res.status(200).json({ IsSuccess: true, count: get.length,bookingId:data, Data: get, Message: "Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getVenderBookingOtpVerified', async function (req, res) {
  try {
    const { otp, bookingId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await bookingSchema.aggregate([{
      $match: {
        otp: otp
      }
    }


    ]);

    if (get.length == 1) {
      if (get[0]._id == bookingId) {
        return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: "Data Found" })
      }
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }

    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: "Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});
router.post('/addNewCarImage', async function (req, res) {
  try {
    const { venderId, bookingId, carImageOne, carImageTwo, carImageThree, carImageFour, carImageFive, carImageSix } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    let imagePath = [];
    if (carImageOne != undefined && carImageOne != null && carImageOne != [] && carImageOne != "") {
      if (carImageOne.length > 0) {
        let listStringToBase64 = carImageOne.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    var carImageOnes = imagePath.pop()

    let imagePaths = [];
    if (carImageTwo != undefined && carImageTwo != null && carImageTwo != [] && carImageTwo != "") {
      if (carImageTwo.length > 0) {
        let listStringToBase64 = carImageTwo.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePaths.push(path);
        });
      }
    }
    var carImageTwos = imagePaths.pop()

    let imagePathss = [];
    if (carImageThree != undefined && carImageThree != null && carImageThree != [] && carImageThree != "") {
      if (carImageThree.length > 0) {
        let listStringToBase64 = carImageThree.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePathss.push(path);
        });
      }
    }
    var carImageThrees = imagePathss.pop()

    let imagePathsss = [];
    if (carImageFour != undefined && carImageFour != null && carImageFour != [] && carImageFour != "") {
      if (carImageFour.length > 0) {
        let listStringToBase64 = carImageFour.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePathsss.push(path);
        });
      }
    }
    var carImageFours = imagePathsss.pop()

    let imagePathssss = [];
    if (carImageFive != undefined && carImageFive != null && carImageFive != [] && carImageFive != "") {
      if (carImageFive.length > 0) {
        let listStringToBase64 = carImageFive.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePathssss.push(path);
        });
      }
    }
    var carImageFives = imagePathssss.pop()

    let imagePathsssss = [];
    if (carImageSix != undefined && carImageSix != null && carImageSix != [] && carImageSix != "") {
      if (carImageSix.length > 0) {
        let listStringToBase64 = carImageSix.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/userDocument/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePathsssss.push(path);
        });
      }
    }
    var carImageSixs = imagePathsssss.pop()



    let add = await new carVerifiedImage({
      venderId: venderId,
      bookingId: bookingId,
      carImageOne: carImageOnes,
      carImageTwo: carImageTwos,
      carImageThree: carImageThrees,
      carImageFour: carImageFours,
      carImageFive: carImageFives,
      carImageSix: carImageSixs
    });

    if (add != null) {
      await add.save()


      const update = await venderWorkSchema.aggregate([{
        $match: {

          bookingId: mongoose.Types.ObjectId(bookingId)

        }
      }
      ]);
      console.log(update)
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          workshopStatus: 2,
          serviceStatus: 2,
          verified: 1
        }
        let updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
        console.log(updateIss)
      }

      const updates = await bookingSchema.aggregate([{
        $match: {

          _id: mongoose.Types.ObjectId(bookingId)

        }
      }
      ]);

      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 2
        }
        let updateIss = await bookingSchema.findByIdAndUpdate(bookingId, updateIs, { new: true })
      }

      return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
    }
  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});


//get the car images from the vendor side 
router.post("/getCarImage", async function (req, res) {
  try {
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }
    
    const { bookingId } = req.body;
    const get = await carVerifiedImage.aggregate([
      {
        $match: {
          bookingId: mongoose.Types.ObjectId(bookingId)
        }
      }
    ]);
    if (get.length > 0) {
      res.status(200).json({
        IsSuccess: true,
        Data: get,
        Message: "Data Found"
      });
    } else {
      res.status(200).json({
        IsSuccess: true,
        Data: [],
        Message: "No Data Found"
      });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }
});

router.post("/getUserService", async function (req, res) {
  try {
    const { serviceId } = req.body;
    let authToken = req.headers["authorization"];

    if (
      authToken != config.tockenIs ||
      authToken == null ||
      authToken == undefined
    ) {
      return res.status(200).json({
        IsSuccess: false,
        Data: [],
        Message: "You are not authenticated",
      });
    }




    const get = await serviceSchema2.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(serviceId),
        },
      },
    ]);
    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get,
        Message: " Data Found",
      });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "No Data Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});
// router.post('/UpdateUserProfile', async function (req, res) {
//   try {
//     const {venderId , bookingId , serviceStatus} = req.body

//       const update = await venderWorkSchema.aggregate([{
//         $match: {
//           $and:[
//             {
//               venderId: mongoose.Types.ObjectId(venderId)
//             },
//             {
//               bookingId: mongoose.Types.ObjectId(bookingId)
//             }
//           ]

//         }
//       }
//       ]);



//     if (update.length == 1) {
//       let updateIs;
//       updateIs = {
//           name: name != undefined ? name : update[0].name,

//       }
//       let updateIss = await userDetailsSchema.findByIdAndUpdate(userId, updateIs,{new:true})
//       return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
//     }
//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message })
//   }
// });


router.post('/UpdateVenderBookingStatus', async function (req, res) {
  try {
    const { venderId, bookingId, serviceStatus } = req.body

    const update = await venderWorkSchema.aggregate([{
      $match: {
        $and: [
          {
            venderId: mongoose.Types.ObjectId(venderId)
          },
          {
            bookingId: mongoose.Types.ObjectId(bookingId)
          }
        ]

      }
    }
    ]);

    if (serviceStatus == 1) {
      console.log("1")
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);
      console.log(update)

      console.log("ee")
      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      console.log("ee")
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          workshopStatus: 1,
          serviceStatus: 1
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
        console.log(updateIss)
        console.log("ee")
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 1
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else if (serviceStatus == 2) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 2,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 2
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 3) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);


      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 3,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })

      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 2
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 4) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);

      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 4,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }

      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 4
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 5) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 5,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 5
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }

      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 6) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 6,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 6
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else if (serviceStatus == 7) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 7,
          workshopStatus: 3
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 7,
          status: 2,
          bookingCompleteStatus: 0
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })



      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else if (serviceStatus == 8) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 8,
          workshopStatus: 3
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 8
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })




      }

      const venderNotifications = await new venderNotification({
        title: "Cancelled",
        image: "uploads/notificationIcon/icon-2.png",
        description: "Booking Cancelled",
        date: getCurrentDateTime(),
        venderId: venderId
      })

      if (venderNotifications != null) {
        await venderNotifications.save()
      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    }




  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


// Paras V5 UpdateVenderBookingStatus
router.post('/UpdateVenderBookingStatus_v5', async function (req, res) {
  try {
    const { venderId, bookingId, serviceStatus } = req.body

    const update = await venderWorkSchema.aggregate([{
      $match: {
        $and: [
          {
            venderId: mongoose.Types.ObjectId(venderId)
          },
          {
            bookingId: mongoose.Types.ObjectId(bookingId)
          }
        ]

      }
    }
    ]);

    if (serviceStatus == 1) {
      console.log("1")
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);
      console.log(update)

      console.log("ee")
      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      console.log("ee")
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          workshopStatus: 1,
          serviceStatus: 1
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
        console.log(updateIss)
        console.log("ee")
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 1
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else if (serviceStatus == 2) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 2,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 2
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 3) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);


      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 3,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })

      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 2
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 4) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);

      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 4,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }

      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 4
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 5) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }
      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 5,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 4
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }

      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });

    } else if (serviceStatus == 6) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 6,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 5
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })

      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else if (serviceStatus == 7) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 7,
          // workshopStatus: 3,
          workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 6,
          // status: 2,
          // bookingCompleteStatus: 0
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })



      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    }
    else if (serviceStatus == 8) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updatess = await jobCartV5.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);
      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }
      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 8,
          workshopStatus: 3,
          // workshopStatus: 2
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }

      if (updatess.length == 1) {
        let updateIs;
        updateIs = {
          jobCartStatus: 2
          // workshopStatus: 2
        }
        updateIss = await jobCartV5.findByIdAndUpdate(updatess[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 7,
          // status: 2,
          // bookingCompleteStatus: 0
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })
      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });


    }
    else if (serviceStatus == 9) {
      const update = await venderWorkSchema.aggregate([{
        $match: {
          $and: [
            {
              venderId: mongoose.Types.ObjectId(venderId)
            },
            {
              bookingId: mongoose.Types.ObjectId(bookingId)
            }
          ]

        }
      }
      ]);

      const updates = await bookingSchema.aggregate([{
        $match:
        {
          _id: mongoose.Types.ObjectId(bookingId)
        }


      }
      ]);
      let updateIss
      if (update.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 8,
          workshopStatus: 3
        }
        updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
      }
      if (updates.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 8
        }
        let updateIsss = await bookingSchema.findByIdAndUpdate(updates[0]._id, updateIs, { new: true })




      }

      const venderNotifications = await new venderNotification({
        title: "Cancelled",
        image: "uploads/notificationIcon/icon-2.png",
        description: "Booking Cancelled",
        date: getCurrentDateTime(),
        venderId: venderId
      })

      if (venderNotifications != null) {
        await venderNotifications.save()
      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    }

  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


router.post('/addNewJobCart', async function (req, res) {
  try {
    const { venderId, bookingId, title, description, dateTime } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const file = req.file;

    const update = await venderWorkSchema.aggregate([{
      $match: {
        $and: [
          {
            venderId: mongoose.Types.ObjectId(venderId)
          },
          {
            bookingId: mongoose.Types.ObjectId(bookingId)
          }
        ]

      }
    }
    ]);

    const user = await bookingSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(bookingId)
      }
    }
    ]);

    console.log(user)

    if (update[0].serviceStatus == 2) {
      let add = await new jobCart({
        venderId: venderId,
        bookingId: bookingId,
        title: title,
        description: description,
       
      });

      if (add != null) {
        await add.save()
        if (update.length == 1) {
          let updateIs;
          updateIs = {
            workshopStatus: 2,
            serviceStatus: 3
          }
          updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
          console.log(updateIss)
          console.log("ee")
        }

        const addNotification = await new notificationSchema({
          userId: user[0].userId,
          title: "Please Approved Job Cart!",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/Group18.png"
        });


        if (addNotification != null) {
          await addNotification.save()

        } else {
          console.log("Error")
        }

        return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
      }
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Data' })
    }

    

    // const get = await venderSchema.aggregate([{
    //   $match: {
    //     phone: phone
    //   }
    // }
    // ]);

    // if(get.length >= 1){
    //   return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Number Already Exits' })
    // }



  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});

router.post('/addNewJobCart_v2', async function (req, res) {
  try {
    const { venderId, bookingId, title, description, details , pdf , image} = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }
    // const file = req.file;
    // console.log(file.path);

    let pdfPath = [];
    if (pdf != undefined && pdf != null && pdf != [] && pdf != "") {
      if (pdf.length > 0) {
        let listStringToBase64 = pdf.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/venderPdf/" + Date.now() + ".pdf"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          pdfPath.push(path);
        });
      }
    }
    var pdfs = pdfPath.pop()

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/venderPdf/" + Date.now() + ".jpg"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    var img = imagePath.pop()

    const update = await venderWorkSchema.aggregate([{
      $match: {
        $and: [
          {
            venderId: mongoose.Types.ObjectId(venderId)
          },
          {
            bookingId: mongoose.Types.ObjectId(bookingId)
          }
        ]

      }
    }
    ]);

    const user = await bookingSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(bookingId)
      }
    }
    ]);
    // console.log(user)
    if (user.length > 0) {
      let add = await new jobcartV5Schema({
        venderId: venderId,
        bookingId: bookingId,
        title: title,
        description: description,
        details: details,
        dateTime: getCurrentDateTimessss(),
        shotBookingId: user[0].bookingId,
        userId: user[0].userId,
        pdf: pdfs,
        image: img
      });
      console.log("this is add");
      console.log(add);

      if (add != null) {
        await add.save()
        if (update.length == 1) {
          let updateIs;
          updateIs = {
            workshopStatus: 2,
            serviceStatus: 3
          }
          updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
          console.log(updateIss)
          console.log("ee")
        }

        const addNotification = await new notificationSchema({
          userId: user[0].userId,
          title: "Please Approved Job Cart!",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/Group18.png"
        });


        if (addNotification != null) {
          await addNotification.save()

        } else {
          console.log("Error")
        }

        return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
      }
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'No any booking detail found' })
    }



    //   const get = await venderSchema.aggregate([{
    //     $match: {
    //       phone: phone
    //     }
    //   }
    //   ]);

    //   if(get.length >= 1){
    //     return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Number Already Exits' })
    // }
  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});


router.post('/UpdateJobCart', async function (req, res) {
  try {
    const { jobCartId, venderId, bookingId, title, description, details, pdf, image} = req.body
    const update = await jobcartV5Schema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(jobCartId)
      }
    }
    ]);

    let pdfPath = [];
    if (pdf != undefined && pdf != null && pdf != [] && pdf != "") {
      if (pdf.length > 0) {
        let listStringToBase64 = pdf.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/venderPdf/" + Date.now() + ".pdf"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          pdfPath.push(path);
        });
      }
    }
    var pdfs = pdfPath.pop()

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/venderPdf/" + Date.now() + ".jpg"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    var img = imagePath.pop()
    // service image 
    console.log(pdfs);
    if (update.length == 1) {
      let updateIs;
      updateIs = {
        venderId: venderId != undefined ? venderId : update[0].venderId,
        bookingId: bookingId != undefined ? bookingId : update[0].bookingId,
        title: title != undefined ? title : update[0].title,
        description: description != undefined ? description : update[0].description,
        details: details != undefined ? details : update[0].details,
        pdf: pdfs != undefined ? pdfs : "",
        image: img != undefined ? img : "",
      }
      let updateIss = await jobcartV5Schema.findByIdAndUpdate(jobCartId, updateIs, { new: true })
      console.log(updateIss);
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


// router.post('/addNewJobCart_v2', async function (req, res) {
//   try {
//     const { venderId, bookingId, title, description, details, pdf } = req.body

//     let authToken = req.headers['authorization'];

//     if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
//       return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
//     }

//     let imagePath = [];
//     if (pdf != undefined && pdf != null && pdf != [] && pdf != "") {
//       if (pdf.length > 0) {
//         let listStringToBase64 = pdf.split(",");
//         listStringToBase64.forEach(dateIs => {
//           const path = "uploads/venderPdf/" + Date.now() + ".pdf"
//           const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
//           fs.writeFileSync(path, base64Date, { encoding: "base64" });
//           imagePath.push(path);
//         });
//       }
//     }

//     var pdfs = imagePath.pop()
//     const file = req.file;

//     const update = await venderWorkSchema.aggregate([{
//       $match: {
//         $and: [
//           {
//             venderId: mongoose.Types.ObjectId(venderId)
//           },
//           {
//             bookingId: mongoose.Types.ObjectId(bookingId)
//           }
//         ]

//       }
//     }
//     ]);

//     const user = await bookingSchema.aggregate([{
//       $match: {
//         _id: mongoose.Types.ObjectId(bookingId)
//       }
//     }
//     ]);

//     console.log(user)

//     console.log(pdfs)
//     if (user.length > 0) {
//       let add = await new jobcartV5Schema({
//         venderId: venderId,
//         bookingId: bookingId,
//         title: title,
//         description: description,
//         details: details,
//         dateTime: getCurrentDateTimessss(),
//         shotBookingId: user[0].bookingId,
//         userId: user[0].userId,
//         pdf:pdfs
//       });

//       if (add != null) {
//         await add.save()
//         if (update.length == 1) {
//           let updateIs;
//           updateIs = {
//             workshopStatus: 2,
//             serviceStatus: 3
//           }
//           updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
//           console.log(updateIss)
//           console.log("ee")
//         }

//         const addNotification = await new notificationSchema({
//           userId: user[0].userId,
//           title: "Please Approved Job Cart!",
//           date: getCurrentDateTime(),
//           image: "uploads/notificationIcon/Group18.png"
//         });


//         if (addNotification != null) {
//           await addNotification.save()

//         } else {
//           console.log("Error")
//         }

//         return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
//       } else {
//         return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
//       }
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data: [], Message: 'No any booking detail found' })
//     }



//     // const get = await venderSchema.aggregate([{
//     //   $match: {
//     //     phone: phone
//     //   }
//     // }
//     // ]);

//     // if(get.length >= 1){
//     //   return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Number Already Exits' })
//     // }



//   }
//   catch (error) {
//     return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
//   }

// });

// router.post('/UpdateJobCart', async function (req, res) {
//   try {
//     const { jobCartId, venderId, bookingId, title, description, details, pdf} = req.body

//     const update = await jobcartV5Schema.aggregate([{
//       $match: {
//         _id: mongoose.Types.ObjectId(jobCartId)
//       }
//     }
//     ]);

//     let imagePath = [];
//     if (pdf != undefined && pdf != null && pdf != [] && pdf != "") {
//       if (pdf.length > 0) {
//         let listStringToBase64 = pdf.split(",");
//         listStringToBase64.forEach(dateIs => {
//           const path = "uploads/venderPdf/" + Date.now() + ".pdf"
//           const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
//           fs.writeFileSync(path, base64Date, { encoding: "base64" });
//           imagePath.push(path);
//         });
//       }
//     }

//     var pdfs = imagePath.pop()
//     // service image 
//     console.log(update);
//     if (update.length == 1) {
//       let updateIs;
//       updateIs = {
//         venderId: venderId != undefined ? venderId : update[0].venderId,
//         bookingId: bookingId != undefined ? bookingId : update[0].bookingId,
//         title: title != undefined ? title : update[0].title,
//         description: description != undefined ? description : update[0].description,
//         details: details != undefined ? details : update[0].details,
//         pdf: pdfs != undefined ? pdfs : update[0].pdfs,
//       }
//       let updateIss = await jobcartV5Schema.findByIdAndUpdate(jobCartId, updateIs, { new: true })
//       return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
//     }
//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message })
//   }
// });

router.post('/addNewJobCart_v1', async function (req, res) {
  try {
    const { venderId, bookingId, title, description, voice, pdf } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const file = req.file;

    const update = await venderWorkSchema.aggregate([{
      $match: {
        $and: [
          {
            venderId: mongoose.Types.ObjectId(venderId)
          },
          {
            bookingId: mongoose.Types.ObjectId(bookingId)
          }
        ]

      }
    }
    ]);

    const user = await bookingSchema.aggregate([{
      $match: {


        _id: mongoose.Types.ObjectId(bookingId)
      }

    }
    ]);

    console.log(user)

    let imagePaths = [];
    if (voice != undefined && voice != null && voice != [] && voice != "") {
      if (voice.length > 0) {
        let listStringToBase64 = voice.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/venderAudio/" + Date.now() + ".mp3"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePaths.push(path);
        });
      }
    }
    var voices = imagePaths.pop()
    // console.log(pdf)

    let imagePath = [];
    if (pdf != undefined && pdf != null && pdf != [] && pdf != "") {
      if (pdf.length > 0) {
        let listStringToBase64 = pdf.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/venderPdf/" + Date.now() + ".pdf"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }

    var pdfs = imagePath.pop()
    console.log(pdfs)

    if (update[0].serviceStatus == 2) {
      let add = await new jobCart({
        venderId: venderId,
        bookingId: bookingId,
        title: title,
        description: description,
        voice: voices,
        pdf: pdfs
      });

      if (add != null) {
        await add.save()
        if (update.length == 1) {
          let updateIs;
          updateIs = {
            workshopStatus: 2,
            serviceStatus: 3
          }
          updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
          console.log(updateIss)
          console.log("ee")
        }

        const addNotification = await new notificationSchema({
          userId: user[0].userId,
          title: "Please Approved Job Cart!",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/Group18.png"
        });


        if (addNotification != null) {
          await addNotification.save()

        } else {
          console.log("Error")
        }

        return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
      }
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Data' })
    }

    // const get = await venderSchema.aggregate([{
    //   $match: {
    //     phone: phone
    //   }
    // }
    // ]);

    // if(get.length >= 1){
    //   return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Number Already Exits' })
    // }



  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});


// --------------------------- Paras --------------------------------
router.post('/addNewJobCart_v5', async function (req, res) {
  try {
    const { venderId, bookingId, description, pdf, jobCartDetails } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const file = req.file;

    const update = await venderWorkSchema.aggregate([{
      $match: {
        $and: [
          {
            venderId: mongoose.Types.ObjectId(venderId)
          },
          {
            bookingId: mongoose.Types.ObjectId(bookingId)
          }
        ]

      }
    }
    ]);

    const user = await bookingSchema.aggregate([{
      $match: {


        _id: mongoose.Types.ObjectId(bookingId)
      }

    }
    ]);

    console.log(user)

    let imagePath = [];
    if (pdf != undefined && pdf != null && pdf != [] && pdf != "") {
      if (pdf.length > 0) {
        let listStringToBase64 = pdf.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/venderPdf/" + Date.now() + ".pdf"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }

    var pdfs = imagePath.pop()
    console.log(pdfs)

    if (update[0].serviceStatus == 2) {
      let add = await new jobcartV5Schema({
        venderId: venderId,
        bookingId: bookingId,
        description: description,
        pdf: pdfs,
        jobCartDetails: jobCartDetails
      });

      if (add != null) {
        await add.save()
        if (update.length == 1) {
          let updateIs;
          updateIs = {
            workshopStatus: 2,
            serviceStatus: 3
          }
          updateIss = await venderWorkSchema.findByIdAndUpdate(update[0]._id, updateIs, { new: true })
          console.log(updateIss)
          console.log("ee")
        }

        const addNotification = await new notificationSchema({
          userId: user[0].userId,
          title: "Please Approved Job Cart!",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/Group18.png"
        });


        if (addNotification != null) {
          await addNotification.save()

        } else {
          console.log("Error")
        }

        return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
      }
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Data' })
    }

    // const get = await venderSchema.aggregate([{
    //   $match: {
    //     phone: phone
    //   }
    // }
    // ]);

    // if(get.length >= 1){
    //   return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Number Already Exits' })
    // }



  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});

// // ---------------------------- Paras ------------------------------
// router.post('/getAllNewJobCart_v5', async function (req, res) {
//   try {
//     const { jobCartId } = req.body
//     let authToken = req.headers['authorization'];

//     if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
//       return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
//     }

//     const get = await jobCartV5.aggregate([{
//       $match: {

//       }
//     }


//     ]);


//     if (get.length > 0) {
//       return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: "Data Found" })
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
//     }


//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message })
//   }
// });

// // ----------------------------- Paras -----------------------------
// router.post('/getNewJobCart_v5', async function (req, res) {
//   try {
//     const { jobCartId } = req.body
//     let authToken = req.headers['authorization'];

//     if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
//       return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
//     }

//     const get = await jobCartV5.aggregate([{
//       $match: {
//         _id: mongoose.Types.ObjectId(jobCartId)
//       }
//     }


//     ]);


//     if (get.length > 0) {
//       return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: "Data Found" })
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
//     }


//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message })
//   }
// });

router.post('/getJobCarWithJobCartId', async function (req, res) {
  try {
    const { jobCartId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await jobCartV5.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(jobCartId)
      }
    }


    ]);


    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: "Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getJobCartWithVenderId', async function (req, res) {
  try {
    const { venderId, jobCartStatus } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await jobCartV5.aggregate([{
      $match: {
        $and:[{
          venderId: mongoose.Types.ObjectId(venderId)
        },
      {
        jobCartStatus: jobCartStatus
      }]
        
      }
    }


    ]);


    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: "Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


router.post('/getVenderNotification', async function (req, res) {
  try {
    const { venderId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderNotification.aggregate([{
      $match: {
        venderId: mongoose.Types.ObjectId(venderId)
      }
    }


    ]);


    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: "Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


function getCurrentDateTime() {
  let date = moment()
    .tz("Asia/Calcutta")
    .format("DD/MM/YYYY,h:mm:ss a")
    .split(",")[0];

  let time = moment()
    .tz("Asia/Calcutta")
    .format("DD/MM/YYYY,h:mm:ss a")
    .split(",")[1];

  return date;
}


function getCurrentDateTimessss() {
  let date = moment()
    .tz("Asia/Calcutta")
    .format("DD/MM/YYYY,h:mm:ss a")
    .split(",")[0];

  let time = moment()
    .tz("Asia/Calcutta")
    .format("DD/MM/YYYY,h:mm:ss a")
    .split(",")[1];

  return [date, time];
}
module.exports = router;
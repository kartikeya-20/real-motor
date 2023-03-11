var express = require('express');
var router = express.Router();
require('dotenv').config();
const config = require('../config');
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const moment = require('moment-timezone');
var xlsx = require("xlsx")
const Lead = require('../models/Leads')
const mongoose = require('mongoose');
var bannerSchema = require('../models/banner')
const serviceSchema = require('../models/service')
const serviceSchema2 = require('../models/service2')
const regulerService = require('../models/regulerService')
const trackBookingSchema = require('../models/trackBooking')
const carBrandSchema = require('../models/carBrand')
const carModelSchema = require('../models/carModel')
const carModelFuelSchema = require('../models/carModelFuel')
const carTypeSchema = require('../models/carType')
const fuelTypeSchema = require('../models/fuelType')
const discountCouponSchema = require('../models/discountCoupon')
const memberShipServiceSchema = require('../models/memberShipService')
const memberShipSchema = require('../models/memberShip')
const userMemberShipSchema = require('../models/userMemberShip')
const userMemberShipServiceSchema = require('../models/userMemberShipService');
const bookingSchema = require('../models/booking')
const settingSchema = require('../models/setting')
const { title } = require('process');
const userDetails = require('../models/userDetails');
const sosSchema = require('../models/sos')
const serviceCategorySchema = require('../models/serviceCategory')
const userSOSchema = require('../models/userSOS')
const subCategoryServiceSchema = require('../models/subCatgeoryService')
const { get } = require('http');
const venderSchema = require('../models/venderSchema');
const rezarpay = require('../models/rezerpay');
const venderWork = require('../models/venderWork');
const venderNotification = require('../models/venderNotification')
const adminDetails = require('../models/adminDetails')
const adminAscend = require('../models/adminAscend')
//---------- Multer Image ----- kevil--------------
///
router.post('/getAllVenderNear', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }


    let gets = await venderSchema.aggregate([
      {
        $match: {
          $and: [
            //{userId: mongoose.Types.ObjectId(userId)},
            { venderStatus: 2 },
          ],
        },
      },
    ]);

    // console.log(gets);
    var data = [];
    var km = [];
    var vernderData = [];
    for (let i = 0; i < gets.length; i++) {
      getAll = distances(
        parseInt("21.1407837"),
        parseInt(gets[i].lat),
        parseInt("72.8031412"),
        parseInt(gets[i].long)
      );
      getData = {
        workshopId: gets[i]._id,
        getKm: getAll,
      };
      data.push(getData);
    }
    console.log(getAll + " getAll");
    console.log(data[0] + " data");
    //console.log(data.length);
    for (let j = 0; j < data.length; j++) {
      console.log(data[j]);
      km.push(data[j].getKm);
      km.sort(function (a, b) {
        return a - b;
      });
      //console.log(km);
    }
    console.log(km[0]);
    var getVenderId;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      if (km[0] == data[i].getKm) {
        console.log(i)
        getVenderId = data[i].workshopId;
      } else {
        console.log("no found");
      }
    }

    console.log(getVenderId)



  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});





function distances(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;
  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  // console.log(c*6371);
  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

// 21.150351560133178, 72.82513222704479
// console.log(distances(
//   parseInt("21.15035156"),
//   parseInt("21.14123754"),
//   parseInt("72.82513222"),
//   parseInt("72.80367742")));


//----------------  Paras getNearSOS All -------------------------
router.post('/getNearSOS', async function (req, res) {
  try {
    let authToken = req.headers['authorization'];
    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }
    let gets = await userSOSchema.aggregate([
      {
        $match: {

        },
      },
    ]);
    // console.log(gets);
    var data = [];
    var km = [];
    var vernderData = [];
    let getAll;
    for (let i = 0; i < gets.length; i++) {
      getAll = getDistanceFromLatLonInKm(
        21.15035156,
        72.82513222,
        (gets[i].lat),
        (gets[i].long)
      ).toFixed(1);
      getData = {
        userSOSId: gets[i]._id,
        getKm: getAll,
      };
      data.push(getData);
    }
    // console.log(getAll + " getAll");
    // console.log(data[0] + " data");
    // console.log(data.length);
    for (let j = 0; j < data.length; j++) {
      console.log(data[j]);
      km.push(data[j].getKm);
      km.sort(function (a, b) {
        return a - b;
      });
      // console.log(km);
    }
    console.log(km[0]);
    var getVenderId;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      if (km[0] == data[i].getKm) {
        console.log(i)
        getVenderId = data[i].userSOSId;
      } else {
        console.log("no found");
      }
    }
    console.log(getVenderId)
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});
// console.log(getDistanceFromLatLonInKm(21.15035156,72.82513222,21.14123754,72.80367742).toFixed(1));
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}





//---------------admin details-----------kevil-------------
router.post('/addNewAdmin', async function (req, res) {
  try {
    const { name, phone, userName, password } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 



    let add = await new adminDetails({
      name: name,
      phone: phone,
      userName: userName,
      password: password
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

router.post('/getAllAdmin', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await adminDetails.aggregate([{
      $match: {

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


router.post('/adminLogin', async function (req, res) {
  try {
    const { userName, password } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await adminDetails.aggregate([{
      $match: {
        $and: [
          { userName: userName },
          { password: password }
        ]

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

router.post('/getAllAdminAscend', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await adminAscend.aggregate([{
      $match: {

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

router.post('/UpdateAdminAscendWorkToVender', async function (req, res) {
  try {
    const { venderWorkId, venderId, adminAscendId } = req.body

    const update = await adminAscend.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(adminAscendId)
      }
    }
    ]);
    // service image 

    console.log(update)



    if (update.length == 1) {
      const venderBooking = await new venderWork({
        userId: update[0].userId,
        bookingId: update[0].bookingId,
        address: update[0].address,
        mrp: update[0].mrp,
        currentMrp: update[0].currentMrp,
        totalPay: update[0].totalPay,
        dateTime: getCurrentDateTimessss(),
        venderId: venderId,
      });

      if (venderBooking != null) {
        await venderBooking.save();
      }
      return res.status(200).json({ IsSuccess: true, Data: [venderBooking], Message: `Ascend Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});
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


//-------------------rezarpay ------------kevil -----------

router.post('/addNewRezarpay', async function (req, res) {
  try {
    const { key } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 



    let add = await new rezarpay({
      key: key
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

router.post('/getAllRezarpay', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await rezarpay.aggregate([{
      $match: {

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

router.post('/UpdateRezarpay', async function (req, res) {
  try {
    const { id, key } = req.body

    const update = await rezarpay.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(id)
      }
    }
    ]);

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        key: key != undefined ? key : update[0].key,
      }
      let updateIss = await rezarpay.findByIdAndUpdate(id, updateIs, { new: true })

      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post("/deleteRazarPay", async function (req, res, next) {
  try {
    const { id } = req.body;
    let deletes = await rezarpay.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await rezarpay.findByIdAndDelete(id);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


router.post('/getAllPendingVender', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderSchema.aggregate([{
      $match: {
        venderStatus: 4
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

//-------------SOS DATA------------kevil--------------

router.post('/addNewSOS', async function (req, res) {
  try {
    const { sosTitle, icons, basePrice, advancePrice, incusion } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    // service icon
    let icon = [];
    if (icons != undefined && icons != null && icons != [] && icons != "") {
      if (icons.length > 0) {
        let listStringToBase64 = icons.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/sos/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          icon.push(path);
        });
      }
    }
    imgIcon = icon.pop()



    let add = await new sosSchema({
      sosTitle: sosTitle,
      icon: imgIcon,
      basePrice: basePrice,
      advancePrice: advancePrice,
      incusion: incusion
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


router.post('/getAllSOS', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await sosSchema.aggregate([{
      $match: {

      }
    },
      // {
      //   $project:{
      //     sosTitle: 1,
      //     icon: 1
      //   }
      // }
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

router.post('/getSOS', async function (req, res) {
  try {
    const { sosId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await sosSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(sosId)
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

// ------------------------ Paras -------------------------
router.post('/updateSOS', async function (req, res) {
  try {
    const { sosTitle, icons, basePrice, advancePrice, incusion, sosId } = req.body

    const update = await sosSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(sosId)
      }
    }
    ]);

    let icon = [];
    if (icons != undefined && icons != null && icons != [] && icons != "") {
      if (icons.length > 0) {
        let listStringToBase64 = icons.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/sos/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          icon.push(path);
        });
      }
    }
    imgIcon = icon.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        sosTitle: sosTitle != undefined ? sosTitle : update[0].sosTitle,
        icons: imgIcon != undefined ? imgIcon : update[0].icons,
        basePrice: basePrice != undefined ? basePrice : update[0].basePrice,
        advancePrice: advancePrice != undefined ? advancePrice : update[0].advancePrice,
        incusion: incusion != undefined ? incusion : update[0].incusion,
      }
      let updateIss = await sosSchema.findByIdAndUpdate(sosId, updateIs, { new: true })

      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post("/deleteSOS", async function (req, res, next) {
  try {
    const { sosId } = req.body;
    let deletes = await sosSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(sosId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await sosSchema.findByIdAndDelete(sosId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


//-----------USER SOS DATA ----------KEVIL-----------

router.post('/getAllUserSOS', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await userSOSchema.aggregate([{
      $match: {

      }
    }, {
      $lookup: {
        from: "sos",
        localField: "sosId",
        foreignField: "_id",
        as: "sosDetails",
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
        from: "venderdetails",
        localField: "venderId",
        foreignField: "_id",
        as: "venderDetails",
      }
    }
    ]);
    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get.reverse(), Message: " Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});



//-------------service Data ------------ kevil ---------

router.post('/addNewService', async function (req, res) {
  try {
    const { title, mrp, currentMrp, discount, service, image, icons, carTypeId, subCategoryId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceimage/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon
    let icon = [];
    if (icon != undefined && icons != null && icons != [] && icons != "") {
      if (icons.length > 0) {
        let listStringToBase64 = icons.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceicon/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          icon.push(path);
        });
      }
    }
    imgIcon = icon.pop()

    discounts = ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100

    let add = await new serviceSchema({
      title: title,
      mrp: mrp,
      currentMrp: currentMrp,
      discount: discount,
      image: img,
      icon: imgIcon,
      service: service,
      carTypeId: carTypeId,
      subCategoryId: subCategoryId
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

router.post('/getAllService', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema.aggregate([{
      $match: {

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

router.post('/getService', async function (req, res) {
  try {
    const { serviceId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(serviceId)
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


// ------------------------------ Paras Update Service API ----------------------------
router.post('/updateService', async function (req, res) {
  try {
    const { serviceId,
      title,
      mrp,
      currentMrp,
      discount,
      service,
      image,
      icons } = req.body

    const update = await serviceSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(serviceId)
      }
    }
    ]);

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carModel/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        title: title != undefined ? title : update[0].title,
        mrp: mrp != undefined ? mrp : update[0].mrp,
        currentMrp: currentMrp != undefined ? currentMrp : update[0].currentMrp,
        discount: discount != undefined ? discount : update[0].discount,
        service: service != undefined ? service : update[0].service,
        image: img != undefined ? img : update[0].image,
        icons: icons != undefined ? icons : update[0].icons,
      }
      let updateIss = await serviceSchema.findByIdAndUpdate(serviceId, updateIs, { new: true })

      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});



// ------------------- Paras -----------------------

router.post('/addNewService_v5', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    let add = await serviceSchema2.insertMany(req.body);
    console.log(add)

    if (add != null) {
      return res.status(200).json({ IsSuccess: true, Data: add, Message: 'Added Data' })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
    }
  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});


// router.post('/addNewService_v5', async function (req, res) {
//   try {
//     const { title, mrp, currentMrp, discount, service, image, icons, carTypeId, subCategoryId, carModelId, carFualTypeId, deliveryCharges, regulerServiceId } = req.body

//     let authToken = req.headers['authorization'];

//     if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
//       return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
//     }


//     discounts = ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100

//     let add = await new serviceSchema2({
//       title: title,
//       mrp: mrp,
//       currentMrp: currentMrp,
//       discount: discount,
//       image: image,
//       icon: icons,
//       service: service,
//       carTypeId: carTypeId,
//       subCategoryId: subCategoryId,
//       carModelId: carModelId,
//       carFualTypeId: carFualTypeId,
//       deliveryCharges: deliveryCharges,
//       regulerServiceId: regulerServiceId
//     });

//     if (add != null) {
//       await add.save();
//       return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
//     }
//   }
//   catch (error) {
//     return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
//   }

// });

router.post('/updateService_v5', async function (req, res) {
  try {
    const { serviceId,
      title,
      mrp,
      currentMrp,
      discount,
      service,
      image,
      icons,
      carTypeId,
      subCategoryId,
      carModelId,
      carFualTypeId,
      regulerServiceId,
      deliveryCharges } = req.body



    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carModel/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (serviceId != null || serviceId != undefined) {

      const update = await serviceSchema2.aggregate([{
        $match: {
          _id: mongoose.Types.ObjectId(serviceId)
        }
      }
      ]);

      if (update.length == 1) {
        let updateIs;
        updateIs = {
          title: title != undefined ? title : update[0].title,
          mrp: mrp != undefined ? mrp : update[0].mrp,
          currentMrp: currentMrp != undefined ? currentMrp : update[0].currentMrp,
          discount: discount != undefined ? discount : update[0].discount,
          service: service != undefined ? service : update[0].service,
          image: img != undefined ? img : update[0].image,
          icons: icons != undefined ? icons : update[0].icons,
          carTypeId: carTypeId != undefined ? carTypeId : update[0].carTypeId,
          subCategoryId: subCategoryId != undefined ? subCategoryId : update[0].subCategoryId,
          carModelId: carModelId != undefined ? carModelId : update[0].carModelId,
          carFualTypeId: carFualTypeId != undefined ? carFualTypeId : update[0].carFualTypeId,
          deliveryCharges: deliveryCharges != undefined ? deliveryCharges : update[0].deliveryCharges,
          regulerServiceId: regulerServiceId != undefined ? regulerServiceId : update[0].regulerServiceId,
        }
        let updateIss = await serviceSchema2.findByIdAndUpdate(serviceId, updateIs, { new: true })

        return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
      }
    } else {
      const update = await serviceSchema2.aggregate([{
        $match: {
          $and: [{
            subCategoryId: mongoose.Types.ObjectId(subCategoryId),
            regulerServiceId: mongoose.Types.ObjectId(regulerServiceId)
          }]
        }
      }
      ]);

      if (update.length > 0) {
        let updateIs;
        updateIs = {
          mrp: mrp != undefined ? mrp : update[0].mrp,
          currentMrp: currentMrp != undefined ? currentMrp : update[0].currentMrp,
          discount: discount != undefined ? discount : update[0].discount,
        }
        let updateIss = await serviceSchema2.updateMany({
          $and: [{
            subCategoryId: mongoose.Types.ObjectId(subCategoryId),
            regulerServiceId: mongoose.Types.ObjectId(regulerServiceId)
          }]
        }, { $set: updateIs }, { new: true })

        return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
      }
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getService_v5', async function (req, res) {
  try {
    const { serviceId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema2.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(serviceId)
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

router.post('/getAllService_v5', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema2.aggregate([{
      $match: {

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

router.post("/deleteService_v5", async function (req, res, next) {
  try {
    const { serviceId } = req.body;

    if (serviceId != null || serviceId != undefined) {
      let deletes = await serviceSchema2.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(serviceId)
          }
        }
      ]);
      if (deletes.length == 1) {
        let deletee = await serviceSchema2.findByIdAndDelete(serviceId);
        return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
      }
    } else {
      const { subCategoryId, regulerServiceId } = req.body;
      const deletes = await serviceSchema2.aggregate([{
        $match: {
          $and: [{
            subCategoryId: mongoose.Types.ObjectId(subCategoryId),
            regulerServiceId: mongoose.Types.ObjectId(regulerServiceId)
          }]
        }
      }
      ]);
      if (deletes.length > 0) {
        let deletee = await serviceSchema2.deleteMany({
          subCategoryId: mongoose.Types.ObjectId(subCategoryId),
          regulerServiceId: mongoose.Types.ObjectId(regulerServiceId)
        });
        return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


router.post("/deleteServiceSubCategory", async function (req, res, next) {
  try {
    const { serviceId } = req.body;
    let deletes = await serviceSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(serviceId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await serviceSchema.findByIdAndDelete(serviceId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});




//------------------------- Paras Reguler Service -------------------------------
router.post('/addRegulerService', async function (req, res) {
  try {
    const { title, service, image, icons } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceimage/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon
    let icon = [];
    if (icons != undefined && icons != null && icons != [] && icons != "") {
      if (icons.length > 0) {
        let listStringToBase64 = icons.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceicon/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          icon.push(path);
        });
      }
    }
    imgIcon = icon.pop()

    let add = await new regulerService({
      title: title,
      service: service,
      image: img,
      icon: imgIcon,
    });

    console.log(add);
    if (add != null) {
      await add.save();
      return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
    }
  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});


router.post('/addNewRegulerService_v5', async function (req, res) {
  try {
    const { title, service } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service icon
    let add = await new regulerService({
      title: title,
      service: service
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

router.post('/updateRegulerService', async function (req, res) {
  try {
    const { title, service, regulerServiceId, image, icons } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const update = await regulerService.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(regulerServiceId)
      }
    }
    ]);
    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceimage/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    // service icon
    let iconNew = [];
    if (icons != undefined && icons != null && icons != [] && icons != "") {
      if (icons.length > 0) {
        let listStringToBase64 = icons.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceicon/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          iconNew.push(path);
        });
      }
    }
    imgIcon = iconNew.pop()
    if (update.length == 1) {
      let updateIs;
      updateIs = {
        title: title != undefined ? title : update[0].title,
        service: service != undefined ? service : update[0].service,
        image: img != undefined ? img : update[0].image,
        icon: imgIcon != undefined ? imgIcon : update[0].icon,
      }
      console.log(updateIs);
      let updateIss = await regulerService.findByIdAndUpdate(regulerServiceId, updateIs, { new: true })

      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/updateRegulerService_v1', async function (req, res) {
  try {
    const { title, service, regulerServiceId, image, icons } = req.body

    const update = await regulerService.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(regulerServiceId)
      }
    }
      // {
      //   $lookup: {
      //     from: "servicedata2",
      //     localField: "_id",
      //     foreignField: "regulerServiceId",
      //     as: "serviceData"
      //   }
      // }
    ]);
    // console.log(update[0].serviceData.length);
    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceimage/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    // service icon
    let iconNew = [];
    if (icons != undefined && icons != null && icons != [] && icons != "") {
      if (icons.length > 0) {
        let listStringToBase64 = icons.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/serviceicon/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          iconNew.push(path);
        });
      }
    }
    imgIcon = iconNew.pop()

    // console.log(update[0].ser);
    // let matchService = update[0].serviceData
    // console.log(matchService);
    if (update.length == 1) {
      let updateIs;
      updateIs = {
        title: title != undefined ? title : update[0].title,
        service: service != undefined ? service : update[0].service,
        image: img != undefined ? img : update[0].image,
        icon: imgIcon != undefined ? imgIcon : update[0].icon,
      }
      let updateIss = await regulerService.findByIdAndUpdate(regulerServiceId, updateIs, { new: true })
      if (updateIss) {
        // for (let i = 0; i < matchService.length; i++) {
        //   const service = matchService[i];
        //   // console.log(service._id);
        //   let updateIsss = await serviceSchema2.findByIdAndUpdate(service._id, updateIs)
        // }

        let updateIsss = await serviceSchema2.updateMany({ regulerServiceId: regulerServiceId }, { $set: updateIs })
        console.log(updateIsss, "updataed")
      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


router.post('/getRegulerService', async function (req, res) {
  try {
    const { regulerServiceId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await regulerService.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(regulerServiceId)
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

router.post('/getAllRegulerService', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await regulerService.aggregate([{
      $match: {

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

router.post('/updateRegulerService', async function (req, res) {
  try {
    const { title, service, regulerServiceId } = req.body


    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }
    const update = await regulerService.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(regulerServiceId)
      }
    }
    ]);
    if (update.length == 1) {
      let updateIs;
      updateIs = {
        title: title != undefined ? title : update[0].title,
        service: service != undefined ? service : update[0].service,
      }
      let updateIss = await regulerService.findByIdAndUpdate(regulerServiceId, updateIs, { new: true })

      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post("/deleteRegulerService", async function (req, res, next) {
  try {
    const { regulerServiceId } = req.body;

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }
    let deletes = await regulerService.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(regulerServiceId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await regulerService.findByIdAndDelete(regulerServiceId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});



router.post("/deleteRegulerService_v1", async function (req, res, next) {
  try {
    const { regulerServiceId } = req.body;
    let deleteRegulerService = await regulerService.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(regulerServiceId)
        }
      }
    ]);
    const deleteService = await serviceSchema2.aggregate([
      {
        $match: {
          regulerServiceId: mongoose.Types.ObjectId(regulerServiceId)
        }
      }
    ]);

    if (deleteRegulerService.length == 1) {
      let removeRegulerService = await regulerService.findByIdAndDelete(regulerServiceId);
      if (deleteService.length >= 1) {
        let removeService = await serviceSchema2.deleteMany({ regulerServiceId: regulerServiceId });
        return res.status(200).json({ IsSuccess: true, Data: [removeService], Message: 'Delete Services And Reguler Service' });
      }
      return res.status(200).json({ IsSuccess: true, Data: [removeRegulerService], Message: 'Delete Reguler Service Data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'No Found' });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


router.post('/getAllVerifiedVender', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderSchema.aggregate([{
      $match: {
        venderStatus: 2
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


router.post('/getAllDashbordService', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema.aggregate([{
      $match: {

      }
    },
    {
      $project: {
        icon: 1,
        title: 1,
        _id: 1
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

router.post('/UpdateTrackBookingStatus', async function (req, res) {
  try {
    const { bookingId, trackBooking } = req.body

    const update = await bookingSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(bookingId)
      }
    }
    ]);

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        trackBooking: trackBooking != undefined ? trackBooking : update[0].trackBooking,
      }
      let updateIss = await bookingSchema.findByIdAndUpdate(bookingId, updateIs, { new: true })

      console.log(updateIss)

      if (updateIss.trackBooking == 7) {
        let updateIs;
        updateIs = {
          bookingCompleteStatus: 0
        }
        let updateIss = await bookingSchema.findByIdAndUpdate(bookingId, updateIs, { new: true })

        let updateIse;
        updateIs = {
          status: 2
        }
        let updateIsse = await bookingSchema.findByIdAndUpdate(bookingId, updateIs, { new: true })
      }




      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

// router.post('/UpdatetrackBooking', async function (req, res) {
//   try {
//     const {bookingId,status} = req.body

//       const update = await trackBookingSchema.aggregate([{
//         $match: {
//           bookingId: mongoose.Types.ObjectId(bookingId)
//         }
//       }
//       ]);

//     if (update.length == 1) {
//       let updateIs;
//       updateIs = {
//           status: status != undefined ? status : update[0].status,
//       }
//       let updateIss = await trackBookingSchema.findByIdAndUpdate(update[0]._id, updateIs,{new:true})
//       return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
//     }
//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message })
//   }
// });

//-----------Car Model -------------Kevil------------

router.post('/addNewCarModel', async function (req, res) {
  try {
    const { carBrandId, modelName, carTypeId, image, isActive, fuelTypeId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }


    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carModel/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    // service icon
    let add = await new carModelSchema({
      modelName: modelName,
      carBrandId: carBrandId,
      carTypeId: carTypeId,
      image: img,
      // isActive :isActive != undefined ? isActive : true
    });



    // added by jayshri for fuledetails

    if (add != null) {
      await add.save()

      let addFuel = await new carModelFuelSchema({
        carModelId: add._id,
        fuelTypeId: fuelTypeId,
        image: img
      });
      await addFuel.save()
      // end
      return res.status(200).json({ IsSuccess: true, Data: [add, addFuel], Message: 'Added Data' })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
    }
  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});

router.post('/addIsActiveTrue', async function (req, res) {
  try {

    let updateData = await carModelSchema.updateMany({isActive:null}, {
      $set: {
        isActive: true
      }
    })
    return res.status(200).json({ IsSuccess: true, Data: updateData, Message: 'Added Data' })

  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});

router.post('/getAllCarModel', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carModelSchema.aggregate([{
      $match: {

      }
    },
    {
      $lookup: {
        from: "brands",
        localField: "carBrandId",
        foreignField: "_id",
        as: "CarBrandDetails",
      }
    },
    {
      $lookup: {
        from: "cartypes",
        localField: "carTypeId",
        foreignField: "_id",
        as: "CarTypeDetails",
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


router.post('/getCarModel', async function (req, res) {
  try {
    const { carModelId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carModelSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carModelId)
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

router.post('/getCarModelByCarBrandId', async function (req, res) {
  try {
    const { carBrandId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carModelSchema.aggregate([{
      $match: {
        carBrandId: mongoose.Types.ObjectId(carBrandId)
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


router.post('/UpdateCarModel', async function (req, res) {
  try {
    const { carBrandId, modelName, carTypeId, image, carModelId, isActive, carModelFuelId, fuelTypeId } = req.body

    const update = await carModelSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carModelId)
      }
    }
    ]);
    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carModel/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        modelName: modelName != undefined ? modelName : update[0].modelName,
        carBrandId: carBrandId != undefined ? carBrandId : update[0].carBrandId,
        image: img != undefined ? img : update[0].image,
        carTypeId: carTypeId != undefined ? carTypeId : update[0].carTypeId,
        isActive: isActive != undefined ? isActive : update[0].isActive, // added by jayshri 23 feb 2023

      }
      let updateIss = await carModelSchema.findByIdAndUpdate(carModelId, updateIs, { new: true })


      // added by jayshri added for updating carfule details
      const update1 = await carModelFuelSchema.aggregate([{
        $match: {
          _id: mongoose.Types.ObjectId(carModelFuelId)
        }
      }
      ]);

      let updateIss1
      if (update1.length == 1) {
        let updateIs1;
        updateIs1 = {
          fuelTypeId: fuelTypeId != undefined ? fuelTypeId : update1[0].fuelTypeId,
          carModelId: carModelId != undefined ? carModelId : update1[0].carModelId,
          image: image != undefined ? img : update1[0].image,
        }
        updateIss1 = await carModelFuelSchema.findByIdAndUpdate(carModelFuelId, updateIs1, { new: true })
      }
      // end

      return res.status(200).json({ IsSuccess: true, Data: [updateIss, updateIss1], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post("/deleteCarModel", async function (req, res, next) {
  try {
    const { carModelId } = req.body;
    let deletes = await carModelSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carModelId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await carModelSchema.findByIdAndDelete(carModelId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


router.post("/deleteCarModel_v1", async function (req, res, next) {
  try {
    const { carModelId } = req.body;
    let deleteModel = await carModelSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carModelId)
        }
      }
    ]);
    const deleteFuel = await carModelFuelSchema.aggregate([
      {
        $match: {
          carModelId: mongoose.Types.ObjectId(carModelId)
        }
      }
    ]);

    if (deleteModel.length == 1) {
      let removeModel = await carModelSchema.findByIdAndDelete(carModelId);
      if (deleteFuel.length >= 1) {
        let removeFuel = await carModelFuelSchema.deleteMany({ carModelId: carModelId });
        return res.status(200).json({ IsSuccess: true, Data: [removeFuel], Message: 'Delete Model And Fuel' });
      }
      return res.status(200).json({ IsSuccess: true, Data: [removeModel], Message: 'Delete Model Data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'No Found' });
    }

  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//-----------Car Type -------------Kevil------------

router.post('/addNewCarType', async function (req, res) {
  try {
    const { carType, image } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carType/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon
    let add = await new carTypeSchema({
      carType: carType,
      image: img
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

router.post('/getAllCarType', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carTypeSchema.aggregate([{
      $match: {

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

router.post('/getCarType', async function (req, res) {
  try {
    const { carTypeId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carTypeSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carTypeId)
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

router.post('/updateCarType', async function (req, res) {
  try {
    const { carType, image, carTypeId } = req.body
    let authToken = req.headers['authorization'];
    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const update = await carTypeSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carTypeId)
      }
    }
    ]);
    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carType/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        carType: carType != undefined ? carType : update[0].carType,
        image: img != undefined ? img : update[0].image
      }
      let updateIss = await carTypeSchema.findByIdAndUpdate(carTypeId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post("/deleteCarType", async function (req, res, next) {
  try {
    const { carTypeId } = req.body;
    let deletes = await carTypeSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carTypeId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await carTypeSchema.findByIdAndDelete(carTypeId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//------------------Car Brand ------------------kevil------

router.post('/addNewCarBrand', async function (req, res) {
  try {
    const { brandName, image } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carBrand/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon
    let add = await new carBrandSchema({
      brandName: brandName,
      image: img
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

router.post('/getAllCarBrand', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carBrandSchema.aggregate([{
      $match: {

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

router.post('/getCarBrand', async function (req, res) {
  try {
    const { carTypeId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carTypeSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carTypeId)
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

router.post('/UpdateCarBrand', async function (req, res) {
  try {
    const { image, brandName, carBrandId, isActive } = req.body

    const update = await carBrandSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carBrandId)
      }
    }
    ]);
    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carBrand/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        image: img != undefined ? img : update[0].image,
        brandName: brandName != undefined ? brandName : update[0].brandName,
        isActive: isActive != undefined ? isActive : update[0].isActive
      }
      let updateIss = await carBrandSchema.findByIdAndUpdate(carBrandId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post("/deleteCarBrand", async function (req, res, next) {
  try {
    const { carBrandId } = req.body;
    let deletes = await carBrandSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carBrandId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await carBrandSchema.findByIdAndDelete(carBrandId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


// Delete Car Brand With Car Model With Car Fuel with this API deleteCarBrand_v1
router.post("/deleteCarBrand_v1", async function (req, res, next) {
  try {
    const { carBrandId } = req.body;
    let deletes = await carBrandSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carBrandId)
        }
      }
    ]);
    let deleteModel = await carModelSchema.aggregate([
      {
        $match: {
          carBrandId: mongoose.Types.ObjectId(carBrandId)
        }
      }
    ])
    let deleteFuel = []
    for (let i = 0; i < deleteModel.length; i++) {
      let findCarModelFuel = await carModelFuelSchema.aggregate([
        {
          $match: {
            carModelId: mongoose.Types.ObjectId(deleteModel[i]._id)
          }
        }
      ]);
      for (let j = 0; j < findCarModelFuel.length; j++) {
        const element = findCarModelFuel[j];
        // console.log("One by One data", element);
        deleteFuel.push(findCarModelFuel[j].carModelId);
      }
    }
    // deleteFuel.pop();
    console.log("delete Fuel", deleteFuel.length);
    if (deletes.length == 1) {
      let removeBrand = await carBrandSchema.findByIdAndDelete(carBrandId);
      console.log("Brand", removeBrand);
      if (deleteModel.length >= 1) {
        let removeModel = await carModelSchema.deleteMany({ carBrandId: carBrandId });
        if (deleteFuel.length >= 1) {
          let removeFuel = await carModelFuelSchema.deleteMany({ carModelId: deleteFuel })
          console.log(removeFuel);
          return res.status(200).json({ IsSuccess: true, Data: [removeFuel], Message: 'Delete Brand And Model And Fuel' });
        }
        return res.status(200).json({ IsSuccess: true, Data: [removeModel], Message: 'Delete Brand And Model' });
      }
      return res.status(200).json({ IsSuccess: true, Data: [removeBrand], Message: 'Delete Model Data' });
    }
    else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


//----------Fuel type ---------kevil -----------

router.post('/addNewFuelType', async function (req, res) {
  try {
    const { fuelType, image } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carBrand/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon
    let add = await new fuelTypeSchema({
      fuelType: fuelType,
      image: img
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

router.post('/getAllFuelType', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await fuelTypeSchema.aggregate([{
      $match: {

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

router.post("/deleteFuelType", async function (req, res, next) {
  try {
    const { fuelTypeId } = req.body;
    let deletes = await fuelTypeSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(fuelTypeId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await fuelTypeSchema.findByIdAndDelete(fuelTypeId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

// ---------------------- Update FuelType Paras -------------------------
router.post('/updateFuelType', async function (req, res) {
  try {
    const { image, fuelType, fuelTypeId } = req.body

    const update = await fuelTypeSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(fuelTypeId)
      }
    }
    ]);
    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carBrand/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        image: img != undefined ? img : update[0].image,
        fuelType: fuelType != undefined ? fuelType : update[0].fuelType
      }
      let updateIss = await fuelTypeSchema.findByIdAndUpdate(fuelTypeId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


//------------car Model Fuel -----------kevil-------

router.post('/addNewCarModelFuel', async function (req, res) {
  try {
    const { carModelId, fuelTypeId, image } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carModelFuel/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    const get = await carModelSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carModelId)
      }
    }
    ]);


    // service icon
    let add = await new carModelFuelSchema({
      carModelId: carModelId,
      fuelTypeId: fuelTypeId,
      image: get[0].image
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

router.post('/getAllCarModelFuel', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carModelFuelSchema.aggregate([{
      $match: {

      }
    },

    // ---------------Paras ----------------------------
    {
      $lookup: {
        from: "fueltypes",
        localField: "fuelTypeId",
        foreignField: "_id",
        as: "fueltypesdDetails",
      }
    },
    {
      $lookup: {
        from: "carmodels",
        localField: "carModelId",
        foreignField: "_id",
        as: "carmodelsdDetails",
      }
    },
    {
      $sort: {
        "carmodelsdDetails.modelName": 1
      }
    }
    ]);
    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get.sort(), Message: " Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }

  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getCarModelFuel', async function (req, res) {
  try {
    const { carModelFuelId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }
    const get = await carModelFuelSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carModelFuelId)
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

router.post('/getCarModelFueltypebyCarModelId', async function (req, res) {
  try {
    const { carModelId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await carModelFuelSchema.aggregate([{
      $match: {
        carModelId: mongoose.Types.ObjectId(carModelId)
      }
    },
    {
      $lookup: {
        from: "fueltypes",
        localField: "fuelTypeId",
        foreignField: "_id",
        as: "CarFuelDetails",
      }
    },
    {
      $project: {
        "CarFuelDetails": 1
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

router.post('/UpdateCarModelFuel', async function (req, res) {
  try {
    const { carModelId, fuelTypeId, image, carModelFuelId } = req.body

    const update = await carModelFuelSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(carModelFuelId)
      }
    }
    ]);
    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carModelFuel/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        fuelTypeId: fuelTypeId != undefined ? fuelTypeId : update[0].fuelTypeId,
        carModelId: carModelId != undefined ? carModelId : update[0].carModelId,
        image: img != undefined ? img : update[0].image,
      }
      let updateIss = await carModelFuelSchema.findByIdAndUpdate(carModelFuelId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post("/deleteCarModelFuel", async function (req, res, next) {
  try {
    const { carModelFuelId } = req.body;
    let deletes = await carModelFuelSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carModelFuelId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await carModelFuelSchema.findByIdAndDelete(carModelFuelId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});



//--------------discount Coupon -------------kevil ---------------

router.post('/addNewDiscountCoupon', async function (req, res) {
  try {
    const { title, discount, description, minimumAmount, image, code, startDate, endDate, chackMemberShip } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/discountCoupon/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon
    let add = await new discountCouponSchema({
      title: title,
      discount: discount,
      minimumAmount: minimumAmount,
      image: img,
      description: description,
      couponCode: getUserCodeNumber(),
      startDate: startDate,
      endDate: endDate,
      chackMemberShip: chackMemberShip
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

router.post('/getAllDiscountCoupon', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await discountCouponSchema.aggregate([{
      $match: {

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

router.post('/getDiscountCoupon', async function (req, res) {
  try {
    const { discountCouponId } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }
    const get = await discountCouponSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(discountCouponId)
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


// --------------------- Update Discount Coupon Paras -------------------------
router.post('/updateDiscountCoupon', async function (req, res) {
  try {
    const { title, discount, description, minimumAmount, image, code, startDate, endDate, chackMemberShip, discountCouponId } = req.body

    const update = await discountCouponSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(discountCouponId)
      }
    }
    ]);

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/discountCoupon/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        title: title != undefined ? title : update[0].title,
        discount: discount != undefined ? discount : update[0].discount,
        description: description != undefined ? description : update[0].description,
        minimumAmount: minimumAmount != undefined ? minimumAmount : update[0].minimumAmount,
        image: img != undefined ? img : update[0].image,
        startDate: startDate != undefined ? startDate : update[0].startDate,
        endDate: endDate != undefined ? endDate : update[0].endDate,
        chackMemberShip: chackMemberShip != undefined ? chackMemberShip : update[0].chackMemberShip,
      }
      let updateIss = await discountCouponSchema.findByIdAndUpdate(discountCouponId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

// ---------------------- Delete disCount Coupon Paras ----------------------
router.post("/deleteDiscountCoupon", async function (req, res, next) {
  try {
    const { discountCouponId } = req.body;
    let deletes = await discountCouponSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(discountCouponId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await discountCouponSchema.findByIdAndDelete(discountCouponId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


//-------------memberShipService----------------kevil -------------

router.post('/addNewMemberShipService', async function (req, res) {
  try {
    const { memberShipService } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service icon
    let add = await new memberShipServiceSchema({
      memberShipService: memberShipService
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

router.post('/getAllMemberShipService', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await memberShipServiceSchema.aggregate([{
      $match: {

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



router.post("/deleteMemberShipService", async function (req, res, next) {
  try {
    const { memberShipServiceId } = req.body;
    let deletes = await memberShipServiceSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(memberShipServiceId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await memberShipServiceSchema.findByIdAndDelete(memberShipServiceId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});



//----------memberShip--------kevil-------------

router.post('/addNewMemberShip', async function (req, res) {
  try {
    const { title, description, totalMonth, timeTimit, service, price } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service icon
    let add = await new memberShipSchema({
      title: title,
      description: description,
      timeTimit: timeTimit,
      service: service,
      price: price,
      totalMonth: totalMonth
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

router.post('/getAllMemberShip', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await memberShipSchema.aggregate([{
      $match: {

      }
    },
    {
      $unwind: {
        path: "$service"
      }
    },
    {
      $lookup: {
        from: "regulerservices",
        localField: "service.serviceId",
        foreignField: "_id",
        as: "service.service"
      }
    },
    {
      $unwind: {
        path: "$service.service"
      }
    },
    {
      $group: {
        _id: '$_id',
        memberService: {
          $push: '$service'
        }
      }
    },
    {
      $lookup: {
        from: 'memberships',
        localField: '_id',
        foreignField: '_id',
        as: 'orderDetails'
      }
    },
    {
      $unwind: {
        path: '$orderDetails'
      }
    },
    {
      $addFields: {
        'orderDetails.memberService': '$memberService'
      }
    },
    {
      $replaceRoot: {
        newRoot: '$orderDetails'
      }
    },
    {
      $project: {

        "_id": 1,
        "memberShipId": 1,
        "memberService.qty": 1,
        "memberService.discount": 1,
        "memberService.service.title": 1,
        "memberService.service._id": 1,
        "title": 1,
        "description": 1,
        "timeTimit": 1,
        "price": 1

      }
    }

    ]);


    // console.log(get[0].service)

    // for(let i = 0 ; i < get[0].service.length; i++ ){
    //   console.log(get[0].service[i].serviceId)
    //   const gets = await memberShipSchema.aggregate([{
    //     $match: {
    //      // _id: mongoose.Types.ObjectId(get[0].service[i].serviceId)
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "servicedatas",
    //       let:{serviceId:"$get[0].service[i].serviceId"},

    //         $addFields: {
    //           "qty": get[0].service[i].qty.toString()

    //       },
    //       pipeline:[
    //         {
    //           $match:{

    //           }
    //         }
    //       ],
    //       as: "serviceDetails",
    //   },

    //   }
    //   ]);

    //   console.log(gets)
    //   return res.status(200).json({ IsSuccess: true,count: get.length, Data: gets, Message:" Data Found"})
    // }

    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get, Message: " Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getAllMemberShip_v5', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await memberShipSchema.aggregate([{
      $match: {

      }
    },
    {
      $unwind: {
        path: "$service",
      },
    },
    {
      $lookup: {
        from: "regulerservices",
        localField: "service.serviceId",
        foreignField: "_id",
        as: "service.service",
      },
    },
    {
      $unwind: {
        path: "$service.service",
      },
    },
    {
      $group: {
        _id: "$_id",
        memberService: {
          $push: "$service",
        },
      },
    },
    {
      $lookup: {
        from: "memberships",
        localField: "_id",
        foreignField: "_id",
        as: "orderDetails",
      },
    },
    {
      $unwind: {
        path: "$orderDetails",
      },
    },
    {
      $addFields: {
        "orderDetails.memberService": "$memberService",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$orderDetails",
      },
    },
    {
      $sort: { title: 1 }
    },
    {
      $project: {
        _id: 1,
        memberShipId: 1,
        "memberService.qty": 1,
        "memberService.discount": 1,
        "memberService.service.title": 1,
        "memberService.service._id": 1,
        title: 1,
        description: 1,
        timeTimit: 1,
        price: 1,
        totalMonth: 1,
      },
    },
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


router.post("/getAllMemberShip_v6", async function (req, res) {
  try {
    let authToken = req.headers["authorization"];

    if (
      authToken != config.tockenIs ||
      authToken == null ||
      authToken == undefined
    ) {
      return res
        .status(200)
        .json({
          IsSuccess: false,
          Data: [],
          Message: "You are not authenticated",
        });
    }

    const get = await memberShipSchema.aggregate([
      {
        $match: {},
      },
    ]);


    if (get.length > 0) {
      return res
        .status(200)
        .json({
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

router.post("/deleteMemberShip", async function (req, res, next) {
  try {
    const { memberShipId } = req.body;
    let deletes = await memberShipSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(memberShipId)
        }
      }
    ]);
    if (deletes.length == 1) {
      let deletee = await memberShipSchema.findByIdAndDelete(memberShipId);
      return res.status(200).json({ IsSuccess: true, Data: [deletee], Message: 'Delete data' });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


// ---------------Paras Update MemberShip --------------------
router.post('/updateMemberShip', async function (req, res) {
  try {
    const { membershipId, description, title, timeTimit, service, price, totalMonth } = req.body

    const update = await memberShipSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(membershipId)
      }
    }
    ]);


    if (update.length == 1) {
      let updateIs;
      updateIs = {
        title: title != undefined ? title : update[0].title,
        description: description != undefined ? description : update[0].description,
        timeTimit: timeTimit != undefined ? timeTimit : update[0].timeTimit,
        service: service != undefined ? service : update[0].service,
        price: price != undefined ? price : update[0].price,
        totalMonth: totalMonth != undefined ? totalMonth : update[0].totalMonth,
      }
      let updateIss = await memberShipSchema.findByIdAndUpdate(membershipId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


router.post("/updateMemberShip_v1", async function (req, res) {
  try {
    const {
      membershipId,
      description,
      title,
      timeTimit,
      service,
      price,
      totalMonth,
      serviceId,
    } = req.body;
    let updateIss = await memberShipSchema.updateOne(
      { _id: membershipId },
      { $pull: { "service.serviceId": { $in: serviceId } } },
      // updateIs,
      { multi: true }
    );
    console.log("Update Thaya pasi", updateIss);
    return res
      .status(200)
      .json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


//-------------setting -----------kevil--------------

router.post('/addNewSetting', async function (req, res) {
  try {
    const { userCode, referralCode } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service icon
    let add = await new settingSchema({
      userCode: userCode,
      referralCode: referralCode
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

router.post('/updateSetting', async function (req, res) {
  try {
    const { settingId, userCode, referralCode, orderAscend } = req.body

    const update = await settingSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(settingId)
      }
    }
    ]);


    if (update.length == 1) {
      let updateIs;
      updateIs = {
        userCode: userCode != undefined ? userCode : update[0].userCode,
        referralCode: referralCode != undefined ? referralCode : update[0].referralCode,
        orderAscend: orderAscend != undefined ? orderAscend : update[0].orderAscend
      }
      let updateIss = await settingSchema.findByIdAndUpdate(settingId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

//----------userMemberShip----------kevil --------------

router.post('/addNewUserMemberShip', async function (req, res) {
  try {
    const { userId, memberShipId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const getMemberShip = await memberShipSchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(memberShipId)
      }
    }])

    console.log(getMemberShip[0].service)

    const get = await userMemberShipSchema.aggregate([{
      $match: {
        $and: [
          { userId: mongoose.Types.ObjectId(userId) },
          { memberShipId: mongoose.Types.ObjectId(memberShipId) }
        ]
      }
    }
    ]);

    if (get.length >= 1) {
      return res.status(200).json({ IsSuccess: true, Message: 'Alredy Exits' })
    }

    // service icon
    let add = await new userMemberShipSchema({
      userId: userId,
      memberShipId: memberShipId,
      service: getMemberShip[0].service
    });

    if (add != null) {
      await add.save()

      let updateIs;
      updateIs = {
        memberShipStatus: 1
      }
      let updateIss = await userDetails.findByIdAndUpdate(userId, updateIs, { new: true })


      return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Added Data' })
    }
  }
  catch (error) {
    return res.status(500).json({ IsSuccess: false, Data: 0, Message: error.message })
  }

});

router.post('/getUserMemberShip', async function (req, res) {
  try {
    const { userId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await userMemberShipSchema.aggregate([{
      $match: {
        userId: mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: "memberships",
        localField: "memberShipId",
        foreignField: "_id",
        as: "memberShipDetails",
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

router.post('/updateUserMemberShip', async function (req, res) {
  try {
    const { userMemberId, serviceId, qty } = req.body

    const update = await userMemberShipSchema.aggregate([{
      $match: {
        userId: mongoose.Types.ObjectId(userMemberId)
      }
    }
    ]);

    if (update.length > 0) {
      //     allPriceIs=[]
      //     for(j=0;j<update[0].service.length;j++){
      //       console.log(update[0].service[j].serviceId);
      //     if(update[0].service[j].serviceId.toString() == serviceId){
      //         let priceIsIn={
      //             qty:qty
      //         }
      //         allPriceIs.push(priceIsIn)
      //         console.log(priceIsIn + "1")
      //         console.log(allPriceIs[0] + "2");
      //     }

      //     else{
      //         allPriceIs.push(update[0].service[j])
      //     }
      // }
      let updatePrice = await userMemberShipSchema.findOneAndUpdate(
        { userId: mongoose.Types.ObjectId(userMemberId), "service.serviceId": mongoose.Types.ObjectId(serviceId) },
        { $set: { "service.$.qty": qty } }
        , { new: true });
      // let updatePrice=await userMemberShipSchema.findByIdAndUpdate(userMemberId,allPriceIs,{new:true});

      console.log(updatePrice);
      if (updatePrice != undefined) {
        // let updateIs;
        // updateIs = {
        //     fuelTypeId: fuelTypeId != undefined ? fuelTypeId : update[0].fuelTypeId,
        //     carModelId: carModelId != undefined ? carModelId : update[0].carModelId,
        //     image: img != undefined ? img : update[0].image,
        // }
        //  let updateIss = await carModelFuelSchema.findByIdAndUpdate(carModelFuelId, updateIs,{new:true})
        return res.status(200).json({ IsSuccess: true, Data: [updatePrice], Message: `Updated Data` });
      } else {
        return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
      }
    }
    return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })

  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

//-------------------service category ------------kevil 



router.post('/addNewServiceCategory', async function (req, res) {
  try {
    const { image, categoryName } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/categoryService/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon

    let add = await new serviceCategorySchema({
      categoryName: categoryName,
      icon: img
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

router.post('/getServiceCategory', async function (req, res) {
  try {
    // const {userId} = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceCategorySchema.aggregate([{
      $match: {
        //userId: mongoose.Types.ObjectId(userId)
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

// ---------------Paras Update Service Category --------------------
router.post('/updateServiceCategory', async function (req, res) {
  try {
    const { serviceCategoryId, image, categoryName } = req.body

    const update = await serviceCategorySchema.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(serviceCategoryId)
      }
    }
    ]);

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/carModel/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()


    if (update.length == 1) {
      let updateIs;
      updateIs = {
        icon: img != undefined ? img : update[0].image,
        categoryName: categoryName != undefined ? categoryName : update[0].categoryName,
      }
      let updateIss = await serviceCategorySchema.findByIdAndUpdate(serviceCategoryId, updateIs, { new: true })
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

// --------------------- Paras ----------------------------------
router.post("/deleteServiceCategory", async function (req, res, next) {
  try {
    const { serviceCategoryId } = req.body;

    let deletes = await serviceCategorySchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(serviceCategoryId),
        },
      },
    ]);

    if (deletes.length == 1) {
      let deleteData = await serviceCategorySchema.findByIdAndDelete(serviceCategoryId);
      res
        .status(200)
        .json({ IsSuccess: true, Data: [deleteData], Message: `Deleted Data` });
    } else {
      res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    res.status(500).json({ IsSuccess: false, Message: error.message });
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

// ----------------- Banner --------- kevil ------------


router.post('/addNewBanner', async function (req, res) {
  try {
    const { image } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/banner/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()

    const add = await new bannerSchema({
      image: img
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

// --------------------- Paras ----------------------------------
router.post("/deleteBanner", async function (req, res, next) {
  try {
    const { bannerId } = req.body;

    let deletes = await bannerSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(bannerId),
        },
      },
    ]);

    if (deletes.length == 1) {
      let deleteData = await bannerSchema.findByIdAndDelete(bannerId);
      res
        .status(200)
        .json({ IsSuccess: true, Data: [deleteData], Message: `Deleted Data` });
    } else {
      res.status(200).json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});


router.post('/getUserJobCartApproved', async function (req, res) {
  try {
    //const {categoryId} = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await bookingSchema.aggregate([{
      $match: {
        trackBooking: 2
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

router.post('/getBookingHistory', async function (req, res) {
  try {

    const { status } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderWork.aggregate([{
      $match: {
        workshopStatus: status



      }
    },
    {
      $lookup: {
        from: "bookings",
        localField: "bookingId",
        foreignField: "_id",
        as: "VenderWorkDetails"
      }
    },
    {
      $lookup: {
        from: "venderdetails",
        localField: "venderId",
        foreignField: "_id",
        as: "VenderDetails"
      },
    }

      // },{
      //     $unwind:{
      //       path:"$VenderWorkDetails"
      //     }
      //   },{
      //     
      //   }
      , {
      $project: {
        "VenderWorkDetails.pickupDate": 1,
        "VenderWorkDetails.pickupTime": 1,
        "VenderWorkDetails.name": 1,
        "VenderWorkDetails.phone": 1,
        "VenderWorkDetails._id": 1,
        "VenderDetails.workshopName": 1,
        "dateTime": 1,
        "totalPay": 1
      }
    }

    ]);
    console.log(get)

    if (get.length > 0) {
      return res.status(200).json({ IsSuccess: true, count: get.length, Data: get.reverse(), Message: " Data Found" })
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: "No Data Found" })
    }


  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});


router.post('/UpdateVenderAssenWork', async function (req, res) {
  try {
    const { venderWorkId, venderId } = req.body

    const update = await venderWork.aggregate([{
      $match: {
        _id: mongoose.Types.ObjectId(venderWorkId)
      }
    }
    ]);
    // service image 

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        venderId: venderId != undefined ? venderId : update[0].venderId
      }
      let updateIss = await venderWork.findByIdAndUpdate(venderWorkId, updateIs, { new: true })
      const venderNotifications = await new venderNotification({
        title: "New Vender Work",
        image: "uploads/notificationIcon/Group18.png",
        description: "New Work Comming",
        date: getCurrentDateTime(),
        venderId: venderId
      })
      if (venderNotifications != null) {
        await venderNotifications.save()
      }
      return res.status(200).json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res.status(200).json({ IsSuccess: true, Data: [], Message: 'Not Found' })
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message })
  }
});

router.post('/getAllDataByServiceStatus', async function (req, res) {
  try {
    const { serviceStatus } = req.body
    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await venderWork.aggregate([{
      $match: {
        serviceStatus: serviceStatus
      }
    },
    {
      $lookup: {
        from: "bookings",
        localField: "bookingId",
        foreignField: "_id",
        as: "VenderWorkDetails"
      }
    },
    {
      $lookup: {
        from: "venderdetails",
        localField: "venderId",
        foreignField: "_id",
        as: "VenderDetails"
      },
    }

      // },{
      //     $unwind:{
      //       path:"$VenderWorkDetails"
      //     }
      //   },{
      //     
      //   }
      , {
      $project: {
        "VenderWorkDetails.pickupDate": 1,
        "VenderWorkDetails.pickupTime": 1,
        "VenderWorkDetails.name": 1,
        "VenderWorkDetails.phone": 1,
        "VenderWorkDetails._id": 1,

        "VenderDetails.workshopName": 1
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

router.post('/getAllBanner', async function (req, res) {
  try {

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await bannerSchema.aggregate([{
      $match: {

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

//---------- subcategory service -----------------kevil

router.post('/addNewServiceSubCategory', async function (req, res) {
  try {
    const { image, subCategotyName, categoryId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    // service image 
    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach(dateIs => {
          const path = "uploads/subCatgeoryService/" + Date.now() + ".png"
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop()
    // service icon

    let add = await new subCategoryServiceSchema({
      subCategotyName: subCategotyName,
      categoryId: categoryId,
      icon: img
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

router.post('/getServiceSubCategoryWithCategoryId', async function (req, res) {
  try {
    const { categoryId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema2.aggregate([{
      $match: {
        subCategoryId: mongoose.Types.ObjectId(categoryId)
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

router.post('/getServiceSubCategoryDashBord', async function (req, res) {
  try {
    const { categoryId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema2.aggregate([{
      $match: {
        subCategoryId: mongoose.Types.ObjectId(categoryId)
      }
    }, {
      $project: {
        "title": 1,
        "icon": 1,
        "mrp": 1,
        "currentMrp": 1,
        "discount": 1
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

router.post('/getServiceWithSubCategoryId', async function (req, res) {
  try {
    const { subCategoryId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceSchema2.aggregate([{
      $match: {
        subCategoryId: mongoose.Types.ObjectId(subCategoryId)
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



// ---------------------------------- Paras ------------------------------------
router.post('/getSubCategoryByCarmodelId_v5', async function (req, res) {
  try {
    // const { categoryId, carModelId, fuelTypeId } = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    let stringObjectIdArray = req.body.carModelId
    let carModelIdObjectIdArray = stringObjectIdArray.map(mongoose.Types.ObjectId);

    let stringObjectIdArray2 = req.body.fuelTypeId
    let fuelTypeIdObjectIdArray = stringObjectIdArray2.map(mongoose.Types.ObjectId);


    // const get = await serviceSchema2.aggregate([{
    //   $match: {
    //     $and: [
    //       {
    //         subCategoryId: mongoose.Types.ObjectId(categoryId)
    //       },
    //       {
    //         carModelId: mongoose.Types.ObjectId(carModelId)
    //       },
    //       {
    //         carFualTypeId: mongoose.Types.ObjectId(fuelTypeId)
    //       },
    //     ]
    //   }
    // },
    //   // {
    //   //   $project: {
    //   //     "title": 1,
    //   //     "icon": 1,
    //   //     "mrp": 1,
    //   //     "currentMrp": 1,
    //   //     "discount": 1
    //   //   }
    //   // }
    // ]);


    const get = await serviceSchema2.aggregate([
      {
        '$match': {
          '$and': [
            {
              'carModelId': {
                '$in': carModelIdObjectIdArray
              },
              'carFualTypeId': {
                '$in': fuelTypeIdObjectIdArray
              },
              'subCategoryId': mongoose.Types.ObjectId(req.body.categoryId)
            }
          ]
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


router.post('/getServiceCategory', async function (req, res) {
  try {
    // const {userId} = req.body

    let authToken = req.headers['authorization'];

    if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
      return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    }

    const get = await serviceCategorySchema.aggregate([{
      $match: {
        //userId: mongoose.Types.ObjectId(userId)
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

// =============== car Brand --------------------

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/carBrand");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



const uploadXLSXA = async (req, res, next) => {
  try {
    console.log(req.file.path)
    let path = req.file.path;
    var workbook = xlsx.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "xml sheet has no data",
      });
    }
    let savedData = await Lead.create(jsonData);
    console.log(jsonData)

    for (let i = 0; i < jsonData.length; i++) {
      let addNewCarBrand = await new carBrandSchema({
        image: jsonData[i].image,
        brandName: jsonData[i].brandName

      });
      await addNewCarBrand.save()
    }

    return res.status(201).json({
      success: true,
      message: savedData.length + " rows added to the database",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

router.post("/uploadCarBrand", upload.single("xlsx"), uploadXLSXA);

//----------------car model------------------

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/carModel");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage });



const uploadXLSXAs = async (req, res, next) => {
  try {
    console.log(req.file.path)
    let path = req.file.path;
    var workbook = xlsx.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "xml sheet has no data",
      });
    }
    let savedData = await Lead.create(jsonData);
    console.log(jsonData.length)


    for (let i = 0; i < jsonData.length; i++) {
      //console.log(jsonData)
      console.log(jsonData[i].petrlod + " petrol")
      console.log(jsonData[i].cng + " cng")
      console.log(jsonData[i].desial + " diesel")
      let addNewCarBrand = await new carModelSchema({

        carBrandId: jsonData[i].BrandName,
        modelName: jsonData[i].modelName,
        image: jsonData[i].image,
        carTypeId: jsonData[i].CarType

      });
      // await addNewCarBrand.save()
    }

    return res.status(201).json({
      success: true,
      message: savedData.length + " rows added to the database",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

router.post("/uploadCarModel", upload.single("xlsx"), uploadXLSXAs);

//==========================================

//-----------------car fuletype----------------

const uploadXLCARFUEL = async (req, res, next) => {
  try {
    console.log(req.file.path)
    let path = req.file.path;
    var workbook = xlsx.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "xml sheet has no data",
      });
    }
    let savedData = await Lead.create(jsonData);
    console.log(jsonData.length)


    for (let i = 0; i < jsonData.length; i++) {
      console.log(jsonData)
      console.log(jsonData[i].petrol + " petrol")
      console.log(jsonData[i].cng + " CNG")
      console.log(jsonData[i].diesel + " diesel")
      console.log(jsonData[i].ev + " ev")
      console.log(jsonData[i].modelName + " modelName")

      const get = await carModelSchema.aggregate([{
        $match: {
          _id: mongoose.Types.ObjectId(jsonData[i].modelName)
        }
      }
      ]);

      if (jsonData[i].petrol == undefined) {

      } else {



        let addNewCarBrand = await new carModelFuelSchema({

          carModelId: jsonData[i].modelName,
          fuelTypeId: jsonData[i].petrol,
          image: get[0].image
        });
        await addNewCarBrand.save()
      }

      if (jsonData[i].cng === undefined) {

      } else {



        let addNewCarBrand = await new carModelFuelSchema({

          carModelId: jsonData[i].modelName,
          fuelTypeId: jsonData[i].cng,
          image: get[0].image
        });
        await addNewCarBrand.save()
      }

      if (jsonData[i].diesel == undefined) {

      } else {

        let addNewCarBrand = await new carModelFuelSchema({

          carModelId: jsonData[i].modelName,
          fuelTypeId: jsonData[i].diesel,
          image: get[0].image
        });
        await addNewCarBrand.save()
      }

      if (jsonData[i].ev == undefined) {

      } else {

        let addNewCarBrand = await new carModelFuelSchema({

          carModelId: jsonData[i].modelName,
          fuelTypeId: jsonData[i].ev,
          image: get[0].image
        });
        await addNewCarBrand.save()

      }
    }

    return res.status(201).json({
      success: true,
      message: savedData.length + " rows added to the database",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

router.post("/uploadCarModelFuel", upload.single("xlsx"), uploadXLCARFUEL);

//--------Function ----------kevil -----

function getUserCodeNumber() {
  let generateNo = "RM-" + Math.random().toFixed(6).split(".")[1];
  return generateNo;
}
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

var x = 2; //or whatever offset 
var CurrentDate = new Date();
CurrentDate.setMonth(CurrentDate.getMonth() + x);

console.log(CurrentDate)

module.exports = router;
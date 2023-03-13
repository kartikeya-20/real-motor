var express = require("express");
var router = express.Router();
require("dotenv").config();
const config = require("../config");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
var nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
var randomstring = require("randomstring");
const cron = require("node-cron");
var bannerSchema = require("../models/banner");
var noBoardingSchema = require("../models/noBoarding");
var userDetailsSchema = require("../models/userDetails");
const favoriteSchema = require("../models/favorite");
const addToCartSchema = require("../models/addToCart");
const addToCartSchema2 = require("../models/addToCart2");
const referralAndEarnSchema = require("../models/referralAndEarn");
const bookingSchema = require("../models/booking");
const trackBookingSchema = require("../models/trackBooking");
const notificationSchema = require("../models/notification");
const carBrandSchema = require("../models/carBrand");
const userCarsSchema = require("../models/userCars");
// const userCarsSchema2 = require("../models/userCars2");
const carModelSchema = require("../models/carModel");
const carModelFuelSchema = require("../models/carModelFuel");
const discountCouponSchema = require("../models/discountCoupon");
const couponUseSchema = require("../models/couponUse");
const carTypeSchema = require("../models/carType");
const fuelTypeSchema = require("../models/fuelType");
const serviceSchema = require("../models/service");
const serviceSchema2 = require("../models/service2");
const conformCartSchema = require("../models/conformCart");
const settingSchema = require("../models/setting");
const walletSchema = require("../models/wallet");
const userMemberShipSchema = require("../models/userMemberShip");
const memberShipSchema = require("../models/memberShip");
const userSOSchema = require("../models/userSOS");
const venderSOSchema = require("../models/venderSOS");
const { title } = require("process");
const { get } = require("http");
const referralAndEarn = require("../models/referralAndEarn");
var FCM = require("fcm-node");
const notification = require("../models/notification");
const userMemberShip = require("../models/userMemberShip");
const addressSchema = require("../models/address");
const serviceCategorySchema = require("../models/serviceCategory");
const adminAscend = require("../models/adminAscend");
const subCategoryServiceSchema = require("../models/subCatgeoryService");
const { Console } = require("console");
const exp = require("constants");
const memberShipService = require("../models/memberShipService");
const venderWork = require("../models/venderWork");
const venderSchema = require("../models/venderSchema");
const venderNotification = require("../models/venderNotification");
const sosSchema = require("../models/sos");
const jobCart = require("../models/jobCartV5");
const feedBackSchema = require("../models/feedBack");
// const callingSchema = require("../models/callingModel");
/* GET users listing. */

//---------- Multer Image ----- kevil---------

var noBoarding = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/noBoarding");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadnoBoarding = multer({ storage: noBoarding });

var userImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/userImage");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadUserImage = multer({ storage: userImage });

var bannerImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/banner");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadBanner = multer({ storage: bannerImage });

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//------Notification------------kevil -----------
var FCM = require("fcm-node");
const { weekdays } = require("moment-timezone");
const { stat } = require("fs/promises");
var serverKey =
  "AAAA3pER8QA:APA91bGj9ZLwI3BQHzN5NDMlVxJww7fQKWgJGBFZ4tG8ByW0zbUFg8cQYpwzkdFE2T2etuzP9YV4O7BGATjbIGrzaSQQFT1ayK_uheqDoOWt4k4o8AVRPRGiH7TJWASnfJbBv3gAPDX0";
var fcm = new FCM(serverKey);

//--------------Notification ---------------kevil --------

router.post("/Notifications", async function (req, res) {
  try {
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

    var message = {
      to: "fpiUM6pURaSvMXS-wUm-yg:APA91bE9SYSS99EA5O7iD0g6DF-2ECO88QZPo0ViAnVKzlQU87hUM17u_SGw6gISGAFgb5DZyFgzh5AsaZZc_0fLGNSKOVdBVetFLjJpmBUrMYnyVGGn2XrZK-GGzgnrR-qiMmDIBytr",
      notification: {
        title: "kevil",
        body: "Real Motors",
      },

      // data: { //you can send only notification or only data(or include both)
      //     title: 'ok cdfsdsdfsd',
      //     body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
      // }
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!" + err);
        console.log("Respponse:! " + response);
      } else {
        // showToast("Successfully sent with response");
        console.log("Successfully sent with response: ", response);
      }
    });

    // return res.status(200).json({ IsSuccess: true, Message:" Data Found"})
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//----------------SOS ------------------KEVIL----------

router.post("/addNewUserSOS", async function (req, res) {
  try {
    const {
      userId,
      sosId,
      lat,
      long,
      amount,
      razorePayOrderId,
      razorePayPaymentId,
    } = req.body;

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

    // service image
    // service icon
    const getsss = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    if (getsss.length < 0) {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "User Not Found" });
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

    console.log("Vendor Details" + gets);
    var data = [];
    var km = [];
    var vernderData = [];
    for (let i = 0; i < gets.length; i++) {
      getAll = distances(
        parseInt(lat),
        parseInt(gets[i].lat),
        parseInt(long),
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
    console.log(data.length);
    for (let j = 0; j < data.length; j++) {
      console.log(data[j]);
      km.push(data[j].getKm);
      km.sort(function (a, b) {
        return a - b;
      });
      console.log(km);
    }
    console.log(km[0]);
    var getVenderId;
    for (let i = 0; i < data.length; i++) {
      if (km[0] == data[i].getKm) {
        getVenderId = data[i].workshopId;
      } else {
        console.log("no found");
      }
    }

    let add = await new userSOSchema({
      userId: userId,
      sosId: sosId,
      lat: lat,
      long: long,
      phone: getsss[0].phoneNo,
      dateTime: getCurrentDateTimes(),
      venderId: getVenderId,
      amount: amount,
      razorePayOrderId: razorePayOrderId,
      razorePayPaymentId: razorePayPaymentId,
    });

    if (add != null) {
      await add.save();

      let adds = await new venderSOSchema({
        userId: userId,
        sosId: sosId,
        dateTime: getCurrentDateTimes(),
        venderId: getVenderId,
      });

      if (adds != null) {
        await adds.save();
      }

      // -----------------------------Paras ---------------------------
      for (let index = 0; index < getsss.length; index++) {
        const userFcm = getsss[index];

        // console.log(userFcm);
        const addNotification = await new notificationSchema({
          userId: userId,
          title: "Your SOS emergency submitted sucessfully",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/Group18.png",
        });

        if (addNotification != null) {
          await addNotification.save();
          var message = {
            to: userFcm.fcm,
            notification: {
              title: "Your SOS emergency submitted sucessfully",
            },
            // data: { //you can send only notification or only data(or include both)
            //     title: 'ok cdfsdsdfsd',
            //     body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
            // }
          };
          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!" + err);
              console.log("Respponse:! " + response);
            } else {
              // showToast("Successfully sent with response");
              console.log("Successfully sent with response: ", response);
            }
          });
        } else {
          console.log("Error");
        }
      }
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

router.post("/getSOS", async function (req, res) {
  try {
    const { sosId } = req.body;
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

    const get = await sosSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(sosId),
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

router.post("/getJobCartWithUserId", async function (req, res) {
  try {
    const { userId, status } = req.body;
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

    const get = await jobCart.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              jobCartStatus: status,
            },
          ],
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

router.post("/UpdateUserSOS", async function (req, res) {
  try {
    const { userSOSId, venderId } = req.body;

    const update = await userSOSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userSOSId),
        },
      },
    ]);

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        venderId: venderId != undefined ? venderId : update[0].venderId,
      };
      let updateIss = await userSOSchema.findByIdAndUpdate(
        userSOSId,
        updateIs,
        { new: true }
      );
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//----------------- NoBoarding ----------- kevil -------------

router.post("/addNewNoBoarding", async function (req, res) {
  try {
    const { title, description, image } = req.body;

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

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach((dateIs) => {
          const path = "uploads/noBoarding/" + Date.now() + ".png";
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, "");
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop();

    const file = req.file;
    let add = await new noBoardingSchema({
      title: title,
      image: img,
      description: description,
    });

    if (add != null) {
      await add.save();
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

router.post("/getAllNoBoarding", async function (req, res) {
  try {
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

    const get = await noBoardingSchema.aggregate([
      {
        $match: {},
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

//------------ notification -------------kevil -----------

router.post("/getAllNotification", async function (req, res) {
  try {
    const { userId } = req.body;

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

    const get = await notificationSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
    ]);
    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get.reverse(),
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

//------------wallet ----------------kevil --------------

router.post("/getUserWallet", async function (req, res) {
  try {
    const { userId } = req.body;

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

    const gets = await walletSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 0 }],
        },
      },
    ]);
    var paidAmount = 0;
    for (let i = 0; i < gets.length; i++) {
      console.log(get[i].amount);
      paidAmount += parseInt(get[i].amount);
    }

    const getss = await walletSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 1 }],
        },
      },
    ]);
    var receivedAmount = 0;
    for (let i = 0; i < getss.length; i++) {
      console.log(get[i].amount);
      receivedAmount += parseInt(get[i].amount);
    }

    const getsss = await walletSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 2 }],
        },
      },
    ]);
    var cashbackAmount = 0;
    for (let i = 0; i < getsss.length; i++) {
      console.log(get[i].amount);
      cashbackAmount += parseInt(get[i].amount);
    }

    finalAmount = cashbackAmount + receivedAmount - paidAmount;

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        walletAmount: finalAmount.toString(),
        Data: get.reverse(),
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

router.post("/getUserWalletStatus", async function (req, res) {
  try {
    const { userId, status } = req.body;

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

    if (status == 3) {
      const get = await walletSchema.aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(userId),
          },
        },
      ]);

      const gets = await walletSchema.aggregate([
        {
          $match: {
            $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 0 }],
          },
        },
      ]);
      var paidAmount = 0;
      for (let i = 0; i < gets.length; i++) {
        console.log(gets[i].amount);
        paidAmount += parseInt(gets[i].amount);
      }

      const getss = await walletSchema.aggregate([
        {
          $match: {
            $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 1 }],
          },
        },
      ]);
      var receivedAmount = 0;
      for (let i = 0; i < getss.length; i++) {
        console.log(getss[i].amount);
        receivedAmount += parseInt(getss[i].amount);
      }

      const getsss = await walletSchema.aggregate([
        {
          $match: {
            $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 2 }],
          },
        },
      ]);
      var cashbackAmount = 0;
      for (let i = 0; i < getsss.length; i++) {
        console.log(getsss[i].amount);
        cashbackAmount += parseInt(getsss[i].amount);
      }

      finalAmount = cashbackAmount + receivedAmount - paidAmount;
      if (get.length > 0) {
        return res.status(200).json({
          IsSuccess: true,
          count: get.length,
          walletAmount: finalAmount.toString(),
          Data: get.reverse(),
          Message: " Data Found",
        });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], Message: "No Data Found" });
      }
    } else {
      const get = await walletSchema.aggregate([
        {
          $match: {
            $and: [
              { userId: mongoose.Types.ObjectId(userId) },
              { status: status },
            ],
          },
        },
      ]);

      const gets = await walletSchema.aggregate([
        {
          $match: {
            $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 0 }],
          },
        },
      ]);
      var paidAmount = 0;
      for (let i = 0; i < gets.length; i++) {
        console.log(gets[i].amount);
        paidAmount += parseInt(gets[i].amount);
      }

      const getss = await walletSchema.aggregate([
        {
          $match: {
            $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 1 }],
          },
        },
      ]);
      var receivedAmount = 0;
      for (let i = 0; i < getss.length; i++) {
        console.log(getss[i].amount);
        receivedAmount += parseInt(getss[i].amount);
      }

      const getsss = await walletSchema.aggregate([
        {
          $match: {
            $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 2 }],
          },
        },
      ]);
      var cashbackAmount = 0;
      for (let i = 0; i < getsss.length; i++) {
        console.log(getsss[i].amount);
        cashbackAmount += parseInt(getsss[i].amount);
      }

      finalAmount = cashbackAmount + receivedAmount - paidAmount;
      if (get.length > 0) {
        return res.status(200).json({
          IsSuccess: true,
          count: get.length,
          walletAmount: finalAmount.toString(),
          Data: get.reverse(),
          Message: " Data Found",
        });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], Message: "No Data Found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/addNewWallet", async function (req, res) {
  try {
    const { userId, status, title, description, amount } = req.body;

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

    const add = await new walletSchema({
      userId: userId,
      status: status,
      title: title,
      description: description,
      amount: amount,
      dateTime: getCurrentDateTimes(),
    });

    if (add != null) {
      await add.save();
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

//-----------------User Details ----- kevil -----------------

// router.post("/signup", async function (req, res) {
//   try {
//     const {
//       name,
//       phoneNo,
//       email,
//       password,
//       randomNo,
//       address,
//       wallet,
//       lat,
//       long,
//       image,
//       fcm,
//       gender,
//       dob,
//       referralCode,
//     } = req.body;

//     let authToken = req.headers["authorization"];

//     if (
//       authToken != config.tockenIs ||
//       authToken == null ||
//       authToken == undefined
//     ) {
//       return res.status(200).json({
//         IsSuccess: false,
//         Data: [],
//         Message: "You are not authenticated",
//       });
//     }

//     let imagePath = [];
//     if (image != undefined && image != null && image != [] && image != "") {
//       if (image.length > 0) {
//         let listStringToBase64 = image.split(",");
//         listStringToBase64.forEach((dateIs) => {
//           const path = "uploads/userImage/" + Date.now() + ".png";
//           const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, "");
//           fs.writeFileSync(path, base64Date, { encoding: "base64" });
//           imagePath.push(path);
//         });
//       }
//     }
//     img = imagePath.pop();
//     console.log("1");
//     const get = await userDetailsSchema.aggregate([
//       {
//         $match: {
//           phoneNo: phoneNo,
//         },
//       },
//     ]);
//     console.log(get);
//     if (get.length >= 1) {
//       console.log(get);
//       let updateIs;
//       updateIs = {
//         name: name != undefined ? name : get[0].name,
//         phoneNo: phoneNo != undefined ? phoneNo : get[0].phoneNo,
//         email: email != undefined ? email : get[0].email,
//         password: password != undefined ? password : get[0].password,
//         lat: lat != undefined ? lat : get[0].lat,
//         long: long != undefined ? long : get[0].long,
//         fcm: fcm != undefined ? fcm : get[0].fcm,
//         dob: dob != undefined ? dob : get[0].dob,
//         gender: gender != undefined ? gender : get[0].gender,
//         image: image != undefined ? img : get[0].image,
//         address: address != undefined ? address : get[0].address,
//       };
//       let updateIss = await userDetailsSchema.findByIdAndUpdate(
//         get[0]._id,
//         updateIs,
//         { new: true }
//       );

//       return res
//         .status(200)
//         .json({ IsSuccess: true, Data: [updateIss], Message: "alredy Data" });
//     }
//     console.log("");
//     var names = "RealMotors";
//     let addData = await new userDetailsSchema({
//       // name: name,
//       phoneNo: phoneNo,
//       // email: email,
//       address: address,
//       randomNo: referalCode(names),
//       // wallet: wallet,
//       lat: lat,
//       long: long,
//       dob: dob,
//       gender: gender,
//       image: img,
//       fcm: fcm,
//       isOnCall: false,
//     });
//     console.log("2");
//     if (addData != null) {
//       await addData.save();
//       console.log("3");

//       if (
//         referralCode != "" &&
//         referralCode != undefined &&
//         referralCode != null
//       ) {
//         const file = req.file;
//         const setting = await settingSchema.aggregate([
//           {
//             $match: {},
//           },
//         ]);

//         console.log(setting);

//         const user = await userDetailsSchema.aggregate([
//           {
//             $match: {
//               _id: mongoose.Types.ObjectId(addData._id),
//             },
//           },
//         ]);

//         if (user[0].randomNo == referralCode) {
//           return res.status(200).json({
//             IsSuccess: true,
//             Data: [],
//             Message: "your number and referral number are same",
//           });
//         }

//         const get = await userDetailsSchema.aggregate([
//           {
//             $match: {
//               randomNo: referralCode,
//             },
//           },
//         ]);

//         const users = await referralAndEarnSchema.aggregate([
//           {
//             $match: {
//               userCode: user[0].randomNo,
//             },
//           },
//         ]);
//         console.log(users);

//         const refferal = await referralAndEarnSchema.aggregate([
//           {
//             $match: {
//               referralCode: referralCode,
//             },
//           },
//         ]);
//         console.log(refferal.length);

//         if (users.length >= 1 && refferal.length >= 1) {
//           console.log("11");
//           return res
//             .status(200)
//             .json({ IsSuccess: true, Data: [], Message: "Already Use" });
//         } else if (users.length == 0 && refferal.length >= 1) {
//           console.log("22");
//           total =
//             parseInt(parseInt(user[0].refferalPoint)) +
//             parseInt(setting[0].userCode);

//           let updateIs;
//           updateIs = {
//             refferalPoint: total.toString(),
//           };

//           let updateIss = await userDetailsSchema.findByIdAndUpdate(
//             user[0]._id,
//             updateIs
//           );
//           //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

//           const add = await new referralAndEarnSchema({
//             userCode: user[0].randomNo,
//             referralCode: referralCode,
//           });

//           if (add != null) {
//             await add.save();
//             console.log(add);
//             const adds = await new referralAndEarnSchema({
//               userCode: add.referralCode,
//               referralCode: add.userCode,
//             });

//             const gets = await userDetailsSchema.aggregate([
//               {
//                 $match: {
//                   $and: [{ randomNo: add.referralCode }],
//                 },
//               },
//             ]);
//             total =
//               parseInt(parseInt(gets[0].refferalPoint)) +
//               parseInt(setting[0].referralCode);

//             let updateIs;
//             updateIs = {
//               refferalPoint: total.toString(),
//             };

//             let updateIss = await userDetailsSchema.findByIdAndUpdate(
//               gets[0]._id,
//               updateIs
//             );
//             if (adds != null) {
//               await adds.save();

//               console.log(adds.userCode);
//               console.log(adds.referralCode);

//               const user = await userDetailsSchema.aggregate([
//                 {
//                   $match: {
//                     $and: [{ randomNo: adds.userCode }],
//                   },
//                 },
//               ]);

//               const referal = await userDetailsSchema.aggregate([
//                 {
//                   $match: {
//                     $and: [{ randomNo: adds.referralCode }],
//                   },
//                 },
//               ]);

//               const userAdd = await new walletSchema({
//                 userId: user[0]._id,
//                 status: 2,
//                 title: "Refferal Point",
//                 default: "Refferal Point",
//                 amount: setting[0].userCode,
//                 dateTime: getCurrentDateTimes(),
//               });
//               if (userAdd != null) {
//                 await userAdd.save();
//                 console.log(userAdd);
//               }

//               const referalAdd = await new walletSchema({
//                 userId: referal[0]._id,
//                 status: 1,
//                 title: "Rereived Refferal Point",
//                 default: "Rereived Refferal Point",
//                 amount: setting[0].referralCode,
//                 dateTime: getCurrentDateTimes(),
//               });
//               if (referalAdd != null) {
//                 await referalAdd.save();
//                 console.log(referalAdd);
//               }

//               console.log("Data Added");
//             } else {
//               console.log("error");
//             }
//             return res.status(200).json({
//               IsSuccess: true,
//               Data: [addData],
//               Message: "Coupon Valid",
//             });
//           } else {
//             return res
//               .status(200)
//               .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
//           }
//         } else if (users.length >= 1 && refferal.length == 0) {
//           console.log("33");
//           total =
//             parseInt(parseInt(user[0].refferalPoint)) +
//             parseInt(setting[0].referralCode);

//           let updateIs;
//           updateIs = {
//             refferalPoint: total.toString(),
//           };

//           let updateIss = await userDetailsSchema.findByIdAndUpdate(
//             user[0]._id,
//             updateIs
//           );
//           //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

//           const add = await new referralAndEarnSchema({
//             userCode: user[0].randomNo,
//             referralCode: referralCode,
//           });

//           if (add != null) {
//             await add.save();
//             console.log(add);
//             const adds = await new referralAndEarnSchema({
//               userCode: add.referralCode,
//               referralCode: add.userCode,
//             });

//             const gets = await userDetailsSchema.aggregate([
//               {
//                 $match: {
//                   $and: [{ randomNo: add.referralCode }],
//                 },
//               },
//             ]);
//             total =
//               parseInt(parseInt(gets[0].refferalPoint)) +
//               parseInt(setting[0].userCode);

//             let updateIs;
//             updateIs = {
//               refferalPoint: total.toString(),
//             };

//             let updateIss = await userDetailsSchema.findByIdAndUpdate(
//               gets[0]._id,
//               updateIs
//             );
//             if (adds != null) {
//               await adds.save();
//               const user = await userDetailsSchema.aggregate([
//                 {
//                   $match: {
//                     $and: [{ randomNo: adds.userCode }],
//                   },
//                 },
//               ]);

//               const referal = await userDetailsSchema.aggregate([
//                 {
//                   $match: {
//                     $and: [{ randomNo: adds.referralCode }],
//                   },
//                 },
//               ]);

//               const userAdd = await new walletSchema({
//                 userId: user[0]._id,
//                 status: 2,
//                 title: "Refferal Point",
//                 default: "Refferal Point",
//                 amount: setting[0].userCode,
//                 dateTime: getCurrentDateTimes(),
//               });
//               if (userAdd != null) {
//                 await userAdd.save();
//                 console.log(userAdd);
//               }

//               const referalAdd = await new walletSchema({
//                 userId: referal[0]._id,
//                 status: 2,
//                 title: "Refferal Point",
//                 default: "Refferal Point",
//                 amount: setting[0].referralCode,
//                 dateTime: getCurrentDateTimes(),
//               });
//               if (referalAdd != null) {
//                 await referalAdd.save();
//                 console.log(referalAdd);
//               }

//               console.log("Data Added");
//             } else {
//               console.log("error");
//             }
//             return res.status(200).json({
//               IsSuccess: true,
//               Data: [addData],
//               Message: "Coupon Valid",
//             });
//           } else {
//             return res
//               .status(200)
//               .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
//           }
//         } else if (users.length == 0 && refferal.length == 0) {
//           console.log("0 0 ");
//           total =
//             parseInt(user[0].refferalPoint) + parseInt(setting[0].userCode);
//           console.log("1");
//           let updateIs;
//           updateIs = {
//             refferalPoint: total.toString(),
//           };

//           let updateIss = await userDetailsSchema.findByIdAndUpdate(
//             user[0]._id,
//             updateIs
//           );
//           //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

//           const add = await new referralAndEarnSchema({
//             userCode: user[0].randomNo,
//             referralCode: referralCode,
//           });

//           if (add != null) {
//             await add.save();
//             console.log(add);
//             const adds = await new referralAndEarnSchema({
//               userCode: add.referralCode,
//               referralCode: add.userCode,
//             });

//             const gets = await userDetailsSchema.aggregate([
//               {
//                 $match: {
//                   $and: [{ randomNo: add.referralCode }],
//                 },
//               },
//             ]);
//             total =
//               parseInt(gets[0].refferalPoint) +
//               parseInt(setting[0].referalCode);

//             let updateIs;
//             updateIs = {
//               refferalPoint: total.toString(),
//             };

//             let updateIss = await userDetailsSchema.findByIdAndUpdate(
//               gets[0]._id,
//               updateIs
//             );
//             if (adds != null) {
//               await adds.save();
//               console.log(adds);
//               const user = await userDetailsSchema.aggregate([
//                 {
//                   $match: {
//                     $and: [{ randomNo: adds.userCode }],
//                   },
//                 },
//               ]);

//               const referal = await userDetailsSchema.aggregate([
//                 {
//                   $match: {
//                     $and: [{ randomNo: adds.referralCode }],
//                   },
//                 },
//               ]);

//               const userAdd = await new walletSchema({
//                 userId: user[0]._id,
//                 status: 2,
//                 title: "Refferal Point",
//                 default: "Refferal Point",
//                 amount: setting[0].userCode,
//                 dateTime: getCurrentDateTimes(),
//               });
//               if (userAdd != null) {
//                 await userAdd.save();
//                 console.log(userAdd);
//               }

//               const referalAdd = await new walletSchema({
//                 userId: referal[0]._id,
//                 status: 2,
//                 title: "Refferal Point",
//                 default: "Refferal Point",
//                 amount: setting[0].referralCode,
//                 dateTime: getCurrentDateTimes(),
//               });
//               if (referalAdd != null) {
//                 await referalAdd.save();
//                 console.log(referalAdd);
//               }

//               console.log("Data Added");
//             } else {
//               console.log("error");
//             }

//             return res.status(200).json({
//               IsSuccess: true,
//               Data: [addData],
//               Message: "Coupon Valid",
//             });
//           } else {
//             return res
//               .status(200)
//               .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
//           }
//         }
//       } else {
//       }

//       return res
//         .status(200)
//         .json({ IsSuccess: true, Data: [addData], Message: "Added Data" });
//     } else {
//       return res
//         .status(200)
//         .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ IsSuccess: false, Data: 0, Message: error.message });
//   }
// });

router.post("/signup", async function (req, res) {
  try {
    const {
      name,
      phoneNo,
      email,
      password,
      randomNo,
      address,
      wallet,
      lat,
      long,
      image,
      fcm,
      gender,
      dob,
      referralCode,
    } = req.body;

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

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach((dateIs) => {
          const path = "uploads/userImage/" + Date.now() + ".png";
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, "");
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop();
    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          phoneNo: phoneNo,
        },
      },
    ]);
    console.log(get);
    if (get.length >= 1) {
      console.log(get);
      let updateIs;
      updateIs = {
        name: name != undefined ? name : get[0].name,
        phoneNo: phoneNo != undefined ? phoneNo : get[0].phoneNo,
        email: email != undefined ? email : get[0].email,
        password: password != undefined ? password : get[0].password,
        lat: lat != undefined ? lat : get[0].lat,
        long: long != undefined ? long : get[0].long,
        fcm: fcm != undefined ? fcm : get[0].fcm,
        dob: dob != undefined ? dob : get[0].dob,
        gender: gender != undefined ? gender : get[0].gender,
        image: image != undefined ? img : get[0].image,
        address: address != undefined ? address : get[0].address,
      };
      let updateIss = await userDetailsSchema.findByIdAndUpdate(
        get[0]._id,
        updateIs,
        { new: true }
      );
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [updateIss], Message: "alredy Data" });
    }
    // console.log("");
    var names = "RealMotors";
    let addData = await new userDetailsSchema({
      // name: name,
      phoneNo: phoneNo,
      // email: email,
      address: address,
      randomNo: referalCode(names),
      // wallet: wallet,
      lat: lat,
      long: long,
      dob: dob,
      gender: gender,
      image: img,
      fcm: fcm,
      isOnCall: false,
    });
    // console.log("2");
    if (addData != null) {
      await addData.save();
      // console.log("3");
      console.log("referalCode", referalCode);
      if (
        referralCode != "" &&
        referralCode != undefined &&
        referralCode != null
      ) {
        const file = req.file;
        const setting = await settingSchema.aggregate([
          {
            $match: {},
          },
        ]);
        console.log("setting", setting);

        const user = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(addData._id),
            },
          },
        ]);

        if (user[0].randomNo == referralCode) {
          return res.status(200).json({
            IsSuccess: true,
            Data: [],
            Message: "your number and referral number are same",
          });
        }

        const get = await userDetailsSchema.aggregate([
          {
            $match: {
              randomNo: referralCode,
            },
          },
        ]);

        const users = await referralAndEarnSchema.aggregate([
          {
            $match: {
              userCode: user[0].randomNo,
            },
          },
        ]);
        console.log("Users Check RandomNo", users);

        const refferal = await referralAndEarnSchema.aggregate([
          {
            $match: {
              referralCode: referralCode,
            },
          },
        ]);
        console.log("Refferal Check refferal Code", refferal);
        console.log(refferal.length);

        if (users.length >= 1 && refferal.length >= 1) {
          console.log("11");
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [], Message: "Already Use" });
        } else if (users.length == 0 && refferal.length >= 1) {
          console.log("22");
          total =
            parseInt(parseInt(user[0].refferalPoint)) +
            parseInt(setting[0].userCode);

          console.log("0-1 length hoy tyrre", total);
          let updateIs;
          updateIs = {
            refferalPoint: total.toString(),
          };

          console.log("0-1 update data", updateIs);

          let updateIss = await userDetailsSchema.findByIdAndUpdate(
            user[0]._id,
            updateIs
          );
          //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

          const add = await new referralAndEarnSchema({
            userCode: user[0].randomNo,
            referralCode: referralCode,
          });

          if (add != null) {
            await add.save();
            console.log(add);
            const adds = await new referralAndEarnSchema({
              userCode: add.referralCode,
              referralCode: add.userCode,
            });

            console.log("0-1 add thay", adds);
            const gets = await userDetailsSchema.aggregate([
              {
                $match: {
                  $and: [{ randomNo: add.referralCode }],
                },
              },
            ]);
            total =
              parseInt(parseInt(gets[0].refferalPoint)) +
              parseInt(setting[0].referralCode);

            let updateIs;
            updateIs = {
              refferalPoint: total.toString(),
            };

            let updateIss = await userDetailsSchema.findByIdAndUpdate(
              gets[0]._id,
              updateIs
            );

            if (adds != null) {
              await adds.save();

              console.log("add.usercode : ", adds.userCode);
              console.log("add.usercode : ", adds.referralCode);

              const user = await userDetailsSchema.aggregate([
                {
                  $match: {
                    $and: [{ randomNo: adds.userCode }],
                  },
                },
              ]);

              console.log("0-1 USER", user);
              const referal = await userDetailsSchema.aggregate([
                {
                  $match: {
                    $and: [{ randomNo: adds.referralCode }],
                  },
                },
              ]);
              console.log("Referal match :", referal);

              const userAdd = await new walletSchema({
                userId: user[0]._id,
                status: 2,
                title: "Refferal Point",
                description: "Refferal Point",
                amount: setting[0].userCode,
                dateTime: getCurrentDateTimes(),
              });
              if (userAdd != null) {
                await userAdd.save();
                console.log("userAdd", userAdd);
              }

              const referalAdd = await new walletSchema({
                userId: referal[0]._id,
                status: 1,
                title: "Rereived Refferal Point",
                description: "Rereived Refferal Point",
                amount: setting[0].userCode,
                dateTime: getCurrentDateTimes(),
              });
              if (referalAdd != null) {
                await referalAdd.save();
                console.log("referalAdd", referalAdd);
              }
              console.log("Data Added");
            } else {
              console.log("error");
            }
            return res.status(200).json({
              IsSuccess: true,
              Data: [addData],
              Message: "Coupon Valid",
            });
          } else {
            return res
              .status(200)
              .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
          }
        } else if (users.length >= 1 && refferal.length == 0) {
          console.log("33");
          console.log("User length 1 Refferal length 0 Start");
          total =
            parseInt(parseInt(user[0].refferalPoint)) +
            parseInt(setting[0].referralCode);

          let updateIs;
          updateIs = {
            refferalPoint: total.toString(),
          };
          console.log("1-0 update data", updateIs);

          let updateIss = await userDetailsSchema.findByIdAndUpdate(
            user[0]._id,
            updateIs
          );
          //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

          const add = await new referralAndEarnSchema({
            userCode: user[0].randomNo,
            referralCode: referralCode,
          });

          if (add != null) {
            await add.save();
            console.log(add);
            const adds = await new referralAndEarnSchema({
              userCode: add.referralCode,
              referralCode: add.userCode,
            });

            const gets = await userDetailsSchema.aggregate([
              {
                $match: {
                  $and: [{ randomNo: add.referralCode }],
                },
              },
            ]);
            total =
              parseInt(parseInt(gets[0].refferalPoint)) +
              parseInt(setting[0].userCode);

            let updateIs;
            updateIs = {
              refferalPoint: total.toString(),
            };

            let updateIss = await userDetailsSchema.findByIdAndUpdate(
              gets[0]._id,
              updateIs
            );
            if (adds != null) {
              await adds.save();
              const user = await userDetailsSchema.aggregate([
                {
                  $match: {
                    $and: [{ randomNo: adds.userCode }],
                  },
                },
              ]);

              console.log("user get :", user);

              const referal = await userDetailsSchema.aggregate([
                {
                  $match: {
                    $and: [{ randomNo: adds.referralCode }],
                  },
                },
              ]);

              console.log("referal get :", referal);
              const userAdd = await new walletSchema({
                userId: user[0]._id,
                status: 2,
                title: "Refferal Point",
                description: "Refferal Point",
                amount: setting[0].userCode,
                dateTime: getCurrentDateTimes(),
              });
              if (userAdd != null) {
                await userAdd.save();
                console.log("User Add :", userAdd);
              }
              console.log("User 1 and Refferal 0 :", userAdd);

              const referalAdd = await new walletSchema({
                userId: referal[0]._id,
                status: 2,
                title: "Refferal Point",
                description: "Refferal Point",
                amount: setting[0].referralCode,
                dateTime: getCurrentDateTimes(),
              });
              console.log("User 1 and Refferal 0 :", referalAdd);
              if (referalAdd != null) {
                await referalAdd.save();
                console.log(referalAdd);
              }

              console.log("Data Added");
            } else {
              console.log("error");
            }
            return res.status(200).json({
              IsSuccess: true,
              Data: [addData],
              Message: "Coupon Valid",
            });
          } else {
            return res
              .status(200)
              .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
          }
        } else if (users.length == 0 && refferal.length == 0) {
          console.log("0 0 ");
          total =
            parseInt(parseInt(user[0].refferalPoint)) + parseInt(setting[0].userCode);
          console.log("1 total: ", total);
          console.log("1 totla string: ", total.toString());
          let updateIs;
          updateIs = {
            refferalPoint: total.toString(),
          };

          console.log("0-0 update data", updateIs);

          let updateIss = await userDetailsSchema.findByIdAndUpdate(
            user[0]._id,
            updateIs,
          );

          console.log("0-0 updateIss Data : ", updateIss);
          //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

          const add = await new referralAndEarnSchema({
            userCode: user[0].randomNo,
            referralCode: referralCode,
          });

          if (add != null) {
            await add.save();
            console.log(add);
            const adds = await new referralAndEarnSchema({
              userCode: add.referralCode,
              referralCode: add.userCode,
            });

            const gets = await userDetailsSchema.aggregate([
              {
                $match: {
                  $and: [{ randomNo: add.referralCode }],
                },
              },
            ]);
            console.log("get :", gets);
            console.log("setting :", setting);
            console.log("get 0 index refferalpoint :", gets[0].refferalPoint);
            console.log("get 0 index refferalpoint :", setting[0].userCode);
            total =
              parseInt(gets[0].refferalPoint) + parseInt(setting[0].referralCode);
            console.log("Check total : ", total);
            console.log("Check total : ", total.toString());
            let updateIs;
            updateIs = {
              refferalPoint: total.toString(),
            };

            console.log("updateIs check :", updateIs);
            let updateIss = await userDetailsSchema.findByIdAndUpdate(
              gets[0]._id,
              updateIs,
              { new: true }
            );

            console.log("0-0 Done", updateIss);
            if (adds != null) {
              await adds.save();
              console.log(adds);
              const user = await userDetailsSchema.aggregate([
                {
                  $match: {
                    $and: [{ randomNo: adds.userCode }],
                  },
                },
              ]);

              const referal = await userDetailsSchema.aggregate([
                {
                  $match: {
                    $and: [{ randomNo: adds.referralCode }],
                  },
                },
              ]);

              const userAdd = await new walletSchema({
                userId: user[0]._id,
                status: 2,
                title: "Refferal Point",
                description: "Refferal Point",
                amount: setting[0].userCode,
                dateTime: getCurrentDateTimes(),
              });
              if (userAdd != null) {
                await userAdd.save();
                console.log(userAdd);
              }

              const referalAdd = await new walletSchema({
                userId: referal[0]._id,
                status: 2,
                title: "Refferal Point",
                description: "Refferal Point",
                amount: setting[0].referralCode,
                dateTime: getCurrentDateTimes(),
              });
              if (referalAdd != null) {
                await referalAdd.save();
                console.log(referalAdd);
              }

              console.log("Data Added");
            } else {
              console.log("error");
            }

            return res
              .status(200)
              .json({
                IsSuccess: true,
                Data: [addData],
                Message: "Coupon Valid",
              });
          } else {
            return res
              .status(200)
              .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
          }
        }
      } else {
      }
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [addData], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

router.post("/UpdateUserProfile", async function (req, res) {
  try {
    const {
      userId,
      name,
      phoneNo,
      email,
      address,
      password,
      lat,
      long,
      fcm,
      image,
      dob,
      gender,
    } = req.body;

    const update = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach((dateIs) => {
          const path = "uploads/userImage/" + Date.now() + ".png";
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, "");
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop();

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        name: name != undefined ? name : update[0].name,
        phoneNo: phoneNo != undefined ? phoneNo : update[0].phoneNo,
        email: email != undefined ? email : update[0].email,
        password: password != undefined ? password : update[0].password,
        lat: lat != undefined ? lat : update[0].lat,
        long: long != undefined ? long : update[0].long,
        fcm: fcm != undefined ? fcm : update[0].fcm,
        dob: dob != undefined ? dob : update[0].dob,
        gender: gender != undefined ? gender : update[0].gender,
        image: img != undefined ? img : update[0].img,
        address: address != undefined ? address : update[0].address,
      };
      let updateIss = await userDetailsSchema.findByIdAndUpdate(
        userId,
        updateIs,
        { new: true }
      );
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getUserProfile", async function (req, res) {
  try {
    const { userId } = req.body;

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

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
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

router.post("/getCheckUserProfile", async function (req, res) {
  try {
    const { userId } = req.body;

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

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    console.log(get[0].address.length);
    console.log(get[0].address.length);

    console.log(get[0].email.length);

    console.log(get[0].phoneNo.length);

    if (
      get[0].name.length == 0 ||
      get[0].phoneNo.length == 0 ||
      get[0].email.length == 0 ||
      get[0].address.length == 0
    ) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get,
        Message: "please fill all details",
      });
    } else {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get,
        Message: "All details successfully add",
      });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getAllUserProfile", async function (req, res) {
  try {
    let authToken = req.headers["authorization"];

    // if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
    //     return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
    // }

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          // _id: mongoose.Types.ObjectId(userId)
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

router.post("/deleteUserProfile", async function (req, res, next) {
  try {
    const { userId } = req.body;

    let deletes = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    if (deletes.length == 1) {
      let deleteData = await userDetailsSchema.findByIdAndDelete(userId);
      res
        .status(200)
        .json({ IsSuccess: true, Data: deleteData, Message: `Deleted Data` });
    } else {
      res.status(200).json({ IsSuccess: true, Data: 0, Message: "No Found" });
    }
  } catch (error) {
    res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//---------------Authorization ------------- kevil-----------

router.post("/emailLogin", async function (req, res) {
  try {
    const { email, password } = req.body;

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

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          $and: [{ email: email }, { password: password }],
        },
      },
    ]);
    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get,
        Message: "Login Successfully!",
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

router.post("/phoneLogin", async function (req, res) {
  try {
    const { phoneNo } = req.body;

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

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          phoneNo: phoneNo,
        },
      },
    ]);
    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get,
        Message: "Login Successfully!",
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

//Forget Password
//----------Forget Password---------kevil -----------

router.post("/forgetPassword", async function (req, res) {
  try {
    const email = req.body.email;
    const userData = await userDetailsSchema.findOne({ email: email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await userDetailsSchema.updateOne(
        { email: email },
        { $set: { emailToken: randomString } },
        { new: true }
      );

      sendResetPasswordMail(userData.name, userData.email, randomString);

      res.status(200).send({
        isSuccess: true,
        msg: "Please check your mail and reset your password.",
      });
    } else {
      res
        .status(400)
        .send({ isSuccess: false, msg: "This email dose not exist" });
    }
  } catch (error) {
    res.status(400).send({ isSuccess: false, msg: error.message });
  }
});

router.post("/enterNewPassword", async function (req, res) {
  try {
    const emailToken = req.query.emailToken;
    const tokenData = await userDetailsSchema.findOne({
      emailToken: emailToken,
    });
    if (tokenData) {
      const password = req.body.password;

      const userData = await userDetailsSchema.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: password, emailToken: "" } },
        { new: true }
      );

      res.status(200).send({
        isSuccess: true,
        message: "User Password has been reset",
        data: userData,
      });
    } else {
      res
        .status(200)
        .send({ isSuccess: true, message: "This token has been expired" });
    }
  } catch (error) {
    res.status(400).send({ isSuccess: false, msg: error.message });
  }
});

// ----------------- Banner --------- kevil ------------

router.post("/addNewBanner", async function (req, res) {
  try {
    const { image } = req.body;

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

    let imagePath = [];
    if (image != undefined && image != null && image != [] && image != "") {
      if (image.length > 0) {
        let listStringToBase64 = image.split(",");
        listStringToBase64.forEach((dateIs) => {
          const path = "uploads/banner/" + Date.now() + ".png";
          const base64Date = dateIs.replace(/^data:([A-Za-z-+/]+);base64,/, "");
          fs.writeFileSync(path, base64Date, { encoding: "base64" });
          imagePath.push(path);
        });
      }
    }
    img = imagePath.pop();

    const add = await new bannerSchema({
      image: img,
    });

    if (add != null) {
      await add.save();
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

router.post("/getAllBanner", async function (req, res) {
  try {
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

    const get = await bannerSchema.aggregate([
      {
        $match: {},
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

//---------Favorite ----------- kevil ---------
router.post("/addNewFavorite", async function (req, res) {
  try {
    const { userId, serviceId, select } = req.body;
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

    const getUserSelectedCar = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    console.log(getUserSelectedCar);

    if (getUserSelectedCar.length == 1) {
      const get = await favoriteSchema.aggregate([
        {
          $match: {
            $and: [
              { userId: mongoose.Types.ObjectId(userId) },
              { serviceId: mongoose.Types.ObjectId(serviceId) },
            ],
          },
        },
      ]);

      console.log(get);

      if (get.length == 0) {
        const add = await new favoriteSchema({
          userId: userId,
          serviceId: serviceId,
          select: select,
          carModelId: getUserSelectedCar[0].carModelId,
          carFuelId: getUserSelectedCar[0].fuelTypeId,
        });

        if (add != null) {
          await add.save();
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
        } else {
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
        }
      } else if (get.length >= 1) {
        let updateIs;
        updateIs = {
          userId: userId != undefined ? userId : get[0].userId,
          serviceId: serviceId != undefined ? serviceId : get[0].serviceId,
          select: select != undefined ? select : get[0].select,
        };
        let updateIss = await favoriteSchema.findByIdAndUpdate(
          get[0]._id,
          updateIs,
          { new: true }
        );
        res.status(200).json({
          IsSuccess: true,
          Data: [updateIss],
          Message: `Updated Data`,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: [], Message: error.message });
  }
});

router.post("/getFavorite", async function (req, res) {
  try {
    const { userId, serviceId } = req.body;

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

    const get = await favoriteSchema.aggregate([
      {
        $match: {
          $and: [
            { userId: mongoose.Types.ObjectId(userId) },
            { serviceId: mongoose.Types.ObjectId(serviceId) },
          ],
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

router.post("/getUserMemberShipChack", async function (req, res) {
  try {
    const { userId } = req.body;

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

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          $and: [
            { _id: mongoose.Types.ObjectId(userId) },
            { memberShipStatus: 1 },
          ],
        },
      },
    ]);

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        memberShipStatus: 1,
        Data: get,
        Message: " Data Found",
      });
    } else {
      return res.status(200).json({
        IsSuccess: true,
        memberShipStatus: 0,
        Data: [],
        Message: "No Data Found",
      });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getAllFavoriteForUser", async function (req, res) {
  try {
    const { userId } = req.body;

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

    const getUserSelectedCar = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    console.log(getUserSelectedCar);

    if (getUserSelectedCar.length == 1) {
      const get = await favoriteSchema.aggregate([
        {
          $match: {
            $and: [
              { userId: mongoose.Types.ObjectId(userId) },
              {
                carModelId: mongoose.Types.ObjectId(
                  getUserSelectedCar[0].carModelId
                ),
              },
              {
                carFuelId: mongoose.Types.ObjectId(
                  getUserSelectedCar[0].fuelTypeId
                ),
              },
              { select: true },
            ],
          },
        },
        {
          $lookup: {
            from: "servicedata2",
            localField: "serviceId",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        {
          $project: {
            "serviceDetails.image": 1,
            "serviceDetails.mrp": 1,
            "serviceDetails.currentMrp": 1,
            "serviceDetails.title": 1,
            "serviceDetails.discount": 1,
            "serviceDetails._id": 1,
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
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "User Not Selected Car" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/deleteFavorite", async function (req, res, next) {
  try {
    const { favoriteId } = req.body;
    let deletes = await favoriteSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(favoriteId),
        },
      },
    ]);
    if (deletes.length == 1) {
      let deletee = await favoriteSchema.findByIdAndDelete(favoriteId);
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [deletee], Message: "Delete data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "No Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//---------- Add cart --------------- kevil -------------
router.post("/addToCart", async function (req, res) {
  try {
    const { userId, serviceId } = req.body;
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

    const get = await addToCartSchema.aggregate([
      {
        $match: {
          $and: [
            { userId: mongoose.Types.ObjectId(userId) },
            { serviceId: mongoose.Types.ObjectId(serviceId) },
            { status: 0 },
          ],
        },
      },
    ]);

    if (get.length >= 1) {
      return res.status(200).json({
        IsSuccess: true,
        Data: [],
        Message: "if user already have an cart data",
      });
    }

    const add = await new addToCartSchema({
      userId: userId,
      serviceId: serviceId,
    });

    if (add != null) {
      await add.save();
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getAddToCart_v1", async function (req, res) {
  try {
    const { userId, discountCoupon, refferal, status } = req.body;

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

    const getMember = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    console.log(getMember);

    if (getMember[0].memberShipStatus == 1) {
      console.log("MemberShip parson");

      //console.log(discountCouponId)
      if (status == 1) {
        console.log("refferal code");
        console.log("1");
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        const checkMemberShip = await userMemberShip.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        //     //   console.log(checkMemberShip[0].service)

        console.log("1");

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "regulerService",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        console.log(get);
        console.log("addtocart");
        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;
        let existIds = [];
        let currentMrpss = [];
        let mrpss = [];
        let discountss = [];
        // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
        for (let i = 0; i < get.length; i++) {
          console.log(get);

          for (let j = 0; j < get[0].serviceDetails.length; j++) {
            //console.log(checkMemberShip[0].service)
            const found = checkMemberShip[0].service.find(
              (element) =>
                element.serviceId.toString() == get[i].serviceId.toString()
            );

            console.log(found);
            if (found != undefined || found != null) {
              console.log("notttttttt" + found.qty);
              if (found.qty == "0") {
                console.log("1 total");
                //  t = parseInt(get[i].serviceDetails[j].currentMrp) * parseInt(found.discount) / 100
                //  total = parseInt(get[i].serviceDetails[j].currentMrp) - t
                console.log(get[i].serviceDetails[j].currentMrp);
                data = {
                  serviceId: get[i].serviceDetails[j]._id,
                  currentMrp: get[i].serviceDetails[j].currentMrp,
                  mrp: parseInt(get[i].serviceDetails[j].mrp),
                  discount: get[i].serviceDetails[j].discount,
                };
                existIds.push(get[i].serviceDetails[j]._id);
                currentMrpss.push(get[i].serviceDetails[j].currentMrp);
                console.log(currentMrpss);
                mrpss.push(get[i].serviceDetails[j].mrp);
                discountss.push(get[i].serviceDetails[j].discount);
                // existIds.push(data)
                // existIds.push(get[j].serviceId)
                currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                //  console.log(currentMrp)
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              } else {
                console.log(found);
                t =
                  (parseInt(get[i].serviceDetails[j].currentMrp) *
                    parseInt(found.discount)) /
                  100;
                total = parseInt(get[i].serviceDetails[j].currentMrp) - t;
                data = {
                  serviceId: get[i].serviceDetails[j]._id,
                  currentMrp: total.toString(),
                  mrp: get[i].serviceDetails[j].mrp,
                  discount: found.discount,
                };
                existIds.push(get[i].serviceDetails[j]._id);
                currentMrpss.push(total.toString());
                mrpss.push(get[i].serviceDetails[j].mrp);
                discountss.push(found.discount);

                //existIds.push(get[i].serviceDetails[j]._id)
                // existIds.push(data)
                d = get[i].serviceDetails[j].currentMrp;
                var currentMrps = d;
                console.log("0 total");
                currentMrp += total;
                console.log(currentMrp + "  currentMrp");
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              }
            } else {
              console.log("1 total");
              data = {
                serviceId: get[i].serviceDetails[j]._id,
                currentMrp: get[i].serviceDetails[j].currentMrp,
                mrp: get[i].serviceDetails[j].mrp,
                discount: get[i].serviceDetails[j].discount,
              };

              existIds.push(get[i].serviceDetails[j]._id);
              currentMrpss.push(get[i].serviceDetails[j].currentMrp);
              mrpss.push(get[i].serviceDetails[j].mrp);
              discountss.push(get[i].serviceDetails[j].discount);

              //existIds.push(get[i].serviceDetails[j]._id)
              //existIds.push(data)
              // existIds.push(get[j].serviceId)
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              //  console.log(currentMrp)
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }

            // }
          }
        }
        //  console.log(existIds)
        const pets = [];

        //console.log(pets.includes());

        const array1 = get;

        //   return false
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        console.log("exist ids");
        console.log(existIds);
        console.log(currentMrpss);
        console.log(mrpss);
        console.log(discountss);

        getData = [];
        for (let i = 0; i < existIds.length; i++) {
          const gets = await addToCartSchema.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedatas",
                let: { serviceId: "$serviceId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$serviceId"],
                      },
                    },
                  },
                  {
                    $set: {
                      mrp: mrpss[i],
                      currentMrp: currentMrpss[i],
                      discount: discountss[i],
                    },
                  },
                ],
                as: "serviceDetails",
              },
            },

            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);
          //console.log(gets)
          getData.push(gets);
        }
        datas = [];
        console.log(getData.length);
        for (let i = 0; i < getData.length; i++) {
          console.log(i);
          hello = getData[i][i];
          datas.push(hello);
        }

        //console.log(parseInt(mrp)-parseInt(currentMrp))
        console.log(currentMrp);
        fd = parseInt(mrp) - parseInt(currentMrp);
        // console.log(fd)
        // console.log("kkk")
        if (fd == 0) {
          tg = 0;
          //   console.log(tg)
        } else {
          tg = fd / parseInt(mrp);
          //  console.log(tg)
        }

        discount = tg * 100;

        d = parseInt(refferalPoint[0].refferalPoint);
        // console.log(d)
        if (d == 0) {
          s = d;
        } else {
          s = d / 4;
        }
        // console.log("kevil")
        // console.log(mrp)
        //  console.log(currentMrp )
        //  console.log("no")
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        //console.log(discountAmount)
        //console.log(parseInt(s))

        //console.log(parseInt(discountAmount))

        // console.log(currentMrp + "total")

        if (currentMrp == 0) {
          totalPay = parseInt(currentMrp) - 0;
        } else {
          totalPay = parseInt(currentMrp) - parseInt(s);
        }

        //totalPay = parseInt(currentMrp) - parseInt(s)

        var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);
        console.log("hello");
        // console.log(currentMrp)
        //  console.log(totalDiscountAmounts + "totalDiscountAmounts")
        ////  console.log(totalPay)
        //  console.log(discountAmount)
        //  console.log(s)

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: datas.length,
            totalDiscountAmount: totalDiscountAmounts.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            discountAmount: discountAmount.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discount: discount.toString(),
            refferal: s.toString(),
            couponAmaunt: "0",
            couponCode: "",
            Data: datas,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: datas.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            discountAmount: discountAmount.toString(),
            mrp: mrp.toString(),
            totalPay: "0",
            discount: "0",
            refferal: s.toString(),
            couponAmaunt: "0",
            couponCode: "",
            Data: [],
            Message: "No Data Found",
          });
        }
      } else if (status == 2) {
        console.log("discount code");

        const coupon = await discountCouponSchema.aggregate([
          {
            $match: {
              couponCode: discountCoupon,
            },
          },
        ]);
        const checkMemberShip = await userMemberShip.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        console.log(checkMemberShip[0].service);
        console.log(coupon);

        const coupons = await couponUseSchema.aggregate([
          {
            $match: {
              couponCode: coupon[0].couponCode,
            },
          },
        ]);
        console.log(coupons);

        if (coupons.length > 1) {
          return res
            .status(200)
            .json({ IsSuccess: true, Message: "Coupon Already Use" });
        }

        //console.log(coupon)

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;
        let existIds = [];
        let currentMrpss = [];
        let mrpss = [];
        let discountss = [];
        // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
        for (let i = 0; i < get.length; i++) {
          console.log(get);

          for (let j = 0; j < get[0].serviceDetails.length; j++) {
            //console.log(checkMemberShip[0].service)
            const found = checkMemberShip[0].service.find(
              (element) =>
                element.serviceId.toString() == get[i].serviceId.toString()
            );

            console.log(found);
            if (found != undefined || found != null) {
              console.log("notttttttt" + found.qty);
              if (found.qty == "0") {
                console.log("1 total");
                //  t = parseInt(get[i].serviceDetails[j].currentMrp) * parseInt(found.discount) / 100
                //  total = parseInt(get[i].serviceDetails[j].currentMrp) - t
                data = {
                  serviceId: get[i].serviceDetails[j]._id,
                  currentMrp: get[i].serviceDetails[j].currentMrp,
                  mrp: parseInt(get[i].serviceDetails[j].mrp),
                  discount: get[i].serviceDetails[j].discount,
                };
                existIds.push(get[i].serviceDetails[j]._id);
                currentMrpss.push(get[i].serviceDetails[j].currentMrp);
                mrpss.push(get[i].serviceDetails[j].mrp);
                discountss.push(get[i].serviceDetails[j].discount);
                // existIds.push(data)
                // existIds.push(get[j].serviceId)
                currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                //  console.log(currentMrp)
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              } else {
                console.log(found);
                t =
                  (parseInt(get[i].serviceDetails[j].currentMrp) *
                    parseInt(found.discount)) /
                  100;
                total = parseInt(get[i].serviceDetails[j].currentMrp) - t;
                data = {
                  serviceId: get[i].serviceDetails[j]._id,
                  currentMrp: total.toString(),
                  mrp: get[i].serviceDetails[j].mrp,
                  discount: found.discount,
                };
                existIds.push(get[i].serviceDetails[j]._id);
                currentMrpss.push(total.toString());
                mrpss.push(get[i].serviceDetails[j].mrp);
                discountss.push(found.discount);

                //existIds.push(get[i].serviceDetails[j]._id)
                // existIds.push(data)
                d = get[i].serviceDetails[j].currentMrp;
                var currentMrps = d;
                console.log("0 total");
                currentMrp += total;
                console.log(currentMrp + "  currentMrp");
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              }
            } else {
              console.log("1 total");
              data = {
                serviceId: get[i].serviceDetails[j]._id,
                currentMrp: get[i].serviceDetails[j].currentMrp,
                mrp: get[i].serviceDetails[j].mrp,
                discount: get[i].serviceDetails[j].discount,
              };

              existIds.push(get[i].serviceDetails[j]._id);
              currentMrpss.push(get[i].serviceDetails[j].currentMrp);
              mrpss.push(get[i].serviceDetails[j].mrp);
              discountss.push(get[i].serviceDetails[j].discount);

              //existIds.push(get[i].serviceDetails[j]._id)
              //existIds.push(data)
              // existIds.push(get[j].serviceId)
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              //  console.log(currentMrp)
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }

            // }
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        console.log("exist ids");
        console.log(existIds);
        console.log(currentMrpss);
        console.log(mrpss);
        console.log(discountss);

        getData = [];
        for (let i = 0; i < existIds.length; i++) {
          const gets = await addToCartSchema.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedatas",
                let: { serviceId: "$serviceId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$serviceId"],
                      },
                    },
                  },
                  {
                    $set: {
                      mrp: mrpss[i],
                      currentMrp: currentMrpss[i],
                      discount: discountss[i],
                    },
                  },
                ],
                as: "serviceDetails",
              },
            },

            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);
          //console.log(gets)
          getData.push(gets);
        }
        datas = [];
        console.log(getData.length);
        for (let i = 0; i < getData.length; i++) {
          console.log(i);
          hello = getData[i][i];
          datas.push(hello);
        }

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

        discountAmount = parseInt(mrp) - parseInt(currentMrp);

        totalPay = 0;
        if (currentMrp < coupon[0].minimumAmount) {
          return res.status(200).json({
            IsSuccess: true,
            Data: [],
            Message: "Minmum Amount " + coupon[0].minimumAmount,
          });
        } else {
          totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
        }

        pay = 0;

        if (totalPay >= 0) {
        } else {
          totalPay = pay;
        }

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: datas.length,
            totalDiscountAmount: discountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discount: discount.toString(),
            discountAmount: discountAmount.toString(),
            couponAmaunt: coupon[0].discount,
            refferal: "0",
            couponCode: discountCoupon,
            Data: datas,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: datas.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      } else {
        //console.log("refferal code")
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        const checkMemberShip = await userMemberShip.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        console.log(checkMemberShip[0].service);
        console.log("0");

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;
        let existIds = [];
        let currentMrpss = [];
        let mrpss = [];
        let discountss = [];
        // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
        for (let i = 0; i < get.length; i++) {
          console.log(get);
          console.log("1");
          for (let j = 0; j < get[0].serviceDetails.length; j++) {
            console.log("2");
            //console.log(checkMemberShip[0].service)
            const found = checkMemberShip[0].service.find(
              (element) =>
                element.serviceId.toString() == get[i].serviceId.toString()
            );

            console.log(found);
            if (found != undefined || found != null) {
              console.log("notttttttt" + found.qty);
              if (found.qty == "0") {
                console.log("1 total");
                //  t = parseInt(get[i].serviceDetails[j].currentMrp) * parseInt(found.discount) / 100
                //  total = parseInt(get[i].serviceDetails[j].currentMrp) - t
                data = {
                  serviceId: get[i].serviceDetails[j]._id,
                  currentMrp: get[i].serviceDetails[j].currentMrp,
                  mrp: parseInt(get[i].serviceDetails[j].mrp),
                  discount: get[i].serviceDetails[j].discount,
                };
                existIds.push(get[i].serviceDetails[j]._id);
                currentMrpss.push(data.currentMrp);
                mrpss.push(get[i].serviceDetails[j].mrp);
                discountss.push(get[i].serviceDetails[j].discount);
                // existIds.push(data)
                // existIds.push(get[j].serviceId)
                currentMrp += parseInt(data.currentMrp);
                //  console.log(currentMrp)
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              } else {
                console.log("2");
                console.log(found);
                console.log(
                  " current Mrp ",
                  get[i].serviceDetails[j].currentMrp
                );
                console.log(found, "found");
                t =
                  (parseInt(get[i].serviceDetails[j].currentMrp) *
                    parseInt(found.discount)) /
                  100;
                console.log(t, " t");
                total = parseInt(get[i].serviceDetails[j].currentMrp) - t;
                console.log(total, " total");
                data = {
                  serviceId: get[i].serviceDetails[j]._id,
                  currentMrp: total.toString(),
                  mrp: get[i].serviceDetails[j].mrp,
                  discount: found.discount,
                };
                existIds.push(get[i].serviceDetails[j]._id);
                currentMrpss.push(total.toString());
                mrpss.push(get[i].serviceDetails[j].mrp);
                discountss.push(found.discount);

                //existIds.push(get[i].serviceDetails[j]._id)
                // existIds.push(data)
                d = get[i].serviceDetails[j].currentMrp;

                var currentMrps = d;
                console.log("0 total");
                currentMrp += total;
                console.log(currentMrps + "  currentMrp");
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              }
            } else {
              console.log("1 total");
              data = {
                serviceId: get[i].serviceDetails[j]._id,
                currentMrp: get[i].serviceDetails[j].currentMrp,
                mrp: get[i].serviceDetails[j].mrp,
                discount: get[i].serviceDetails[j].discount,
              };

              console.log("hello ", data.currentMrp);

              existIds.push(get[i].serviceDetails[j]._id);
              currentMrpss.push(data.currentMrp);
              mrpss.push(get[i].serviceDetails[j].mrp);
              discountss.push(get[i].serviceDetails[j].discount);

              //existIds.push(get[i].serviceDetails[j]._id)
              //existIds.push(data)
              // existIds.push(get[j].serviceId)
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              //  console.log(currentMrp)
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }

            // }
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        console.log("exist ids");
        console.log(existIds);
        console.log("exist ids");
        console.log(existIds);
        console.log(currentMrpss);
        console.log(mrpss);
        console.log(discountss);

        getData = [];
        for (let i = 0; i < existIds.length; i++) {
          const gets = await addToCartSchema.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedatas",
                let: { serviceId: "$serviceId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$serviceId"],
                      },
                    },
                  },
                  {
                    $set: {
                      mrp: mrpss[i],
                      currentMrp: currentMrpss[i],
                      discount: discountss[i],
                    },
                  },
                ],
                as: "serviceDetails",
              },
            },

            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);
          //console.log(gets)
          getData.push(gets);
        }
        datas = [];
        console.log(getData.length);
        for (let i = 0; i < getData.length; i++) {
          console.log(i);
          hello = getData[i][i];
          datas.push(hello);
        }

        //console.log(datas[1].serviceDetails.mrp)

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        point = "100";
        console.log("kevil");
        // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
        //   totalPay = parseInt(currentMrp) - parseInt(point)
        // }else{
        //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
        // }

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: datas.length,
            totalDiscountAmount: discountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discountAmount: discountAmount.toString(),
            discount: discount.toString(),
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            Data: datas,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: datas.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      }
    } else {
      console.log(discountCoupon);
      if (status == 1) {
        console.log("refferal code");
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        for (let i = 0; i < get.length; i++) {
          for (let j = 0; j < get[i].serviceDetails.length; j++) {
            //console.log(get[i].serviceDetails[j].currentMrp)
            currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
            mrp += parseInt(get[i].serviceDetails[j].mrp);
            delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        d = parseInt(refferalPoint[0].refferalPoint);
        s = d / 4;

        console.log(parseInt(s));

        totalPay = parseInt(currentMrp) - parseInt(s);
        var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: totalDiscountAmounts.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discount: discount.toString(),
            discountAmount: discountAmount.toString(),
            refferal: s.toString(),
            couponAmaunt: "0",
            couponCode: "",
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      } else if (status == 2) {
        console.log("discount code");

        const coupon = await discountCouponSchema.aggregate([
          {
            $match: {
              couponCode: discountCoupon,
            },
          },
        ]);
        console.log("1");
        console.log(coupon);
        const coupons = await couponUseSchema.aggregate([
          {
            $match: {
              couponCode: coupon[0].couponCode,
            },
          },
        ]);
        console.log("1");
        if (coupons.length == 1) {
          return res
            .status(200)
            .json({ IsSuccess: true, Message: "Coupon Already Use" });
        }

        console.log("1");

        console.log(coupon);

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);
        console.log("1");
        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        for (let i = 0; i < get.length; i++) {
          for (let j = 0; j < get[i].serviceDetails.length; j++) {
            console.log(get[i].serviceDetails[j].currentMrp);
            currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
            mrp += parseInt(get[i].serviceDetails[j].mrp);
            delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }
        console.log("1");
        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        totalPay = 0;
        if (currentMrp < coupon[0].minimumAmount) {
          return res.status(200).json({
            IsSuccess: true,
            Data: [],
            Message: "Minmum Amount " + coupon[0].minimumAmount,
          });
        } else {
          totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
        }

        pay = 0;

        if (totalPay >= 0) {
        } else {
          totalPay = pay;
        }

        var totalDiscountAmount =
          parseInt(coupon[0].discount) + parseInt(discountAmount);

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: totalDiscountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discountAmount: discountAmount.toString(),
            discount: discount.toString(),
            couponAmaunt: coupon[0].discount,
            refferal: "0",
            couponCode: discountCoupon,
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: totalDiscountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      } else {
        console.log("noo code");
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);
        console.log(get);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        for (let i = 0; i < get.length; i++) {
          console.log(i);
          for (let j = 0; j < get[i].serviceDetails.length; j++) {
            console.log(get[i].serviceDetails[j].currentMrp);
            currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
            mrp += parseInt(get[i].serviceDetails[j].mrp);
            delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },

          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        point = "100";

        // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
        //   totalPay = parseInt(currentMrp) - parseInt(point)
        // }else{
        //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
        // }

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: discountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: discount.toString(),
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getAddToCart", async function (req, res) {
  try {
    const { userId, discountCoupon, refferal, status } = req.body;

    let authToken = req.headers["authorization"];

    // if (
    //   authToken != config.tockenIs ||
    //   authToken == null ||
    //   authToken == undefined
    // ) {
    //   return res.status(200).json({
    //     IsSuccess: false,
    //     Data: [],
    //     Message: "You are not authenticated",
    //   });
    // }

    const getMember = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    //console.log(getMember)

    if (getMember[0].memberShipStatus == 1) {
      console.log("MemberShip parson");

      //console.log(discountCouponId)
      if (status == 1) {
        console.log("refferal code");
        console.log("1");
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        const checkMemberShip = await userMemberShip.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        //   console.log(checkMemberShip[0].service)

        console.log("1");

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        //console.log(get)
        console.log("addtocart");
        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;
        let existIds = [];
        // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
        for (let i = 0; i < get.length; i++) {
          console.log(get);
          console.log("jjjjjjjjjj");
          for (let j = 0; j < get[0].serviceDetails.length; j++) {
            //   console.log("data" + get[0].serviceDetails[j])
            //console.log(checkMemberShip[0].service)
            const found = checkMemberShip[0].service.find(
              (element) =>
                element.serviceId.toString() == get[i].serviceId.toString()
            );
            //console.log(element.serviceId)
            console.log("notttttttt");
            console.log(found);
            if (found != undefined || found != null) {
              console.log(found);
              existIds.push(get[i].serviceDetails[j]._id);
              d = get[i].serviceDetails[j].currentMrp;
              var currentMrps = d;
              console.log("0 total");
              currentMrp += 0;
              console.log(currentMrp + "  currentMrp");
              mrp += 0;
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            } else {
              console.log("1 total");
              // existIds.push(get[j].serviceId)
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              //  console.log(currentMrp)
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }

            // }
          }
        }
        console.log(existIds);
        const pets = [];

        //console.log(pets.includes());

        const array1 = get;

        //   return false
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        console.log("exist ids");
        // console.log(existIds);
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              let: { serviceId: "$serviceId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$serviceId"],
                    },
                  },
                },
                {
                  $set: {
                    mrp: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$mrp",
                      },
                    },
                    currentMrp: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$currentMrp",
                      },
                    },
                    discount: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$discount",
                      },
                    },
                  },
                },
              ],
              as: "serviceDetails",
            },
          },

          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);
        // console.log(gets)
        //console.log(parseInt(mrp)-parseInt(currentMrp))
        console.log(currentMrp);
        fd = parseInt(mrp) - parseInt(currentMrp);
        // console.log(fd)
        // console.log("kkk")
        if (fd == 0) {
          tg = 0;
          //   console.log(tg)
        } else {
          tg = fd / parseInt(mrp);
          //  console.log(tg)
        }

        discount = tg * 100;

        d = parseInt(refferalPoint[0].refferalPoint);
        // console.log(d)
        if (d == 0) {
          s = d;
        } else {
          s = d / 4;
        }
        // console.log("kevil")
        // console.log(mrp)
        //  console.log(currentMrp )
        //  console.log("no")
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        //console.log(discountAmount)
        //console.log(parseInt(s))

        //console.log(parseInt(discountAmount))

        // console.log(currentMrp + "total")

        if (currentMrp == 0) {
          totalPay = parseInt(currentMrp) - 0;
        } else {
          totalPay = parseInt(currentMrp) - parseInt(s);
        }

        //totalPay = parseInt(currentMrp) - parseInt(s)

        var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);
        console.log("hello");
        // console.log(currentMrp)
        //  console.log(totalDiscountAmounts + "totalDiscountAmounts")
        ////  console.log(totalPay)
        //  console.log(discountAmount)
        //  console.log(s)

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: totalDiscountAmounts.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            discountAmount: discountAmount.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discount: discount.toString(),
            refferal: s.toString(),
            couponAmaunt: "0",
            couponCode: "",
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            discountAmount: discountAmount.toString(),
            mrp: mrp.toString(),
            totalPay: "0",
            discount: "0",
            refferal: s.toString(),
            couponAmaunt: "0",
            couponCode: "",
            Data: [],
            Message: "No Data Found",
          });
        }
      } else if (status == 2) {
        console.log("discount code");

        const coupon = await discountCouponSchema.aggregate([
          {
            $match: {
              couponCode: discountCoupon,
            },
          },
        ]);
        const checkMemberShip = await userMemberShip.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        console.log(checkMemberShip[0].service);
        console.log(coupon);

        const coupons = await couponUseSchema.aggregate([
          {
            $match: {
              couponCode: coupon[0].couponCode,
            },
          },
        ]);
        console.log(coupons);

        if (coupons.length > 1) {
          return res
            .status(200)
            .json({ IsSuccess: true, Message: "Coupon Already Use" });
        }

        //console.log(coupon)

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        let existIds = [];
        // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
        for (let i = 0; i < get.length; i++) {
          console.log(get);

          for (let j = 0; j < get[0].serviceDetails.length; j++) {
            const found = checkMemberShip[0].service.find(
              (element) =>
                element.serviceId.toString() == get[i].serviceId.toString()
            );
            console.log(found);
            if (found != undefined || found != null) {
              existIds.push(get[i].serviceDetails[j]._id);
              currentMrp += 0;
              mrp += 0;
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            } else {
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }

            // }
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        console.log("exist ids");
        console.log(existIds);
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              let: { serviceId: "$serviceId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$serviceId"],
                    },
                  },
                },
                {
                  $set: {
                    mrp: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$mrp",
                      },
                    },
                    currentMrp: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$currentMrp",
                      },
                    },
                    discount: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$discount",
                      },
                    },
                  },
                },
              ],
              as: "serviceDetails",
            },
          },

          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

        discountAmount = parseInt(mrp) - parseInt(currentMrp);

        totalPay = 0;
        if (currentMrp < coupon[0].minimumAmount) {
          return res.status(200).json({
            IsSuccess: true,
            Data: [],
            Message: "Minmum Amount " + coupon[0].minimumAmount,
          });
        } else {
          totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
        }

        pay = 0;

        if (totalPay >= 0) {
        } else {
          totalPay = pay;
        }

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: discountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discount: discount.toString(),
            discountAmount: discountAmount.toString(),
            couponAmaunt: coupon[0].discount,
            refferal: "0",
            couponCode: discountCoupon,
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      } else {
        //console.log("refferal code")
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        const checkMemberShip = await userMemberShip.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        console.log(checkMemberShip[0].service);

        console.log("0");
        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        let existIds = [];
        // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
        for (let i = 0; i < get.length; i++) {
          console.log(get);
          console.log("1");
          for (let j = 0; j < get[0].serviceDetails.length; j++) {
            console.log("2");
            const found = checkMemberShip[0].service.find(
              (element) =>
                element.serviceId.toString() == get[i].serviceId.toString()
            );
            console.log("3");
            console.log(found);
            if (found != undefined || found != null) {
              existIds.push(get[i].serviceDetails[j]._id);
              currentMrp += 0;
              mrp += 0;
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            } else {
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }

            // }
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        console.log("exist ids");
        console.log(existIds);
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              let: { serviceId: "$serviceId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$serviceId"],
                    },
                  },
                },
                {
                  $set: {
                    mrp: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$mrp",
                      },
                    },
                    currentMrp: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$currentMrp",
                      },
                    },
                    discount: {
                      $cond: {
                        if: { $in: ["$_id", existIds] },
                        then: "0",
                        else: "$discount",
                      },
                    },
                  },
                },
              ],
              as: "serviceDetails",
            },
          },
          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);
        console.log("4");
        //console.log(gets[1].serviceDetails.mrp)
        console.log("5");
        console.log(mrp, currentMrp);

        if (parseInt(mrp) == 0 && parseInt(currentMrp) == 0) {
          discount = 0;
        } else {
          discount =
            ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
        }

        console.log(discount);
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        point = "100";
        console.log("kevil");
        // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
        //   totalPay = parseInt(currentMrp) - parseInt(point)
        // }else{
        //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
        // }

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: discountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discountAmount: discountAmount.toString(),
            discount: discount.toString(),
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      }
    } else {
      console.log(discountCoupon);
      if (status == 1) {
        console.log("refferal code");
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        for (let i = 0; i < get.length; i++) {
          for (let j = 0; j < get[i].serviceDetails.length; j++) {
            //console.log(get[i].serviceDetails[j].currentMrp)
            currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
            mrp += parseInt(get[i].serviceDetails[j].mrp);
            delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        d = parseInt(refferalPoint[0].refferalPoint);
        s = d / 4;

        console.log(parseInt(s));

        totalPay = parseInt(currentMrp) - parseInt(s);
        var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: totalDiscountAmounts.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discount: discount.toString(),
            discountAmount: discountAmount.toString(),
            refferal: s.toString(),
            couponAmaunt: "0",
            couponCode: "",
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      } else if (status == 2) {
        console.log("discount code");

        const coupon = await discountCouponSchema.aggregate([
          {
            $match: {
              couponCode: discountCoupon,
            },
          },
        ]);
        console.log("1");
        console.log(coupon);
        const coupons = await couponUseSchema.aggregate([
          {
            $match: {
              couponCode: coupon[0].couponCode,
            },
          },
        ]);
        console.log("1");
        if (coupons.length == 1) {
          return res
            .status(200)
            .json({ IsSuccess: true, Message: "Coupon Already Use" });
        }

        console.log("1");

        console.log(coupon);

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);
        console.log("1");
        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        for (let i = 0; i < get.length; i++) {
          for (let j = 0; j < get[i].serviceDetails.length; j++) {
            console.log(get[i].serviceDetails[j].currentMrp);
            currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
            mrp += parseInt(get[i].serviceDetails[j].mrp);
            delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }
        console.log("1");
        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        totalPay = 0;
        if (currentMrp < coupon[0].minimumAmount) {
          return res.status(200).json({
            IsSuccess: true,
            Data: [],
            Message: "Minmum Amount " + coupon[0].minimumAmount,
          });
        } else {
          totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
        }

        pay = 0;

        if (totalPay >= 0) {
        } else {
          totalPay = pay;
        }

        var totalDiscountAmount =
          parseInt(coupon[0].discount) + parseInt(discountAmount);

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: totalDiscountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: totalPay.toString(),
            discountAmount: discountAmount.toString(),
            discount: discount.toString(),
            couponAmaunt: coupon[0].discount,
            refferal: "0",
            couponCode: discountCoupon,
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: totalDiscountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      } else {
        console.log("noo code");
        const refferalPoint = await userDetailsSchema.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
        ]);

        const get = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "userdetails",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },
        ]);
        console.log(get);

        currentMrp = 0;
        mrp = 0;
        discount = 0;
        delivery = 0;

        for (let i = 0; i < get.length; i++) {
          console.log(i);
          for (let j = 0; j < get[i].serviceDetails.length; j++) {
            console.log(get[i].serviceDetails[j].currentMrp);
            currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
            mrp += parseInt(get[i].serviceDetails[j].mrp);
            delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
          }
        }
        de = "";
        if (delivery == 0) {
          de = "Free";
        } else {
          de = delivery;
        }

        const favorite = await favoriteSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
            },
          },
        ]);
        arr = [];
        // for(let i = 0 ; i < get.length ;i++){
        //   for(let j = 0 ; j < favorite.length ;j++){
        //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
        //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
        const gets = await addToCartSchema.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: mongoose.Types.ObjectId(userId),
                },
                {
                  status: 0,
                },
              ],
            },
          },
          {
            $lookup: {
              from: "servicedatas",
              localField: "serviceId",
              foreignField: "_id",
              as: "serviceDetails",
            },
          },

          { $unwind: "$serviceDetails" },
          {
            $project: {
              "serviceDetails.title": 1,
              "serviceDetails.image": 1,
              "serviceDetails.mrp": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails.discount": 1,
              "serviceDetails.currentMrp": 1,
              "serviceDetails._id": 1,
            },
          },
        ]);

        discount =
          ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
        discountAmount = parseInt(mrp) - parseInt(currentMrp);
        point = "100";

        // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
        //   totalPay = parseInt(currentMrp) - parseInt(point)
        // }else{
        //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
        // }

        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: discountAmount.toString(),
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: discount.toString(),
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: gets,
            Message: " Data Found",
          });
        } else {
          return res.status(200).json({
            IsSuccess: true,
            count: gets.length,
            totalDiscountAmount: "0",
            deliveryCharges: de.toString(),
            currentMrp: currentMrp.toString(),
            mrp: mrp.toString(),
            totalPay: currentMrp.toString(),
            discount: "0",
            refferal: "0",
            couponAmaunt: "0",
            couponCode: "",
            discountAmount: discountAmount.toString(),
            Data: [],
            Message: "No Data Found",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//------------------- Paras get Cart API By Model Selectd Model Work-=----------------

router.post("/addToCart_v5", async function (req, res) {
  try {
    const { userId, serviceId, carModelId } = req.body;
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
    const getModelId = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    const get = await addToCartSchema2.aggregate([
      {
        $match: {
          $and: [
            { userId: mongoose.Types.ObjectId(userId) },
            { serviceId: mongoose.Types.ObjectId(serviceId) },
            { carModelId: mongoose.Types.ObjectId(getModelId[0].carModelId) },
            { fuelTypeId: mongoose.Types.ObjectId(getModelId[0].fuelTypeId) },
            { status: 0 },
          ],
        },
      },
    ]);

    console.log(getModelId[0].carModelId);
    if (get.length >= 1) {
      return res.status(200).json({
        IsSuccess: true,
        Data: [],
        Message: "if user already have an cart data",
      });
    }

    const add = await new addToCartSchema2({
      userId: userId,
      serviceId: serviceId,
      carModelId: getModelId[0].carModelId,
      fuelTypeId: getModelId[0].fuelTypeId,
    });
    console.log(add);
    if (add != null) {
      await add.save();
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getAddToCart_v5", async function (req, res) {
  try {
    const { userId, discountCoupon, refferal, status } = req.body;

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

    const getMember = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);


    const getuserCar = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    console.log("SelectedCar", getuserCar.length);
    console.log("SelectedCar", getMember);

    //console.log(getMember)

    if (getuserCar.length == 1) {
      if (getMember[0].memberShipStatus == 1) {
        console.log("MemberShip parson");

        //console.log(discountCouponId)
        if (status == 1) {
          console.log("refferal code");
          console.log("1");
          const refferalPoint = await userDetailsSchema.aggregate([
            {
              $match: {
                _id: mongoose.Types.ObjectId(userId),
              },
            },
          ]);

          const checkMemberShip = await userMemberShip.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);

          //   console.log(checkMemberShip[0].service)

          let availedCar ;
          if (checkMemberShip[0].carId.toString() == getuserCar[0].carModelId.toString()){
            availedCar = true
          }else{
            availedCar = false
          }

          console.log("1");

          const get = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(getuserCar[0].carModelId),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "userdetails",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
          ]);

          console.log("Car details ", get);
          console.log("addtocart");
          currentMrp = 0;
          mrp = 0;
          discount = 0;
          delivery = 0;
          let existIds = [];
          // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
          for (let i = 0; i < get.length; i++) {
            console.log(get);
            console.log("jjjjjjjjjj");
            for (let j = 0; j < get[0].serviceDetails.length; j++) {
              // console.log("data" + get[0].serviceDetails[j])
              //console.log(checkMemberShip[0].service)
              const found = checkMemberShip[0].service.find(
                (element) =>
                  // element.serviceId.toString() == get[i].serviceId.toString()
                  element.serviceId.toString() == get[i].serviceDetails[j].regulerServiceId.toString() // added by jayshri
              );
              //console.log(element.serviceId)
              console.log("notttttttt");
              console.log(found);
              if ((found != undefined || found != null) && availedCar == true) {
                console.log(found, "founddetails");
                if ((parseInt(found.qty) > 0) || (parseInt(found.discount) > 0)) { // added 
                  existIds.push(get[i].serviceDetails[j]._id);
                  d = get[i].serviceDetails[j].currentMrp;
                  var currentMrps = d;
                  console.log("0 total");
                  currentMrp += 0;
                  console.log(currentMrp + "  currentMrp");
                  mrp += 0;
                  delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
                } else {
                  console.log("1 total");
                  // existIds.push(get[j].serviceId)
                  currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                  //  console.log(currentMrp)
                  mrp += parseInt(get[i].serviceDetails[j].mrp);
                  delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
                }

              } else {
                console.log("1 total");
                // existIds.push(get[j].serviceId)
                currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                //  console.log(currentMrp)
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              }

              // }
            }
          }
          console.log(existIds);
          const pets = [];

          //console.log(pets.includes());

          const array1 = get;

          //   return false
          de = "";
          if (delivery == 0) {
            de = "Free";
          } else {
            de = delivery;
          }

          const favorite = await favoriteSchema.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);
          arr = [];
          // for(let i = 0 ; i < get.length ;i++){
          //   for(let j = 0 ; j < favorite.length ;j++){
          //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
          //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
          console.log("exist ids");
          // console.log(existIds);
          const gets = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                let: { serviceId: "$serviceId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$serviceId"],
                      },
                    },
                  },
                  {
                    $set: {
                      mrp: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$mrp",
                        },
                      },
                      currentMrp: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$currentMrp",
                        },
                      },
                      discount: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$discount",
                        },
                      },
                    },
                  },
                ],
                as: "serviceDetails",
              },
            },

            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);
          // console.log(gets)
          //console.log(parseInt(mrp)-parseInt(currentMrp))
          console.log(currentMrp);
          fd = parseInt(mrp) - parseInt(currentMrp);
          // console.log(fd)
          // console.log("kkk")
          if (fd == 0) {
            tg = 0;
            //   console.log(tg)
          } else {
            tg = fd / parseInt(mrp);
            //  console.log(tg)
          }

          discount = tg * 100;

          d = parseInt(refferalPoint[0].refferalPoint);
          // console.log(d)
          if (d == 0) {
            s = d;
          } else {
            s = d / 4;
          }
          // console.log("kevil")
          // console.log(mrp)
          //  console.log(currentMrp )
          //  console.log("no")
          discountAmount = parseInt(mrp) - parseInt(currentMrp);
          //console.log(discountAmount)
          //console.log(parseInt(s))

          //console.log(parseInt(discountAmount))

          // console.log(currentMrp + "total")

          if (currentMrp == 0) {
            totalPay = parseInt(currentMrp) - 0;
          } else {
            totalPay = parseInt(currentMrp) - parseInt(s);
          }

          //totalPay = parseInt(currentMrp) - parseInt(s)

          var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);
          console.log("hello");
          // console.log(currentMrp)
          //  console.log(totalDiscountAmounts + "totalDiscountAmounts")
          ////  console.log(totalPay)
          //  console.log(discountAmount)
          //  console.log(s)

          if (get.length > 0) {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: totalDiscountAmounts.toString(),
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              discountAmount: discountAmount.toString(),
              mrp: mrp.toString(),
              totalPay: totalPay.toString(),
              discount: discount.toString(),
              refferal: s.toString(),
              couponAmaunt: "0",
              couponCode: "",
              Data: gets,
              Message: " Data Found",
              carNumber : checkMemberShip[0].carNumber
            });
          } else {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: "0",
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              discountAmount: discountAmount.toString(),
              mrp: mrp.toString(),
              totalPay: "0",
              discount: "0",
              refferal: s.toString(),
              couponAmaunt: "0",
              couponCode: "",
              Data: [],
              Message: "No Data Found",
              carNumber : checkMemberShip[0].carNumber
            });
          }
        } else if (status == 2) {
          console.log("discount code");

          const coupon = await discountCouponSchema.aggregate([
            {
              $match: {
                couponCode: discountCoupon,
              },
            },
          ]);
          const checkMemberShip = await userMemberShip.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);

          console.log(checkMemberShip[0].service);
          console.log(coupon);

          let availedCar ;
          if (checkMemberShip[0].carId.toString() == getuserCar[0].carModelId.toString()){
            availedCar = true
          }else{
            availedCar = false
          }

          const coupons = await couponUseSchema.aggregate([
            {
              $match: {
                couponCode: coupon[0].couponCode,
              },
            },
          ]);
          console.log(coupons);

          if (coupons.length > 1) {
            return res
              .status(200)
              .json({ IsSuccess: true, Message: "Coupon Already Use" });
          }

          //console.log(coupon)

          const get = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "userdetails",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
          ]);

          currentMrp = 0;
          mrp = 0;
          discount = 0;
          delivery = 0;

          let existIds = [];
          // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
          for (let i = 0; i < get.length; i++) {
            console.log(get);

            for (let j = 0; j < get[0].serviceDetails.length; j++) {
              const found = checkMemberShip[0].service.find(
                (element) =>
                  // element.serviceId.toString() == get[i].serviceId.toString()
                  element.serviceId.toString() == get[i].serviceDetails[j].regulerServiceId.toString() // added 
              );
              console.log(found);
              if ((found != undefined || found != null) && availedCar == true) {
                if ((parseInt(found.qty) > 0) || (parseInt(found.discount) > 0)) {
                  existIds.push(get[i].serviceDetails[j]._id);
                  currentMrp += 0;
                  mrp += 0;
                  delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
                } else {
                  currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                  mrp += parseInt(get[i].serviceDetails[j].mrp);
                  delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
                }

              } else {
                currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              }

              // }
            }
          }
          de = "";
          if (delivery == 0) {
            de = "Free";
          } else {
            de = delivery;
          }

          const favorite = await favoriteSchema.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);
          arr = [];
          // for(let i = 0 ; i < get.length ;i++){
          //   for(let j = 0 ; j < favorite.length ;j++){
          //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
          //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
          console.log("exist ids");
          console.log(existIds);
          const gets = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedatas",
                let: { serviceId: "$serviceId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$serviceId"],
                      },
                    },
                  },
                  {
                    $set: {
                      mrp: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$mrp",
                        },
                      },
                      currentMrp: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$currentMrp",
                        },
                      },
                      discount: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$discount",
                        },
                      },
                    },
                  },
                ],
                as: "serviceDetails",
              },
            },

            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);

          discount =
            ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

          discountAmount = parseInt(mrp) - parseInt(currentMrp);

          totalPay = 0;
          if (currentMrp < coupon[0].minimumAmount) {
            return res.status(200).json({
              IsSuccess: true,
              Data: [],
              Message: "Minmum Amount " + coupon[0].minimumAmount,
            });
          } else {
            totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
          }

          pay = 0;

          if (totalPay >= 0) {
          } else {
            totalPay = pay;
          }

          if (get.length > 0) {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: discountAmount.toString(),
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: totalPay.toString(),
              discount: discount.toString(),
              discountAmount: discountAmount.toString(),
              couponAmaunt: coupon[0].discount,
              refferal: "0",
              couponCode: discountCoupon,
              Data: gets,
              Message: " Data Found",
              carNumber : checkMemberShip[0].carNumber
            });
          } else {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: "0",
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: currentMrp.toString(),
              discount: "0",
              refferal: "0",
              couponAmaunt: "0",
              couponCode: "",
              discountAmount: discountAmount.toString(),
              Data: [],
              Message: "No Data Found",
              carNumber : checkMemberShip[0].carNumber
            });
          }
        } else {
          //console.log("refferal code")
          const refferalPoint = await userDetailsSchema.aggregate([
            {
              $match: {
                _id: mongoose.Types.ObjectId(userId),
              },
            },
          ]);
          const checkMemberShip = await userMemberShip.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);

          let availedCar ;
          if (checkMemberShip[0].carId.toString() == getuserCar[0].carModelId.toString()){
            availedCar = true
          }else{
            availedCar = false
          }

          console.log(checkMemberShip[0].service);

          console.log("0");
          const get = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "userdetails",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
          ]);

          currentMrp = 0;
          mrp = 0;
          discount = 0;
          delivery = 0;

          let existIds = [];
          // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
          for (let i = 0; i < get.length; i++) {
            console.log(get);
            console.log("1");
            console.log(get[i].serviceId.toString())
            for (let j = 0; j < get[0].serviceDetails.length; j++) {
              console.log("2");
              const found = checkMemberShip[0].service.find(
                (element) =>
                  // element.serviceId.toString() == get[i].serviceId.toString()
                  element.serviceId.toString() == get[i].serviceDetails[j].regulerServiceId.toString() // added by jayshri
              );
              console.log("3");
              console.log(found);
              if ((found != undefined || found != null) && availedCar == true) {
                if ((parseInt(found.qty) > 0) || (parseInt(found.discount) > 0)){// added by jayshri to check if membership service is available or not
                  existIds.push(get[i].serviceDetails[j]._id);
                  currentMrp += 0;
                  mrp += 0;
                  delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
                }else{
                  currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                  mrp += parseInt(get[i].serviceDetails[j].mrp);
                  delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
                }
                
              } else {
                currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
                mrp += parseInt(get[i].serviceDetails[j].mrp);
                delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
              }

              // }
            }
          }
          de = "";
          if (delivery == 0) {
            de = "Free";
          } else {
            de = delivery;
          }

          const favorite = await favoriteSchema.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);
          arr = [];
          // for(let i = 0 ; i < get.length ;i++){
          //   for(let j = 0 ; j < favorite.length ;j++){
          //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
          //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
          console.log("exist ids");
          console.log(existIds);
          const gets = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                let: { serviceId: "$serviceId" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$serviceId"],
                      },
                    },
                  },
                  {
                    $set: {
                      mrp: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$mrp",
                        },
                      },
                      currentMrp: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$currentMrp",
                        },
                      },
                      discount: {
                        $cond: {
                          if: { $in: ["$_id", existIds] },
                          then: "0",
                          else: "$discount",
                        },
                      },
                    },
                  },
                ],
                as: "serviceDetails",
              },
            },
            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);
          console.log("4");
          //console.log(gets[1].serviceDetails.mrp)
          console.log("5");
          console.log(mrp, currentMrp);

          if (parseInt(mrp) == 0 && parseInt(currentMrp) == 0) {
            discount = 0;
          } else {
            discount =
              ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
          }

          console.log(discount);
          discountAmount = parseInt(mrp) - parseInt(currentMrp);
          point = "100";
          console.log("kevil");
          // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
          //   totalPay = parseInt(currentMrp) - parseInt(point)
          // }else{
          //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
          // }

          if (get.length > 0) {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: discountAmount.toString(),
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: currentMrp.toString(),
              discountAmount: discountAmount.toString(),
              discount: discount.toString(),
              refferal: "0",
              couponAmaunt: "0",
              couponCode: "",
              Data: gets,
              Message: " Data Found",
              carNumber : checkMemberShip[0].carNumber
            });
          } else {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: "0",
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: currentMrp.toString(),
              discount: "0",
              refferal: "0",
              couponAmaunt: "0",
              couponCode: "",
              discountAmount: discountAmount.toString(),
              Data: [],
              Message: "No Data Found",
              carNumber : checkMemberShip[0].carNumber
            });
          }
        }
      } else {
        console.log(discountCoupon);
        if (status == 1) {
          console.log("refferal code");
          const refferalPoint = await userDetailsSchema.aggregate([
            {
              $match: {
                _id: mongoose.Types.ObjectId(userId),
              },
            },
          ]);

          const get = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "userdetails",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
          ]);

          currentMrp = 0;
          mrp = 0;
          discount = 0;
          delivery = 0;

          for (let i = 0; i < get.length; i++) {
            for (let j = 0; j < get[i].serviceDetails.length; j++) {
              //console.log(get[i].serviceDetails[j].currentMrp)
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }
          }
          de = "";
          if (delivery == 0) {
            de = "Free";
          } else {
            de = delivery;
          }

          const favorite = await favoriteSchema.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);
          arr = [];
          // for(let i = 0 ; i < get.length ;i++){
          //   for(let j = 0 ; j < favorite.length ;j++){
          //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
          //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
          const gets = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);

          discount =
            ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
          discountAmount = parseInt(mrp) - parseInt(currentMrp);
          d = parseInt(refferalPoint[0].refferalPoint);
          s = d / 4;

          console.log(parseInt(s));

          totalPay = parseInt(currentMrp) - parseInt(s);
          var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);

          if (get.length > 0) {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: totalDiscountAmounts.toString(),
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: totalPay.toString(),
              discount: discount.toString(),
              discountAmount: discountAmount.toString(),
              refferal: s.toString(),
              couponAmaunt: "0",
              couponCode: "",
              Data: gets,
              Message: " Data Found",
              carNumber: ""
            });
          } else {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: "0",
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: currentMrp.toString(),
              discount: "0",
              refferal: "0",
              couponAmaunt: "0",
              couponCode: "",
              discountAmount: discountAmount.toString(),
              Data: [],
              Message: "No Data Found",
              carNumber: ""
            });
          }
        } else if (status == 2) {
          console.log("discount code");

          const coupon = await discountCouponSchema.aggregate([
            {
              $match: {
                couponCode: discountCoupon,
              },
            },
          ]);
          console.log("1");
          console.log(coupon);
          const coupons = await couponUseSchema.aggregate([
            {
              $match: {
                couponCode: coupon[0].couponCode,
              },
            },
          ]);
          console.log("1");
          if (coupons.length == 1) {
            return res
              .status(200)
              .json({ IsSuccess: true, Message: "Coupon Already Use" });
          }

          console.log("1");

          console.log(coupon);

          const get = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "userdetails",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
          ]);
          console.log("1");
          currentMrp = 0;
          mrp = 0;
          discount = 0;
          delivery = 0;

          for (let i = 0; i < get.length; i++) {
            for (let j = 0; j < get[i].serviceDetails.length; j++) {
              console.log(get[i].serviceDetails[j].currentMrp);
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }
          }
          de = "";
          if (delivery == 0) {
            de = "Free";
          } else {
            de = delivery;
          }
          console.log("1");
          const favorite = await favoriteSchema.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);
          arr = [];
          // for(let i = 0 ; i < get.length ;i++){
          //   for(let j = 0 ; j < favorite.length ;j++){
          //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
          //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
          const gets = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);

          discount =
            ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

          discountAmount = parseInt(mrp) - parseInt(currentMrp);
          totalPay = 0;
          if (currentMrp < coupon[0].minimumAmount) {
            return res.status(200).json({
              IsSuccess: true,
              Data: [],
              Message: "Minmum Amount " + coupon[0].minimumAmount,
            });
          } else {
            totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
          }

          pay = 0;

          if (totalPay >= 0) {
          } else {
            totalPay = pay;
          }

          var totalDiscountAmount =
            parseInt(coupon[0].discount) + parseInt(discountAmount);

          if (get.length > 0) {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: totalDiscountAmount.toString(),
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: totalPay.toString(),
              discountAmount: discountAmount.toString(),
              discount: discount.toString(),
              couponAmaunt: coupon[0].discount,
              refferal: "0",
              couponCode: discountCoupon,
              Data: gets,
              Message: " Data Found",
              carNumber: ""
            });
          } else {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: totalDiscountAmount.toString(),
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: currentMrp.toString(),
              discount: "0",
              refferal: "0",
              couponAmaunt: "0",
              couponCode: "",
              discountAmount: discountAmount.toString(),
              Data: [],
              Message: "No Data Found",
              carNumber: ""
            });
          }
        } else {
          console.log("noo code");
          const refferalPoint = await userDetailsSchema.aggregate([
            {
              $match: {
                _id: mongoose.Types.ObjectId(userId),
              },
            },
          ]);

          const get = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "userdetails",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },
          ]);
          console.log(get);

          currentMrp = 0;
          mrp = 0;
          discount = 0;
          delivery = 0;

          for (let i = 0; i < get.length; i++) {
            console.log(i);
            for (let j = 0; j < get[i].serviceDetails.length; j++) {
              console.log(get[i].serviceDetails[j].currentMrp);
              currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
              mrp += parseInt(get[i].serviceDetails[j].mrp);
              delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
            }
          }
          de = "";
          if (delivery == 0) {
            de = "Free";
          } else {
            de = delivery;
          }

          const favorite = await favoriteSchema.aggregate([
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
              },
            },
          ]);
          arr = [];
          // for(let i = 0 ; i < get.length ;i++){
          //   for(let j = 0 ; j < favorite.length ;j++){
          //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
          //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
          const gets = await addToCartSchema2.aggregate([
            {
              $match: {
                $and: [
                  {
                    userId: mongoose.Types.ObjectId(userId),
                  },
                  {
                    status: 0,
                  },
                  {
                    carModelId: mongoose.Types.ObjectId(
                      getuserCar[0].carModelId
                    ),
                  },
                  {
                    fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "servicedata2",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceDetails",
              },
            },

            { $unwind: "$serviceDetails" },
            {
              $project: {
                "serviceDetails.title": 1,
                "serviceDetails.image": 1,
                "serviceDetails.mrp": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails.discount": 1,
                "serviceDetails.currentMrp": 1,
                "serviceDetails._id": 1,
              },
            },
          ]);

          discount =
            ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
          discountAmount = parseInt(mrp) - parseInt(currentMrp);
          point = "100";

          // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
          //   totalPay = parseInt(currentMrp) - parseInt(point)
          // }else{
          //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
          // }

          if (get.length > 0) {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: discountAmount.toString(),
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: currentMrp.toString(),
              discount: discount.toString(),
              refferal: "0",
              couponAmaunt: "0",
              couponCode: "",
              discountAmount: discountAmount.toString(),
              Data: gets,
              Message: " Data Found",
              carNumber: ""
            });
          } else {
            return res.status(200).json({
              IsSuccess: true,
              count: gets.length,
              totalDiscountAmount: "0",
              deliveryCharges: de.toString(),
              currentMrp: currentMrp.toString(),
              mrp: mrp.toString(),
              totalPay: currentMrp.toString(),
              discount: "0",
              refferal: "0",
              couponAmaunt: "0",
              couponCode: "",
              discountAmount: discountAmount.toString(),
              Data: [],
              Message: "No Data Found",
              carNumber: ""
            });
          }
        }
      }
    } else {
      return res.status(200).json({
        IsSuccess: false,
        Data: [],
        count: 0,
        Message: "User Not Selected Any Car",
      });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

// router.post("/getAddToCart_v5", async function (req, res) {
//   try {
//     const { userId, discountCoupon, refferal, status } = req.body;

//     let authToken = req.headers["authorization"];

//     // if (
//     //   authToken != config.tockenIs ||
//     //   authToken == null ||
//     //   authToken == undefined
//     // ) {
//     //   return res.status(200).json({
//     //     IsSuccess: false,
//     //     Data: [],
//     //     Message: "You are not authenticated",
//     //   });
//     // }

//     const getMember = await userDetailsSchema.aggregate([
//       {
//         $match: {
//           _id: mongoose.Types.ObjectId(userId),
//         },
//       },
//     ]);

//     const getuserCar = await userCarsSchema.aggregate([
//       {
//         $match: {
//           $and: [
//             {
//               userId: mongoose.Types.ObjectId(userId),
//             },
//             {
//               status: 1,
//             },
//           ],
//         },
//       },
//     ]);

//     console.log("SelectedCar", getuserCar.length);
//     console.log("SelectedCar", getMember);

//     //console.log(getMember)

//     if (getuserCar.length == 1) {
//       if (getMember[0].memberShipStatus == 1) {
//         console.log("MemberShip parson");

//         //console.log(discountCouponId)
//         if (status == 1) {
//           console.log("refferal code");
//           console.log("1");
//           const refferalPoint = await userDetailsSchema.aggregate([
//             {
//               $match: {
//                 _id: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);

//           const checkMemberShip = await userMemberShip.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);

//           let attachedCar;
//           if (checkMemberShip[0].carId.toString() == getuserCar[0].carModelId.toString()) {
//             attachedCar = true
//           } else {
//             attachedCar = false
//           }

//           //   console.log(checkMemberShip[0].service)

//           console.log("1");

//           const get = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(getuserCar[0].carModelId),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "userdetails",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "userDetails",
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//           ]);

//           console.log("Car details ", get);
//           console.log("addtocart");
//           currentMrp = 0;
//           mrp = 0;
//           discount = 0;
//           delivery = 0;
//           let existIds = [];
//           // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
//           for (let i = 0; i < get.length; i++) {
//             console.log(get);
//             console.log("jjjjjjjjjj");
//             for (let j = 0; j < get[0].serviceDetails.length; j++) {
//               //   console.log("data" + get[0].serviceDetails[j])
//               //console.log(checkMemberShip[0].service)
//               const found = checkMemberShip[0].service.find(
//                 (element) =>
//                   element.serviceId.toString() == get[i].serviceId.toString()
//               );
//               //console.log(element.serviceId)
//               console.log("notttttttt");
//               console.log(found);
//               if ((found != undefined || found != null) && attachedCar == true) {
//                   console.log(found);
//                   existIds.push(get[i].serviceDetails[j]._id);
//                   d = get[i].serviceDetails[j].currentMrp;
//                   var currentMrps = d;
//                   console.log("0 total");
//                   currentMrp += 0;
//                   console.log(currentMrp + "  currentMrp");
//                   mrp += 0;
//                   delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//               } else {
//                 console.log("1 total");
//                 // existIds.push(get[j].serviceId)
//                 currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
//                 //  console.log(currentMrp)
//                 mrp += parseInt(get[i].serviceDetails[j].mrp);
//                 delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//               }

//               // }
//             }
//           }
//           console.log(existIds);
//           const pets = [];

//           //console.log(pets.includes());

//           const array1 = get;

//           //   return false
//           de = "";
//           if (delivery == 0) {
//             de = "Free";
//           } else {
//             de = delivery;
//           }

//           const favorite = await favoriteSchema.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);
//           arr = [];
//           // for(let i = 0 ; i < get.length ;i++){
//           //   for(let j = 0 ; j < favorite.length ;j++){
//           //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
//           //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
//           console.log("exist ids");
//           // console.log(existIds);
//           const gets = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 let: { serviceId: "$serviceId" },
//                 pipeline: [
//                   {
//                     $match: {
//                       $expr: {
//                         $eq: ["$_id", "$$serviceId"],
//                       },
//                     },
//                   },
//                   {
//                     $set: {
//                       mrp: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$mrp",
//                         },
//                       },
//                       currentMrp: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$currentMrp",
//                         },
//                       },
//                       discount: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$discount",
//                         },
//                       },
//                     },
//                   },
//                 ],
//                 as: "serviceDetails",
//               },
//             },

//             { $unwind: "$serviceDetails" },
//             {
//               $project: {
//                 "serviceDetails.title": 1,
//                 "serviceDetails.image": 1,
//                 "serviceDetails.mrp": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails.discount": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails._id": 1,
//               },
//             },
//           ]);
//           // console.log(gets)
//           //console.log(parseInt(mrp)-parseInt(currentMrp))
//           console.log(currentMrp);
//           fd = parseInt(mrp) - parseInt(currentMrp);
//           // console.log(fd)
//           // console.log("kkk")
//           if (fd == 0) {
//             tg = 0;
//             //   console.log(tg)
//           } else {
//             tg = fd / parseInt(mrp);
//             //  console.log(tg)
//           }

//           discount = tg * 100;

//           d = parseInt(refferalPoint[0].refferalPoint);
//           // console.log(d)
//           if (d == 0) {
//             s = d;
//           } else {
//             s = d / 4;
//           }
//           // console.log("kevil")
//           // console.log(mrp)
//           //  console.log(currentMrp )
//           //  console.log("no")
//           discountAmount = parseInt(mrp) - parseInt(currentMrp);
//           //console.log(discountAmount)
//           //console.log(parseInt(s))

//           //console.log(parseInt(discountAmount))

//           // console.log(currentMrp + "total")

//           if (currentMrp == 0) {
//             totalPay = parseInt(currentMrp) - 0;
//           } else {
//             totalPay = parseInt(currentMrp) - parseInt(s);
//           }

//           //totalPay = parseInt(currentMrp) - parseInt(s)

//           var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);
//           console.log("hello");
//           // console.log(currentMrp)
//           //  console.log(totalDiscountAmounts + "totalDiscountAmounts")
//           ////  console.log(totalPay)
//           //  console.log(discountAmount)
//           //  console.log(s)

//           if (get.length > 0) {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: totalDiscountAmounts.toString(),
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               discountAmount: discountAmount.toString(),
//               mrp: mrp.toString(),
//               totalPay: totalPay.toString(),
//               discount: discount.toString(),
//               refferal: s.toString(),
//               couponAmaunt: "0",
//               couponCode: "",
//               Data: gets,
//               Message: " Data Found",
//             });
//           } else {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: "0",
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               discountAmount: discountAmount.toString(),
//               mrp: mrp.toString(),
//               totalPay: "0",
//               discount: "0",
//               refferal: s.toString(),
//               couponAmaunt: "0",
//               couponCode: "",
//               Data: [],
//               Message: "No Data Found",
//             });
//           }
//         } else if (status == 2) {
//           console.log("discount code");

//           const coupon = await discountCouponSchema.aggregate([
//             {
//               $match: {
//                 couponCode: discountCoupon,
//               },
//             },
//           ]);
//           const checkMemberShip = await userMemberShip.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);


//           let attachedCar;
//           if (checkMemberShip[0].carId.toString() == getuserCar[0].carModelId.toString()) {
//             attachedCar = true
//           } else {
//             attachedCar = false
//           }

//           console.log(checkMemberShip[0].service);
//           console.log(coupon);

//           const coupons = await couponUseSchema.aggregate([
//             {
//               $match: {
//                 couponCode: coupon[0].couponCode,
//               },
//             },
//           ]);
//           console.log(coupons);

//           if (coupons.length > 1) {
//             return res
//               .status(200)
//               .json({ IsSuccess: true, Message: "Coupon Already Use" });
//           }

//           //console.log(coupon)

//           const get = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "userdetails",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "userDetails",
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//           ]);

//           currentMrp = 0;
//           mrp = 0;
//           discount = 0;
//           delivery = 0;

//           let existIds = [];
//           // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
//           for (let i = 0; i < get.length; i++) {
//             console.log(get);

//             for (let j = 0; j < get[0].serviceDetails.length; j++) {
//               const found = checkMemberShip[0].service.find(
//                 (element) =>
//                   element.serviceId.toString() == get[i].serviceId.toString()
//               );
//               console.log(found);
//               if ((found != undefined || found != null) && attachedCar == true) {
//                 existIds.push(get[i].serviceDetails[j]._id);
//                 currentMrp += 0;
//                 mrp += 0;
//                 delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//               } else {
//                 currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
//                 mrp += parseInt(get[i].serviceDetails[j].mrp);
//                 delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//               }

//               // }
//             }
//           }
//           de = "";
//           if (delivery == 0) {
//             de = "Free";
//           } else {
//             de = delivery;
//           }

//           const favorite = await favoriteSchema.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);
//           arr = [];
//           // for(let i = 0 ; i < get.length ;i++){
//           //   for(let j = 0 ; j < favorite.length ;j++){
//           //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
//           //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
//           console.log("exist ids");
//           console.log(existIds);
//           const gets = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedatas",
//                 let: { serviceId: "$serviceId" },
//                 pipeline: [
//                   {
//                     $match: {
//                       $expr: {
//                         $eq: ["$_id", "$$serviceId"],
//                       },
//                     },
//                   },
//                   {
//                     $set: {
//                       mrp: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$mrp",
//                         },
//                       },
//                       currentMrp: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$currentMrp",
//                         },
//                       },
//                       discount: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$discount",
//                         },
//                       },
//                     },
//                   },
//                 ],
//                 as: "serviceDetails",
//               },
//             },

//             { $unwind: "$serviceDetails" },
//             {
//               $project: {
//                 "serviceDetails.title": 1,
//                 "serviceDetails.image": 1,
//                 "serviceDetails.mrp": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails.discount": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails._id": 1,
//               },
//             },
//           ]);

//           discount =
//             ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

//           discountAmount = parseInt(mrp) - parseInt(currentMrp);

//           totalPay = 0;
//           if (currentMrp < coupon[0].minimumAmount) {
//             return res.status(200).json({
//               IsSuccess: true,
//               Data: [],
//               Message: "Minmum Amount " + coupon[0].minimumAmount,
//             });
//           } else {
//             totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
//           }

//           pay = 0;

//           if (totalPay >= 0) {
//           } else {
//             totalPay = pay;
//           }

//           if (get.length > 0) {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: discountAmount.toString(),
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: totalPay.toString(),
//               discount: discount.toString(),
//               discountAmount: discountAmount.toString(),
//               couponAmaunt: coupon[0].discount,
//               refferal: "0",
//               couponCode: discountCoupon,
//               Data: gets,
//               Message: " Data Found",
//             });
//           } else {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: "0",
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: currentMrp.toString(),
//               discount: "0",
//               refferal: "0",
//               couponAmaunt: "0",
//               couponCode: "",
//               discountAmount: discountAmount.toString(),
//               Data: [],
//               Message: "No Data Found",
//             });
//           }
//         } else {
//           //console.log("refferal code")
//           const refferalPoint = await userDetailsSchema.aggregate([
//             {
//               $match: {
//                 _id: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);
//           const checkMemberShip = await userMemberShip.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);

//           console.log(checkMemberShip[0].service);

//           let attachedCar;
//           if (checkMemberShip[0].carId.toString() == getuserCar[0].carModelId.toString()) {
//             attachedCar = true
//           } else {
//             attachedCar = false
//           }

//           console.log("0");
//           const get = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "userdetails",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "userDetails",
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//           ]);

//           currentMrp = 0;
//           mrp = 0;
//           discount = 0;
//           delivery = 0;

//           let existIds = [];
//           // for(let k = 0 ; k < checkMemberShip[0].service.length;k++){
//           for (let i = 0; i < get.length; i++) {
//             console.log(get);
//             console.log("1");
//             console.log(get[i].serviceId.toString())
//             for (let j = 0; j < get[0].serviceDetails.length; j++) {
//               console.log("2");
//               const found = checkMemberShip[0].service.find(
//                 (element) =>
//                   element.serviceId.toString() == get[i].serviceId.toString()
//               );
//               console.log("3");
//               console.log(found);
//               if ((found != undefined || found != null) && attachedCar == true) {
//                 existIds.push(get[i].serviceDetails[j]._id);
//                 currentMrp += 0;
//                 mrp += 0;
//                 delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//               } else {
//                 currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
//                 mrp += parseInt(get[i].serviceDetails[j].mrp);
//                 delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//               }

//               // }
//             }
//           }
//           de = "";
//           if (delivery == 0) {
//             de = "Free";
//           } else {
//             de = delivery;
//           }

//           const favorite = await favoriteSchema.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);
//           arr = [];
//           // for(let i = 0 ; i < get.length ;i++){
//           //   for(let j = 0 ; j < favorite.length ;j++){
//           //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
//           //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
//           console.log("exist ids");
//           console.log(existIds);
//           const gets = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 let: { serviceId: "$serviceId" },
//                 pipeline: [
//                   {
//                     $match: {
//                       $expr: {
//                         $eq: ["$_id", "$$serviceId"],
//                       },
//                     },
//                   },
//                   {
//                     $set: {
//                       mrp: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$mrp",
//                         },
//                       },
//                       currentMrp: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$currentMrp",
//                         },
//                       },
//                       discount: {
//                         $cond: {
//                           if: { $in: ["$_id", existIds] },
//                           then: "0",
//                           else: "$discount",
//                         },
//                       },
//                     },
//                   },
//                 ],
//                 as: "serviceDetails",
//               },
//             },
//             { $unwind: "$serviceDetails" },
//             {
//               $project: {
//                 "serviceDetails.title": 1,
//                 "serviceDetails.image": 1,
//                 "serviceDetails.mrp": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails.discount": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails._id": 1,
//               },
//             },
//           ]);
//           console.log("4");
//           //console.log(gets[1].serviceDetails.mrp)
//           console.log("5");
//           console.log(mrp, currentMrp);

//           if (parseInt(mrp) == 0 && parseInt(currentMrp) == 0) {
//             discount = 0;
//           } else {
//             discount =
//               ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
//           }

//           console.log(discount);
//           discountAmount = parseInt(mrp) - parseInt(currentMrp);
//           point = "100";
//           console.log("kevil");
//           // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
//           //   totalPay = parseInt(currentMrp) - parseInt(point)
//           // }else{
//           //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
//           // }

//           if (get.length > 0) {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: discountAmount.toString(),
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: currentMrp.toString(),
//               discountAmount: discountAmount.toString(),
//               discount: discount.toString(),
//               refferal: "0",
//               couponAmaunt: "0",
//               couponCode: "",
//               Data: gets,
//               Message: " Data Found",
//             });
//           } else {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: "0",
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: currentMrp.toString(),
//               discount: "0",
//               refferal: "0",
//               couponAmaunt: "0",
//               couponCode: "",
//               discountAmount: discountAmount.toString(),
//               Data: [],
//               Message: "No Data Found",
//             });
//           }
//         }
//       } else {
//         console.log(discountCoupon);
//         if (status == 1) {
//           console.log("refferal code");
//           const refferalPoint = await userDetailsSchema.aggregate([
//             {
//               $match: {
//                 _id: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);

//           const get = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "userdetails",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "userDetails",
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//           ]);

//           currentMrp = 0;
//           mrp = 0;
//           discount = 0;
//           delivery = 0;

//           for (let i = 0; i < get.length; i++) {
//             for (let j = 0; j < get[i].serviceDetails.length; j++) {
//               //console.log(get[i].serviceDetails[j].currentMrp)
//               currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
//               mrp += parseInt(get[i].serviceDetails[j].mrp);
//               delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//             }
//           }
//           de = "";
//           if (delivery == 0) {
//             de = "Free";
//           } else {
//             de = delivery;
//           }

//           const favorite = await favoriteSchema.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);
//           arr = [];
//           // for(let i = 0 ; i < get.length ;i++){
//           //   for(let j = 0 ; j < favorite.length ;j++){
//           //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
//           //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
//           const gets = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//             { $unwind: "$serviceDetails" },
//             {
//               $project: {
//                 "serviceDetails.title": 1,
//                 "serviceDetails.image": 1,
//                 "serviceDetails.mrp": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails.discount": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails._id": 1,
//               },
//             },
//           ]);

//           discount =
//             ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
//           discountAmount = parseInt(mrp) - parseInt(currentMrp);
//           d = parseInt(refferalPoint[0].refferalPoint);
//           s = d / 4;

//           console.log(parseInt(s));

//           totalPay = parseInt(currentMrp) - parseInt(s);
//           var totalDiscountAmounts = parseInt(s) + parseInt(discountAmount);

//           if (get.length > 0) {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: totalDiscountAmounts.toString(),
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: totalPay.toString(),
//               discount: discount.toString(),
//               discountAmount: discountAmount.toString(),
//               refferal: s.toString(),
//               couponAmaunt: "0",
//               couponCode: "",
//               Data: gets,
//               Message: " Data Found",
//             });
//           } else {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: "0",
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: currentMrp.toString(),
//               discount: "0",
//               refferal: "0",
//               couponAmaunt: "0",
//               couponCode: "",
//               discountAmount: discountAmount.toString(),
//               Data: [],
//               Message: "No Data Found",
//             });
//           }
//         } else if (status == 2) {
//           console.log("discount code");

//           const coupon = await discountCouponSchema.aggregate([
//             {
//               $match: {
//                 couponCode: discountCoupon,
//               },
//             },
//           ]);
//           console.log("1");
//           console.log(coupon);
//           const coupons = await couponUseSchema.aggregate([
//             {
//               $match: {
//                 couponCode: coupon[0].couponCode,
//               },
//             },
//           ]);
//           console.log("1");
//           if (coupons.length == 1) {
//             return res
//               .status(200)
//               .json({ IsSuccess: true, Message: "Coupon Already Use" });
//           }

//           console.log("1");

//           console.log(coupon);

//           const get = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "userdetails",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "userDetails",
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//           ]);
//           console.log("1");
//           currentMrp = 0;
//           mrp = 0;
//           discount = 0;
//           delivery = 0;

//           for (let i = 0; i < get.length; i++) {
//             for (let j = 0; j < get[i].serviceDetails.length; j++) {
//               console.log(get[i].serviceDetails[j].currentMrp);
//               currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
//               mrp += parseInt(get[i].serviceDetails[j].mrp);
//               delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//             }
//           }
//           de = "";
//           if (delivery == 0) {
//             de = "Free";
//           } else {
//             de = delivery;
//           }
//           console.log("1");
//           const favorite = await favoriteSchema.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);
//           arr = [];
//           // for(let i = 0 ; i < get.length ;i++){
//           //   for(let j = 0 ; j < favorite.length ;j++){
//           //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
//           //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
//           const gets = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//             { $unwind: "$serviceDetails" },
//             {
//               $project: {
//                 "serviceDetails.title": 1,
//                 "serviceDetails.image": 1,
//                 "serviceDetails.mrp": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails.discount": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails._id": 1,
//               },
//             },
//           ]);

//           discount =
//             ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;

//           discountAmount = parseInt(mrp) - parseInt(currentMrp);
//           totalPay = 0;
//           if (currentMrp < coupon[0].minimumAmount) {
//             return res.status(200).json({
//               IsSuccess: true,
//               Data: [],
//               Message: "Minmum Amount " + coupon[0].minimumAmount,
//             });
//           } else {
//             totalPay = parseInt(currentMrp) - parseInt(coupon[0].discount);
//           }

//           pay = 0;

//           if (totalPay >= 0) {
//           } else {
//             totalPay = pay;
//           }

//           var totalDiscountAmount =
//             parseInt(coupon[0].discount) + parseInt(discountAmount);

//           if (get.length > 0) {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: totalDiscountAmount.toString(),
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: totalPay.toString(),
//               discountAmount: discountAmount.toString(),
//               discount: discount.toString(),
//               couponAmaunt: coupon[0].discount,
//               refferal: "0",
//               couponCode: discountCoupon,
//               Data: gets,
//               Message: " Data Found",
//             });
//           } else {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: totalDiscountAmount.toString(),
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: currentMrp.toString(),
//               discount: "0",
//               refferal: "0",
//               couponAmaunt: "0",
//               couponCode: "",
//               discountAmount: discountAmount.toString(),
//               Data: [],
//               Message: "No Data Found",
//             });
//           }
//         } else {
//           console.log("noo code");
//           const refferalPoint = await userDetailsSchema.aggregate([
//             {
//               $match: {
//                 _id: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);

//           const get = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "userdetails",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "userDetails",
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },
//           ]);
//           console.log(get);

//           currentMrp = 0;
//           mrp = 0;
//           discount = 0;
//           delivery = 0;

//           for (let i = 0; i < get.length; i++) {
//             console.log(i);
//             for (let j = 0; j < get[i].serviceDetails.length; j++) {
//               console.log(get[i].serviceDetails[j].currentMrp);
//               currentMrp += parseInt(get[i].serviceDetails[j].currentMrp);
//               mrp += parseInt(get[i].serviceDetails[j].mrp);
//               delivery += parseInt(get[i].serviceDetails[j].deliveryCharges);
//             }
//           }
//           de = "";
//           if (delivery == 0) {
//             de = "Free";
//           } else {
//             de = delivery;
//           }

//           const favorite = await favoriteSchema.aggregate([
//             {
//               $match: {
//                 userId: mongoose.Types.ObjectId(userId),
//               },
//             },
//           ]);
//           arr = [];
//           // for(let i = 0 ; i < get.length ;i++){
//           //   for(let j = 0 ; j < favorite.length ;j++){
//           //  //   console.log(get[i].serviceId.toString() +" == "+ favorite[j].serviceId.toString())
//           //     if(get[i].serviceId.toString() == favorite[j].serviceId.toString()){
//           const gets = await addToCartSchema2.aggregate([
//             {
//               $match: {
//                 $and: [
//                   {
//                     userId: mongoose.Types.ObjectId(userId),
//                   },
//                   {
//                     status: 0,
//                   },
//                   {
//                     carModelId: mongoose.Types.ObjectId(
//                       getuserCar[0].carModelId
//                     ),
//                   },
//                   {
//                     fuelTypeId: mongoose.Types.ObjectId(getuserCar[0].fuelTypeId),
//                   },
//                 ],
//               },
//             },
//             {
//               $lookup: {
//                 from: "servicedata2",
//                 localField: "serviceId",
//                 foreignField: "_id",
//                 as: "serviceDetails",
//               },
//             },

//             { $unwind: "$serviceDetails" },
//             {
//               $project: {
//                 "serviceDetails.title": 1,
//                 "serviceDetails.image": 1,
//                 "serviceDetails.mrp": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails.discount": 1,
//                 "serviceDetails.currentMrp": 1,
//                 "serviceDetails._id": 1,
//               },
//             },
//           ]);

//           discount =
//             ((parseInt(mrp) - parseInt(currentMrp)) / parseInt(mrp)) * 100;
//           discountAmount = parseInt(mrp) - parseInt(currentMrp);
//           point = "100";

//           // if(parseInt(refferalPoint[0].refferalPoint) >= parseInt(point)){
//           //   totalPay = parseInt(currentMrp) - parseInt(point)
//           // }else{
//           //   totalPay = parseInt(currentMrp) - parseInt(refferalPoint[0].refferalPoint)
//           // }

//           if (get.length > 0) {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: discountAmount.toString(),
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: currentMrp.toString(),
//               discount: discount.toString(),
//               refferal: "0",
//               couponAmaunt: "0",
//               couponCode: "",
//               discountAmount: discountAmount.toString(),
//               Data: gets,
//               Message: " Data Found",
//             });
//           } else {
//             return res.status(200).json({
//               IsSuccess: true,
//               count: gets.length,
//               totalDiscountAmount: "0",
//               deliveryCharges: de.toString(),
//               currentMrp: currentMrp.toString(),
//               mrp: mrp.toString(),
//               totalPay: currentMrp.toString(),
//               discount: "0",
//               refferal: "0",
//               couponAmaunt: "0",
//               couponCode: "",
//               discountAmount: discountAmount.toString(),
//               Data: [],
//               Message: "No Data Found",
//             });
//           }
//         }
//       }
//     } else {
//       return res.status(200).json({
//         IsSuccess: false,
//         Data: [],
//         count: 0,
//         Message: "User Not Selected Any Car",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message });
//   }
// });


router.post("/deleteAddToCart", async function (req, res, next) {
  try {
    const { cartId } = req.body;

    let deletes = await addToCartSchema2.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(cartId),
        },
      },
    ]);

    if (deletes.length == 1) {
      let deleteData = await addToCartSchema2.findByIdAndDelete(cartId);
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

router.post("/getAddtoCartCheckStatus", async function (req, res) {
  try {
    const { userId, serviceId } = req.body;

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

    const get = await addToCartSchema.aggregate([
      {
        $match: {
          $and: [
            { userId: mongoose.Types.ObjectId(userId) },
            { serviceId: mongoose.Types.ObjectId(serviceId) },
            { status: 0 },
          ],
        },
      },
    ]);

    if (get.length >= 1) {
      return res.status(200).json({
        IsSuccess: true,
        Data: [],
        status: 1,
        Message: "if user already have an cart data",
      });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], status: 0, Message: "Not Added" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getAddtoCartCheckStatus_v5", async function (req, res) {
  try {
    const { userId, serviceId } = req.body;

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

    const getSelectedUserCar = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    if (getSelectedUserCar.length == 1) {
      const get = await addToCartSchema2.aggregate([
        {
          $match: {
            $and: [
              { userId: mongoose.Types.ObjectId(userId) },
              { serviceId: mongoose.Types.ObjectId(serviceId) },
              { status: 0 },
            ],
          },
        },
      ]);

      if (get.length >= 1) {
        return res.status(200).json({
          IsSuccess: true,
          Data: [],
          status: 1,
          Message: "if user already have an cart data",
        });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], status: 0, Message: "Not Added" });
      }
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Message: "User Not Selected Car" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//-------------------user use dicount coupon---------
router.post("/getUseDiscoutCoupon", async function (req, res) {
  try {
    const { userId, couponCode, amount } = req.body;

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

    const discount = await discountCouponSchema.aggregate([
      {
        $match: {
          couponCode: couponCode,
        },
      },
    ]);

    console.log(discount);

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);
    console.log(get);

    if (discount[0].chackMemberShip == get[0].memberShipStatus) {
      if (parseInt(discount[0].minimumAmount) <= parseInt(amount)) {
        const discount = await discountCouponSchema.aggregate([
          {
            $match: {
              couponCode: couponCode,
            },
          },
        ]);
        if (get.length > 0) {
          return res.status(200).json({
            IsSuccess: true,
            count: discount.length,
            Data: discount,
            Message: "Coupon Apply",
          });
        } else {
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [], Message: "No Apply" });
        }
      } else {
        return res.status(200).json({
          IsSuccess: true,
          Data: [],
          Message: "No Apply Plzz minimum amount",
        });
      }
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Coupon Not Apply" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//-------------referral And Earn ----------kevil------------

router.post("/addReferralAndEarn", async function (req, res) {
  try {
    const { userCode, referralCode, userId } = req.body;

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

    const file = req.file;
    const setting = await settingSchema.aggregate([
      {
        $match: {},
      },
    ]);

    console.log(setting);

    const user = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    if (user[0].randomNo == referralCode) {
      return res.status(200).json({
        IsSuccess: true,
        Data: [],
        Message: "your number and referral number are same",
      });
    }

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          randomNo: referralCode,
        },
      },
    ]);

    const users = await referralAndEarnSchema.aggregate([
      {
        $match: {
          userCode: user[0].randomNo,
        },
      },
    ]);
    console.log(users);

    const refferal = await referralAndEarnSchema.aggregate([
      {
        $match: {
          referralCode: referralCode,
        },
      },
    ]);
    console.log(refferal.length);

    if (users.length >= 1 && refferal.length >= 1) {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Already Use" });
    } else if (users.length == 0 && refferal.length >= 1) {
      total =
        parseInt(parseInt(user[0].refferalPoint)) +
        parseInt(setting[0].userCode);

      let updateIs;
      updateIs = {
        refferalPoint: total.toString(),
      };

      let updateIss = await userDetailsSchema.findByIdAndUpdate(
        user[0]._id,
        updateIs
      );
      //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

      const add = await new referralAndEarnSchema({
        userCode: user[0].randomNo,
        referralCode: referralCode,
      });

      if (add != null) {
        await add.save();
        console.log(add);
        const adds = await new referralAndEarnSchema({
          userCode: add.referralCode,
          referralCode: add.userCode,
        });

        const gets = await userDetailsSchema.aggregate([
          {
            $match: {
              $and: [{ randomNo: add.referralCode }],
            },
          },
        ]);
        total =
          parseInt(parseInt(gets[0].refferalPoint)) +
          parseInt(setting[0].referralCode);

        let updateIs;
        updateIs = {
          refferalPoint: total.toString(),
        };

        let updateIss = await userDetailsSchema.findByIdAndUpdate(
          gets[0]._id,
          updateIs
        );
        if (adds != null) {
          await adds.save();
          console.log("Data Added");
        } else {
          console.log("error");
        }
        return res
          .status(200)
          .json({ IsSuccess: true, Data: add, Message: "Coupon Valid" });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
      }
    } else if (users.length >= 1 && refferal.length == 0) {
      total =
        parseInt(parseInt(user[0].refferalPoint)) +
        parseInt(setting[0].referralCode);

      let updateIs;
      updateIs = {
        refferalPoint: total.toString(),
      };

      let updateIss = await userDetailsSchema.findByIdAndUpdate(
        user[0]._id,
        updateIs
      );
      //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

      const add = await new referralAndEarnSchema({
        userCode: user[0].randomNo,
        referralCode: referralCode,
      });

      if (add != null) {
        await add.save();
        console.log(add);
        const adds = await new referralAndEarnSchema({
          userCode: add.referralCode,
          referralCode: add.userCode,
        });

        const gets = await userDetailsSchema.aggregate([
          {
            $match: {
              $and: [{ randomNo: add.referralCode }],
            },
          },
        ]);
        total =
          parseInt(parseInt(gets[0].refferalPoint)) +
          parseInt(setting[0].userCode);

        let updateIs;
        updateIs = {
          refferalPoint: total.toString(),
        };

        let updateIss = await userDetailsSchema.findByIdAndUpdate(
          gets[0]._id,
          updateIs
        );
        if (adds != null) {
          await adds.save();
          console.log("Data Added");
        } else {
          console.log("error");
        }
        return res
          .status(200)
          .json({ IsSuccess: true, Data: add, Message: "Coupon Valid" });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
      }
    } else if (users.length == 0 && refferal.length == 0) {
      console.log("0 0 ");
      total = parseInt(user[0].refferalPoint) + parseInt(setting[0].userCode);
      console.log("1");
      let updateIs;
      updateIs = {
        refferalPoint: total.toString(),
      };

      let updateIss = await userDetailsSchema.findByIdAndUpdate(
        user[0]._id,
        updateIs
      );
      //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

      const add = await new referralAndEarnSchema({
        userCode: user[0].randomNo,
        referralCode: referralCode,
      });

      if (add != null) {
        await add.save();
        console.log(add);
        const adds = await new referralAndEarnSchema({
          userCode: add.referralCode,
          referralCode: add.userCode,
        });

        const gets = await userDetailsSchema.aggregate([
          {
            $match: {
              $and: [{ randomNo: add.referralCode }],
            },
          },
        ]);
        total =
          parseInt(gets[0].refferalPoint) + parseInt(setting[0].referalCode);

        let updateIs;
        updateIs = {
          refferalPoint: total.toString(),
        };

        let updateIss = await userDetailsSchema.findByIdAndUpdate(
          gets[0]._id,
          updateIs
        );
        if (adds != null) {
          await adds.save();
          console.log("Data Added");
        } else {
          console.log("error");
        }

        return res
          .status(200)
          .json({ IsSuccess: true, Data: add, Message: "Coupon Valid" });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], Message: "Coupon Not Valid" });
      }
    }

    // if(get.length >= 1){

    //   const gets = await referralAndEarnSchema.aggregate([{
    //     $match: {
    //       $and:[
    //         {userCode: user[0].randomNo},
    //         {referralCode: referralCode}
    //       ]
    //     }
    //   }
    //   ]);
    //   console.log(gets)
    //   if(gets.length >= 1){
    //     return res.status(200).json({ IsSuccess: true, Data:[], Message: 'Already Use' })
    //   }else{

    //     total = parseInt(parseInt(user[0].refferalPoint)) + 100

    //     let updateIs;
    //   updateIs = {
    //     refferalPoint : total.toString()
    //   }

    //   let updateIss = await userDetailsSchema.findByIdAndUpdate(user[0]._id, updateIs)
    //   //res.status(200).json({ IsSuccess: true, Data: updateIss, Message: `Updated Data` });

    //     const add = await new referralAndEarnSchema({
    //       userCode: user[0].randomNo,
    //       referralCode: referralCode
    //     });

    //     if (add != null) {
    //       await add.save()
    //       console.log(add)
    //       const adds = await new referralAndEarnSchema({
    //         userCode: add.referralCode,
    //         referralCode: add.userCode
    //       });

    //       const gets = await userDetailsSchema.aggregate([{
    //         $match: {
    //           $and:[
    //             {randomNo: add.referralCode}
    //           ]
    //         }
    //       }
    //       ]);
    //       total = parseInt(parseInt(gets[0].refferalPoint)) + 100

    //     let updateIs;
    //   updateIs = {
    //     refferalPoint : total.toString()
    //   }

    //   let updateIss = await userDetailsSchema.findByIdAndUpdate(gets[0]._id, updateIs)

    //       console.log(gets)

    //       if(adds != null){
    //         await adds.save()
    //         console.log("Data Added")
    //       }else{
    //         console.log("error")
    //       }
    //       return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
    //     } else {
    //       return res.status(200).json({ IsSuccess: true, Data:[], Message: 'Not Added Data' })
    //     }
    //   }

    // }else{
    //   return res.status(200).json({ IsSuccess: true, Data:[], Message: 'Nor Valid Referral Number' })
    // }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

//-----------user membership------------kevil------------
var x = 13; //or whatever offset
var CurrentDate = new Date();
//console.log(CurrentDate)

router.post("/addNewUserMemberShip", async function (req, res) {
  try {
    const {
      userId,
      memberShipId,
      razorePayOrderId,
      razorePayPaymentId,
      amount,
      carId,
      carNumber
    } = req.body;

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

    const getMemberShip = await memberShipSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(memberShipId),
        },
      },
    ]);

    console.log(getMemberShip[0].service);

    const get = await userMemberShipSchema.aggregate([
      {
        $match: {
          $and: [
            { userId: mongoose.Types.ObjectId(userId) },
            { memberShipId: mongoose.Types.ObjectId(memberShipId) },
          ],
        },
      },
    ]);

    if (get.length >= 1) {
      return res.status(200).json({ IsSuccess: true, Message: "Alredy Exits" });
    }

    var x = parseInt(getMemberShip[0].totalMonth);
    CurrentDate.setMonth(CurrentDate.getMonth() + x);
    var date = new Date(CurrentDate);
    date.toISOString().substring(0, 10);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    console.log(dt + "/" + month + "/" + year);
    var t = dt + "/" + month + "/" + year;
    // service icon
    let add = await new userMemberShipSchema({
      userId: userId,
      buyDateTime: getCurrentDateTime(),
      exDateTime: t,
      memberShipId: memberShipId,
      service: getMemberShip[0].service,
      razorePayOrderId: razorePayOrderId,
      razorePayPaymentId: razorePayPaymentId,
      amount: amount,
      carId: carId, // added jayshri 11 march 2023
      carNumber: carNumber
    });

    if (add != null) {
      await add.save();

      let updateIs;
      updateIs = {
        memberShipStatus: 1,
      };
      let updateIss = await userDetailsSchema.findByIdAndUpdate(
        userId,
        updateIs,
        { new: true }
      );

      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

router.post("/getUserMemberShip", async function (req, res) {
  try {
    const { userId } = req.body;
    console.log(userId);
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
    console.log(userId);

    const get = await userMemberShipSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "usermemberships",
          localField: "userId",
          foreignField: "userId",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
        },
      },
      {
        $lookup: {
          from: "memberships",
          localField: "memberShipId",
          foreignField: "_id",
          as: "memberShipUserId",
        },
      },
      {
        $unwind: {
          path: "$memberShipUserId",
        },
      },
      // {
      //   $lookup:{
      //     from: "memberships",
      //     localField: "memberShipDetails.memberShipId",
      //     foreignField: "_id",
      //     as: "memberShipDetails",
      //   }
      // },
      {
        $unwind: {
          path: "$service",
        },
      },
      {
        $lookup: {
          from: "servicedatas",
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
          // memberShipsss: { $push: '$$ROOT'},
          memberUserId: { $push: "$userDetails" },
          memberShipDetails: { $push: "$memberShipUserId" },
          memberShipDetailsMem: { $push: "$memberShipUserId.title" },
          memberShipDetailsDescription: {
            $push: "$memberShipUserId.description",
          },
          memberShipDetailsTimeLimit: { $push: "$memberShipUserId.timeTimit" },
          //memberShipDetailsTotalMonth:{$push: "$memberShipUserId.totalMonth" },
          memberShipDetailsPrice: { $push: "$memberShipUserId.price" },
          //memberShipDetailsExDateTime:{ $push: "$memberShipUserId" } ,
          memberService: {
            $push: "$service",
          },
        },
      },
      {
        $unwind: {
          path: "$memberShipDetails",
        },
      },
      // {
      //   $unwind:{
      //     path:"$memberShipDetailsTotalMonth"
      //   }
      // },
      {
        $unwind: {
          path: "$memberUserId",
        },
      },
      {
        $unwind: {
          path: "$memberShipDetailsMem",
        },
      },
      {
        $unwind: {
          path: "$memberShipDetailsDescription",
        },
      },
      // {
      //   $unwind:{
      //     path:"$memberShipDetailsExDateTime"
      //   }
      // },
      {
        $unwind: {
          path: "$memberShipDetailsTimeLimit",
        },
      },
      // {
      //   $unwind:{
      //     path:"$memberShipDetailsPrice"
      //   }
      // },
      //   {
      //     $group: {
      //         _id: '$_id',
      //         //memberShipId:'memberShipDetails.memberShipId',
      //         memberService: {
      //             $push: '$service'
      //         }
      //     }
      // },
      //   {
      //     $lookup: {
      //         from: 'memberships',
      //         localField: '_id',
      //         foreignField: '_id',
      //         as: 'orderDetails'
      //     }
      // },
      // {
      //   $unwind: {
      //       path: '$orderDetails'
      //   }
      // },
      // {
      //   $addFields: {
      //       'orderDetails.memberService': '$memberService'
      //   }
      // },
      // {
      //   $replaceRoot: {
      //       newRoot: '$orderDetails'
      //   }
      // },
      {
        $project: {
          userId: 1,
          "memberShipDetails.title": 1,
          "memberShipDetails.description": 1,
          "memberShipDetails.timeTimit": 1,
          "memberShipDetails.price": 1,
          "memberShipDetails.totalMonth": 1,
          "memberUserId._id": 1,
          "memberUserId.memberShipId": 1,
          "memberUserId.buyDateTime": 1,
          "memberUserId.exDateTime": 1,
          //"memberShipDetailsMem":1,
          // "memberShipDetailsDescription":1,
          // "memberShipDetailsTimeLimit":1,
          // "memberShipDetailsPrice":1,
          //"memberShipDetailsTotalMonth":1,
          // "memberShipDetailsExDateTime":1,
          // "books.buyDateTime":1,
          // "books.exDateTime":1,
          // "books.amount":1,
          // "books.userId":1,
          _id: 1,
          // "userDetails.buyDateTime":1,
          buyDateTime: 1,
          exDateTime: 1,
          amount: 1,
          "memberService.qty": 1,
          "memberService.service.title": 1,
          "memberService.service._id": 1,
          //"memberShipDetails":1,
          description: 1,
          timeTimit: 1,
          price: 1,
        },
      },
    ]);
    console.log(get);

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: [get[0]].length,
        Data: [get[0]],
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

//------------------------- Paras Get User MemberShip Service v-5 -----------------------------------------------
router.post("/getUserMemberShip_v5", async function (req, res) {
  try {
    const { userId } = req.body;
    // console.log(userId);
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
    // console.log(userId);

    const get = await userMemberShipSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "usermemberships",
          localField: "userId",
          foreignField: "userId",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
        },
      },
      {
        $lookup: {
          from: "memberships",
          localField: "memberShipId",
          foreignField: "_id",
          as: "memberShipUserId",
        },
      },
      {
        $unwind: {
          path: "$memberShipUserId",
        },
      },
      // {
      //   $lookup:{
      //     from: "memberships",
      //     localField: "memberShipDetails.memberShipId",
      //     foreignField: "_id",
      //     as: "memberShipDetails",
      //   }
      // },
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
          // memberShipsss: { $push: '$$ROOT'},
          memberUserId: { $push: "$userDetails" },
          memberShipDetails: { $push: "$memberShipUserId" },
          memberShipDetailsMem: { $push: "$memberShipUserId.title" },
          memberShipDetailsDescription: {
            $push: "$memberShipUserId.description",
          },
          memberShipDetailsTimeLimit: { $push: "$memberShipUserId.timeTimit" },
          //memberShipDetailsTotalMonth:{$push: "$memberShipUserId.totalMonth" },
          memberShipDetailsPrice: { $push: "$memberShipUserId.price" },
          //memberShipDetailsExDateTime:{ $push: "$memberShipUserId" } ,
          memberService: { $push: "$service" },
        },
      },
      {
        $unwind: {
          path: "$memberShipDetails",
        },
      },
      {
        $unwind: {
          path: "$memberUserId",
        },
      },
      {
        $unwind: {
          path: "$memberShipDetailsMem",
        },
      },
      {
        $unwind: {
          path: "$memberShipDetailsDescription",
        },
      },
      {
        $unwind: {
          path: "$memberShipDetailsTimeLimit",
        },
      },
      {
        $project: {
          userId: 1,
          "memberShipDetails.title": 1,
          "memberShipDetails.description": 1,
          "memberShipDetails.timeTimit": 1,
          "memberShipDetails.price": 1,
          "memberShipDetails.totalMonth": 1,
          "memberUserId._id": 1,
          "memberUserId.memberShipId": 1,
          "memberUserId.buyDateTime": 1,
          "memberUserId.exDateTime": 1,
          //"memberShipDetailsMem":1,
          // "memberShipDetailsDescription":1,
          // "memberShipDetailsTimeLimit":1,
          // "memberShipDetailsPrice":1,
          //"memberShipDetailsTotalMonth":1,
          // "memberShipDetailsExDateTime":1,
          // "books.buyDateTime":1,
          // "books.exDateTime":1,
          // "books.amount":1,
          // "books.userId":1,
          _id: 1,
          // "userDetails.buyDateTime":1,
          buyDateTime: 1,
          exDateTime: 1,
          amount: 1,
          "memberService.qty": 1,
          "memberService.discount": 1,
          "memberService.service.title": 1,
          "memberService.service._id": 1,
          //"memberShipDetails":1,
          description: 1,
          timeTimit: 1,
          price: 1,
        },
      },
    ]);
    console.log(get);

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: [get[0]].length,
        Data: [get[0]],
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

//--------------booking -------------kevil-----------
router.post("/addNewBooking", async function (req, res) {
  try {
    const {
      bookingId,
      lat,
      long,
      userId,
      carBrand,
      totalPayAmount,
      carName,
      pickupDate,
      pickupTime,
      timesOfDay,
      couponCode,
      deliveryCharges,
      currentMrp,
      mrp,
      totalPay,
      discount,
      refferal,
      couponAmaunt,
      address,
      instruction,
      name,
      phone,
      amount,
      razorePayOrderId,
      razorePayPaymentId,
      carPlateNumber,
    } = req.body;
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

    let get = await addToCartSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 0 }],
        },
      },
    ]);

    let gets = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 1 }],
        },
      },
    ]);

    console.log(get.length);
    if (get.length == 0) {
      return res
        .status(200)
        .json({ IsSuccess: true, Message: "plzz add service in cart" });
    }

    arr = [];

    for (let i = 0; i < get.length; i++) {
      arr.push(get[i].serviceId);
      console.log(get);
    }

    //console.log(arr)

    const add = await new bookingSchema({
      userId: userId,
      cartId: arr,
      carBrand: gets[0].carBrandId,
      carName: gets[0].carModelId,
      pickupDate: pickupDate,
      pickupTime: pickupTime,
      timesOfDay: timesOfDay,
      dateTime: getCurrentDateTimes(),
      otp: getUserCodeNumber(),
      address: address,
      instruction: instruction,
      phone: phone,
      name: name,
      lat: lat,
      long: long,
      totalPayAmount: totalPay,
      amount: amount,
      razorePayOrderId: razorePayOrderId,
      razorePayPaymentId: razorePayPaymentId,
      carPlateNumber: carPlateNumber,
    });

    if (add != null) {
      await add.save();
      a = add._id.toString();
      console.log(a.toString());
      //console.log(userId.split(""))
      data = a.slice(-6);
      updateIs = {
        bookingId: data, // Kevil
      };

      let updateIss = await bookingSchema.findByIdAndUpdate(add._id, updateIs, {
        new: true,
      });

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

      // console.log("Vendor" + gets);
      var data = [];
      var km = [];
      var vernderData = [];
      for (let i = 0; i < gets.length; i++) {
        getAll = distances(
          parseInt(lat),
          parseInt(gets[i].lat),
          parseInt(long),
          parseInt(gets[i].long)
        );
        getData = {
          workshopId: gets[i]._id,
          getKm: getAll,
        };
        data.push(getData);
      }
      console.log(getAll + " getAll");
      // console.log(data[0] + " data");
      console.log(data.length);
      for (let j = 0; j < data.length; j++) {
        console.log(data[j]);
        km.push(data[j].getKm);
        km.sort(function (a, b) {
          return a - b;
        });
        console.log(km);
      }
      console.log(km[0]);
      var getVenderId;
      for (let i = 0; i < data.length; i++) {
        if (km[0] == data[i].getKm) {
          getVenderId = data[i].workshopId;
        } else {
          console.log("no found");
        }
      }

      let admin = await settingSchema.aggregate([
        {
          $match: {
            orderAscend: true,
          },
        },
      ]);

      if (admin.length == 1) {
        const venderBooking = await new venderWork({
          userId: userId,
          bookingId: add._id,
          address: address,
          mrp: mrp,
          currentMrp: currentMrp,
          totalPay: totalPay,
          dateTime: getCurrentDateTimes(),
          venderId: getVenderId,
        });
        console.log("venderBooking", venderBooking);

        if (venderBooking != null) {
          await venderBooking.save();

          const venderNotifications = await new venderNotification({
            title: "New Vender Work",
            image: "uploads/notificationIcon/Group18.png",
            description: "New Work Comming",
            date: getCurrentDateTime(),
            venderId: venderBooking.venderId,
          });

          if (venderNotifications != null) {
            await venderNotifications.save();
          }
        }
      } else {
        const venderBooking = await new adminAscend({
          userId: userId,
          bookingId: add._id,
          address: address,
          mrp: mrp,
          currentMrp: currentMrp,
          totalPay: totalPay,
          dateTime: getCurrentDateTimes(),
        });

        if (venderBooking != null) {
          await venderBooking.save();
        }
      }

      console.log(add);
      let memberShipService = await userDetailsSchema.aggregate([
        {
          $match: {
            $and: [
              { _id: mongoose.Types.ObjectId(userId) },
              { memberShipStatus: 1 },
            ],
          },
        },
      ]);

      // console.log(memberShipService);

      if (memberShipService.length == 1) {
        console.log("kevil");
        console.log(memberShipService);
        console.log("kevils");

        let memberShipServices = await userMemberShipSchema.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(memberShipService[0]._id),
            },
          },
        ]);
        // console.log(memberShipServices);

        for (let i = 0; i < memberShipServices[0].service.length; i++) {
          console.log("1");
          for (let j = 0; j < add.cartId.length; j++) {
            console.log(add.cartId[j] + " cartId");
            console.log(memberShipServices[0].service[i].serviceId + " member");
            console.log("2");
            if (
              memberShipServices[0].service[i].serviceId.toString() ==
              add.cartId[j].toString()
            ) {
              console.log("3");
              console.log(memberShipServices[0].service[i].qty);

              if (memberShipServices[0].service[i].qty > 0) {
                data = parseInt(memberShipServices[0].service[i].qty) - 1;

                const update = await userMemberShipSchema.aggregate([
                  {
                    $match: {
                      userId: mongoose.Types.ObjectId(userId),
                    },
                  },
                ]);

                if (update.length > 0) {
                  let updatePrice = await userMemberShipSchema.findOneAndUpdate(
                    {
                      userId: mongoose.Types.ObjectId(userId),
                      "service.serviceId": mongoose.Types.ObjectId(
                        memberShipServices[0].service[i].serviceId
                      ),
                    },
                    { $set: { "service.$.qty": data } },
                    { new: true }
                  );
                  console.log(updatePrice);
                  // let updatePrice=await userMemberShipSchema.findByIdAndUpdate(userMemberId,allPriceIs,{new:true});
                }
                // return res.status(200).json({ IsSuccess: true, Data:[], Message: 'This type All Service are use' })
              } else {
                console.log("This type All Service are use");
              }

              //   let updateIs;
              //   updateIs = {
              //     qty : data
              //   }
              //   let updateIss = await addToCartSchema.findByIdAndUpdate(memberShipServices[0].service[i].qty, updateIs)
              // }else{
              console.log("Not Match");
            }
          }
        }
      }

      const cart = await new conformCartSchema({
        userId: userId,
        serviceId: add._id,
        deliveryCharges: deliveryCharges,
        currentMrp: currentMrp,
        mrp: mrp,
        totalPay: totalPay,
        discount: discount,
        refferal: refferal,
        couponAmaunt: couponAmaunt,
        couponCode: couponCode,
        address: address,
        dateTime: getCurrentDateTime(),
        lat: lat,
        long: long,
        amount: amount,
        razorePayOrderId: razorePayOrderId,
        razorePayPaymentId: razorePayPaymentId,
      });

      if (cart != null) {
        await cart.save();

        let get = await userDetailsSchema.aggregate([
          {
            $match: { userId: mongoose.Types.ObjectId(userId) },
          },
        ]);
        console.log("User" + get);
        //console.log(get[0].refferalPoint)

        if (refferal == "0") {
          console.log("nathi");
        } else {
          point = parseInt(get[0].refferalPoint) - parseInt(cart[0].refferal);

          let updateIs;
          updateIs = {
            refferalPoint: point.toString(),
          };
          let updateIss = await addToCartSchema.findByIdAndUpdate(
            cart[0].userId,
            updateIs
          );

          const userAdd = await new walletSchema({
            userId: userId,
            status: 0,
            title: "Use Refferal Point",
            default: "Use Refferal Point",
            amount: refferal,
            dateTime: getCurrentDateTimes(),
          });
          if (userAdd != null) {
            await userAdd.save();
            console.log(userAdd);
          }
        }
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], Message: "coupon Error" });
      }
      for (let i = 0; i < get.length; i++) {
        let updateIs;
        updateIs = {
          status: 1,
        };
        let updateIss = await addToCartSchema.findByIdAndUpdate(
          get[i]._id,
          updateIs
        );
      }
      const userFcm = await userDetailsSchema.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(userId) },
        },
      ]);

      for (let i = 0; i < userFcm.length; i++) {
        const element = userFcm[i];
        console.log(element);

        const addNotification = await new notificationSchema({
          userId: userId,
          title: "Booking SuccessFully!",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/Group18.png",
        });

        if (addNotification != null) {
          await addNotification.save();
          var message = {
            to: element.fcm,
            notification: {
              title: "Booking SuccessFully!",
              // body: "Booking",
            },
            // data: { //you can send only notification or only data(or include both)
            //     title: 'ok cdfsdsdfsd',
            //     body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
            // }
          };
          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!" + err);
              console.log("Respponse:! " + response);
            } else {
              // showToast("Successfully sent with response");
              console.log("Successfully sent with response: ", response);
            }
          });
        } else {
          console.log("Error");
        }
      }

      const adds = await new couponUseSchema({
        userId: userId,
        couponCode: couponCode,
        dateTime: getCurrentDateTime(),
      });

      if (adds != null) {
        await adds.save();
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: [], Message: "coupon Error" });
      }
      for (let i = 0; i < get.length; i++) {
        // console.log(get[i].userId);
        let updateIs;
        updateIs = {
          status: 2,
        };
        let updateIss = await addToCartSchema.findByIdAndUpdate(
          get[i]._id,
          updateIs
        );
        console.log(updateIss);
      }

      // console.log("data add", add);
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      console.log("no data add");
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }

    //return res.status(200).json({ IsSuccess: true, Message: 'Added Data' })
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//------------------------------------  Paras ----------------------------------
router.post("/addNewBooking_v5", async function (req, res) {
  try {
    const {
      bookingId,
      lat,
      long,
      userId,
      carBrand,
      totalPayAmount,
      carName,
      fuelType,
      pickupDate,
      pickupTime,
      timesOfDay,
      couponCode,
      deliveryCharges,
      currentMrp,
      mrp,
      totalPay,
      discount,
      refferal,
      couponAmaunt,
      address,
      instruction,
      name,
      phone,
      amount,
      razorePayOrderId,
      razorePayPaymentId,
      carPlateNumber,
    } = req.body;
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

    let gets = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 1 }],
        },
      },
    ]);

    if (gets.length == 1) {
      let get = await addToCartSchema2.aggregate([
        {
          $match: {
            $and: [
              {
                userId: mongoose.Types.ObjectId(userId),
              },
              {
                carModelId: mongoose.Types.ObjectId(gets[0].carModelId),
              },
              {
                fuelTypeId: mongoose.Types.ObjectId(gets[0].fuelTypeId),
              },
              { status: 0 },
            ],
          },
        },
      ]);

      // console.log("Selected Car Wise Cart", get);
      // console.log(get.length);
      if (get.length == 0) {
        return res
          .status(200)
          .json({ IsSuccess: true, Message: "plzz add service in cart" });
      } else {
        arr = [];
        for (let i = 0; i < get.length; i++) {
          arr.push(get[i].serviceId);
          // console.log(get);
        }

        const add = await new bookingSchema({
          userId: userId,
          cartId: arr,
          carBrand: gets[0].carBrandId,
          carName: gets[0].carModelId,
          fuelType: gets[0].fuelTypeId,
          pickupDate: pickupDate,
          pickupTime: pickupTime,
          timesOfDay: timesOfDay,
          dateTime: getCurrentDateTimes(),
          otp: getUserCodeNumber(),
          address: address,
          instruction: instruction,
          phone: phone,
          name: name,
          lat: lat,
          long: long,
          totalPayAmount: totalPay,
          amount: amount,
          razorePayOrderId: razorePayOrderId,
          razorePayPaymentId: razorePayPaymentId,
          carPlateNumber: carPlateNumber,
        });

        if (add != null) {
          await add.save();
          a = add._id.toString();
          // console.log(a.toString());
          //console.log(userId.split(""))
          data = a.slice(-6);
          updateIs = {
            bookingId: data, // Kevil
          };

          let updateIss = await bookingSchema.findByIdAndUpdate(
            add._id,
            updateIs,
            {
              new: true,
            }
          );

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

          // console.log("Vendor" + gets);
          var data = [];
          var km = [];
          var vernderData = [];
          console.log("Latitude", lat);
          console.log("Longitude", long);
          for (let i = 0; i < gets.length; i++) {
            getAll = distances(lat, gets[i].lat, long, gets[i].long);
            getData = {
              workshopId: gets[i]._id,
              getKm: getAll,
            };
            data.push(getData);
          }
          console.log(getAll + " getAll");
          // console.log(data[0] + " data");
          console.log(data.length);
          for (let j = 0; j < data.length; j++) {
            console.log(data[j]);
            km.push(data[j].getKm);
            km.sort(function (a, b) {
              return a - b;
            });
            console.log(km);
          }
          // console.log("km goto" ,km[0]);
          var getVenderId;
          for (let i = 0; i < data.length; i++) {
            if (km[0] == data[i].getKm) {
              getVenderId = data[i].workshopId;
            } else {
              console.log("no found");
            }
          }
          console.log("venderId", getVenderId);
          let admin = await settingSchema.aggregate([
            {
              $match: {
                orderAscend: true,
              },
            },
          ]);

          if (admin.length == 1) {
            const venderBooking = await new venderWork({
              userId: userId,
              bookingId: add._id,
              address: address,
              mrp: mrp,
              currentMrp: currentMrp,
              totalPay: totalPay,
              dateTime: getCurrentDateTimes(),
              venderId: getVenderId,
            });

            console.log("VenderWork Details", venderBooking);

            if (venderBooking != null) {
              await venderBooking.save();

              const venderNotifications = await new venderNotification({
                title: "New Vender Work",
                image: "uploads/notificationIcon/Group18.png",
                description: "New Work Comming",
                date: getCurrentDateTime(),
                venderId: venderBooking.venderId,
              });

              if (venderNotifications != null) {
                await venderNotifications.save();
              }
            }
          } else {
            const venderBooking = await new adminAscend({
              userId: userId,
              bookingId: add._id,
              address: address,
              mrp: mrp,
              currentMrp: currentMrp,
              totalPay: totalPay,
              dateTime: getCurrentDateTimes(),
            });

            if (venderBooking != null) {
              await venderBooking.save();
            }
          }

          console.log(add);
          let memberShipService = await userDetailsSchema.aggregate([
            {
              $match: {
                $and: [
                  { _id: mongoose.Types.ObjectId(userId) },
                  { memberShipStatus: 1 },
                ],
              },
            },
          ]);

          // console.log(memberShipService);

          if (memberShipService.length == 1) {
            console.log("kevil");
            console.log(memberShipService);
            console.log("kevils");

            let memberShipServices = await userMemberShipSchema.aggregate([
              {
                $match: {
                  userId: mongoose.Types.ObjectId(memberShipService[0]._id),
                },
              },
            ]);
            console.log(memberShipServices);

            for (let i = 0; i < memberShipServices[0].service.length; i++) {
              console.log("1");
              for (let j = 0; j < add.cartId.length; j++) {
                console.log(add.cartId[j] + " cartId");
                console.log(
                  memberShipServices[0].service[i].serviceId + " member"
                );
                console.log("2");
                if (
                  memberShipServices[0].service[i].serviceId.toString() ==
                  add.cartId[j].toString()
                ) {
                  console.log("3");
                  console.log(memberShipServices[0].service[i].qty);
                  console.log(memberShipServices[0].service[i].discount);


                  // added 

                  if (parseInt(memberShipServices[0].service[i].qty) > 0) {
                    data = parseInt(memberShipServices[0].service[i].qty) - 1;

                    const update = await userMemberShipSchema.aggregate([
                      {
                        $match: {
                          userId: mongoose.Types.ObjectId(userId),
                        },
                      },
                    ]);

                    if (update.length > 0) {
                      let updatePrice =
                        await userMemberShipSchema.findOneAndUpdate(
                          {
                            userId: mongoose.Types.ObjectId(userId),
                            "service.serviceId": mongoose.Types.ObjectId(
                              memberShipServices[0].service[i].serviceId
                            ),
                          },
                          { $set: { "service.$.qty": data } },
                          { new: true }
                        );
                      console.log(updatePrice);
                      // let updatePrice=await userMemberShipSchema.findByIdAndUpdate(userMemberId,allPriceIs,{new:true});
                    }
                    // return res.status(200).json({ IsSuccess: true, Data:[], Message: 'This type All Service are use' })
                  } else if (parseInt(memberShipServices[0].service[i].discount) > 0) {

                    const update = await userMemberShipSchema.aggregate([
                      {
                        $match: {
                          userId: mongoose.Types.ObjectId(userId),
                        },
                      },
                    ]);

                    if (update.length > 0) {
                      let today = new Date()
                      let membershipExpireDate = new Date(update.exDateTime)
                      if (today <= membershipExpireDate) {
                        console.log("geting discount")
                      } else {
                        data = 0
                        let updatePrice =
                          await userMemberShipSchema.findOneAndUpdate(
                            {
                              userId: mongoose.Types.ObjectId(userId),
                              "service.serviceId": mongoose.Types.ObjectId(
                                memberShipServices[0].service[i].serviceId
                              ),
                            },
                            { $set: { "service.$.discount": data } },
                            { new: true }
                          );
                        console.log(updatePrice);
                      }
                      // let updatePrice=await userMemberShipSchema.findByIdAndUpdate(userMemberId,allPriceIs,{new:true});
                    }
                    // return res.status(200).json({ IsSuccess: true, Data:[], Message: 'This type All Service are use' })


                  } else {
                    console.log("This type All Service are use");
                  }

                  //   let updateIs;
                  //   updateIs = {
                  //     qty : data
                  //   }
                  //   let updateIss = await addToCartSchema.findByIdAndUpdate(memberShipServices[0].service[i].qty, updateIs)
                  // }else{
                  console.log("Not Match");
                }
              }
            }
          }

          const cart = await new conformCartSchema({
            userId: userId,
            serviceId: add._id,
            deliveryCharges: deliveryCharges,
            currentMrp: currentMrp,
            mrp: mrp,
            totalPay: totalPay,
            discount: discount,
            refferal: refferal,
            couponAmaunt: couponAmaunt,
            couponCode: couponCode,
            address: address,
            dateTime: getCurrentDateTime(),
            lat: lat,
            long: long,
            amount: amount,
            razorePayOrderId: razorePayOrderId,
            razorePayPaymentId: razorePayPaymentId,
            carPlateNumber: carPlateNumber,
          });

          console.log("Cart", cart);

          if (cart != null) {
            await cart.save();

            let get = await userDetailsSchema.aggregate([
              {
                $match: { userId: mongoose.Types.ObjectId(userId) },
              },
            ]);
            console.log("User" + get);
            //console.log(get[0].refferalPoint)

            if (refferal == "0") {
              console.log("nathi");
            } else {
              point =
                parseInt(get[0].refferalPoint) - parseInt(cart[0].refferal);

              let updateIs;
              updateIs = {
                refferalPoint: point.toString(),
              };
              let updateIss = await addToCartSchema2.findByIdAndUpdate(
                cart[0].userId,
                updateIs
              );

              const userAdd = await new walletSchema({
                userId: userId,
                status: 0,
                title: "Use Refferal Point",
                default: "Use Refferal Point",
                amount: refferal,
                dateTime: getCurrentDateTimes(),
              });

              if (userAdd != null) {
                await userAdd.save();
                console.log(userAdd);
              }
            }
          } else {
            return res
              .status(200)
              .json({ IsSuccess: true, Data: [], Message: "coupon Error" });
          }
          for (let i = 0; i < get.length; i++) {
            let updateIs;
            updateIs = {
              status: 1,
            };
            let updateIss = await addToCartSchema2.findByIdAndUpdate(
              get[i]._id,
              updateIs
            );
          }
          const userFcm = await userDetailsSchema.aggregate([
            {
              $match: { _id: mongoose.Types.ObjectId(userId) },
            },
          ]);

          for (let i = 0; i < userFcm.length; i++) {
            const element = userFcm[i];
            console.log(element);

            const addNotification = await new notificationSchema({
              userId: userId,
              title: "Booking SuccessFully!",
              date: getCurrentDateTime(),
              image: "uploads/notificationIcon/Group18.png",
            });

            if (addNotification != null) {
              await addNotification.save();
              var message = {
                to: element.fcm,
                notification: {
                  title: "Booking SuccessFully!",
                  // body: "Booking",
                },
                // data: { //you can send only notification or only data(or include both)
                //     title: 'ok cdfsdsdfsd',
                //     body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
                // }
              };
              fcm.send(message, function (err, response) {
                if (err) {
                  console.log("Something has gone wrong!" + err);
                  console.log("Respponse:! " + response);
                } else {
                  // showToast("Successfully sent with response");
                  console.log("Successfully sent with response: ", response);
                }
              });
            } else {
              console.log("Error");
            }
          }
          const adds = await new couponUseSchema({
            userId: userId,
            couponCode: couponCode,
            dateTime: getCurrentDateTime(),
          });

          if (adds != null) {
            await adds.save();
          } else {
            return res
              .status(200)
              .json({ IsSuccess: true, Data: [], Message: "coupon Error" });
          }
          for (let i = 0; i < get.length; i++) {
            // console.log(get[i].userId);
            let updateIs;
            updateIs = {
              status: 2,
            };
            let updateIss = await addToCartSchema2.findByIdAndUpdate(
              get[i]._id,
              updateIs
            );
            console.log("addToCartSchema", updateIss);
          }

          // console.log("data add", add);
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
        } else {
          console.log("no data add");
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
        }
      }
    } else {
      return res.status(200).json({ IsSuccess: true, Message: "No Data Add" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/updateBooking", async function (req, res) {
  try {
    const {
      bookingId,
      lat,
      long,
      userId,
      carBrand,
      totalPayAmount,
      carName,
      fuelType,
      pickupDate,
      pickupTime,
      timesOfDay,
      couponCode,
      deliveryCharges,
      currentMrp,
      mrp,
      totalPay,
      discount,
      refferal,
      couponAmaunt,
      address,
      instruction,
      name,
      phone,
      amount,
      razorePayOrderId,
      razorePayPaymentId,
      carPlateNumber,
    } = req.body;

    const update = await bookingSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(bookingId),
        },
      },
    ]);

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        lat: lat != undefined ? lat : update[0].lat,
        long: long != undefined ? long : update[0].long,
        userId: userId != undefined ? userId : update[0].userId,
        carBrand: carBrand != undefined ? carBrand : update[0].carBrand,
        totalPayAmount:
          totalPayAmount != undefined
            ? totalPayAmount
            : update[0].totalPayAmount,
        carName: carName != undefined ? carName : update[0].carName,
        fuelType: fuelType != undefined ? fuelType : update[0].fuelType,
        pickupDate: pickupDate != undefined ? pickupDate : update[0].pickupDate,
        pickupTime: pickupTime != undefined ? pickupTime : update[0].pickupTime,
        timesOfDay: timesOfDay != undefined ? timesOfDay : update[0].timesOfDay,
        couponCode: couponCode != undefined ? couponCode : update[0].couponCode,
        deliveryCharges:
          deliveryCharges != undefined
            ? deliveryCharges
            : update[0].deliveryCharges,
        currentMrp: currentMrp != undefined ? currentMrp : update[0].currentMrp,
        mrp: mrp != undefined ? mrp : update[0].mrp,
        totalPay: totalPay != undefined ? totalPay : update[0].totalPay,
        discount: discount != undefined ? discount : update[0].discount,
        refferal: refferal != undefined ? refferal : update[0].refferal,
        couponAmaunt:
          couponAmaunt != undefined ? couponAmaunt : update[0].couponAmaunt,
        address: address != undefined ? address : update[0].address,
        instruction:
          instruction != undefined ? instruction : update[0].instruction,
        name: name != undefined ? name : update[0].name,
        phone: phone != undefined ? phone : update[0].phone,
        amount: amount != undefined ? amount : update[0].amount,
        razorePayOrderId:
          razorePayOrderId != undefined
            ? razorePayOrderId
            : update[0].razorePayOrderId,
        razorePayPaymentId:
          razorePayPaymentId != undefined
            ? razorePayPaymentId
            : update[0].razorePayPaymentId,
        carPlateNumber:
          carPlateNumber != undefined
            ? carPlateNumber
            : update[0].carPlateNumber,
        bookingId: update[0].bookingId,
      };
      let updateIss = await bookingSchema.findByIdAndUpdate(
        bookingId,
        updateIs,
        { new: true }
      );

      return res
        .status(200)
        .json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/UpdateBookingStatus", async function (req, res) {
  try {
    const { bookingId, status } = req.body;

    const update = await bookingSchema.aggregate([
      {
        $match: {
          $and: [
            {
              _id: mongoose.Types.ObjectId(bookingId),
            },
          ],
        },
      },
    ]);

    const updates = await venderWork.aggregate([
      {
        $match: {
          bookingId: mongoose.Types.ObjectId(bookingId),
        },
      },
    ]);

    console.log(update);
    // if(update)
    if (update[0].status == 3) {
      return res
        .status(200)
        .json({ IsSuccess: true, Message: `Already Cancel Booking!` });
    }
    if (update[0].status == 2) {
      return res
        .status(200)
        .json({ IsSuccess: true, Message: `Already Completed Booking!` });
    }

    if (update.length == 1) {
      let updateIs;
      updateIs = {
        status: status != undefined ? status : update[0].status,
      };

      let updateIss = await bookingSchema.findByIdAndUpdate(
        bookingId,
        updateIs,
        { new: true }
      );

      console.log(updateIss);

      if (updateIss.status == 3) {
        let updateIs;
        updateIs = {
          trackBooking: 9, // Kevil
        };

        let updateIss = await bookingSchema.findByIdAndUpdate(
          bookingId,
          updateIs,
          { new: true }
        );

        let update;
        updateIs = {
          workshopStatus: 4,
          serviceStatus: 9, // Kevil
        };

        let vender = await venderWork.findByIdAndUpdate(
          updates[0]._id,
          updateIs,
          { new: true }
        );

        let updateIsss;
        updateIs = {
          bookingCompleteStatus: 0,
        };

        let updateIssss = await bookingSchema.findByIdAndUpdate(
          bookingId,
          updateIs,
          { new: true }
        );

        const addNotification = await new notificationSchema({
          userId: updateIss.userId,
          title: "Booking Cancel!",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/icon-2.png",
        });

        if (addNotification != null) {
          await addNotification.save();
        } else {
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [], Message: "Error" });
        }
      } else if (updateIss.status == 2) {
        let updateIs;
        updateIs = {
          trackBooking: 7,
        };

        let updateIss = await bookingSchema.findByIdAndUpdate(
          bookingId,
          updateIs,
          { new: true }
        );

        let updateIsss;
        updateIs = {
          bookingCompleteStatus: 0,
        };

        let updateIssss = await bookingSchema.findByIdAndUpdate(
          bookingId,
          updateIs,
          { new: true }
        );

        const addNotification = await new notificationSchema({
          userId: updateIss.userId,
          title: "Booking Completed!",
          date: getCurrentDateTime(),
          image: "uploads/notificationIcon/Group18.png",
        });

        if (addNotification != null) {
          await addNotification.save();
        } else {
          return res
            .status(200)
            .json({ IsSuccess: true, Data: [], Message: "Error" });
        }
      }

      return res
        .status(200)
        .json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

// router.post('/getAllActive', async function (req, res) {
//   try {

//     const {userId} = req.body

//     let authToken = req.headers['authorization'];

//     if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
//         return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
//     }

//     const get = await bookingSchema.aggregate([{
//       $match: {
//         $and:[
//           {userId: mongoose.Types.ObjectId(userId)},
//           {status: 1}
//         ]
//       }
//     }
//     ]);

//     if(get.length > 0){
//       return res.status(200).json({ IsSuccess: true,count: get.length, Data: get, Message:" Data Found"})
//     }else{
//       return res.status(200).json({ IsSuccess: true, Data: [],Message:"No Data Found" })
//     }

//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message })
//   }
// });

router.post("/getBookingHistory", async function (req, res) {
  try {
    const { userId, status } = req.body;

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

    const get = await bookingSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: status,
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$cartId",
        },
      },
      {
        $lookup: {
          from: "addtocart2",
          localField: "cartId",
          foreignField: "serviceId",
          as: "service.service",
        },
      },
      {
        $unwind: {
          path: "$service.service",
        },
      },
      {
        $lookup: {
          from: "servicedata2",
          localField: "service.service.serviceId",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },

      {
        $lookup: {
          from: "conformcarts",
          localField: "_id",
          foreignField: "serviceId",
          as: "conformCartDetails",
        },
      },

      // {
      //   $lookup:{
      //   from:"conformcarts",
      //   localField:"_id",
      //   foreignField:"serviceId",
      //   as:"conformCartDetails"
      // }
      // },
      {
        $project: {
          pickupDate: 1,
          pickupTime: 1,
          dateTime: 1,
          status: 1,
          bookingCompleteStatus: 1,
          "serviceDetails.title": 1,
          "serviceDetails.image": 1,
          "conformCartDetails.totalPay": 1,
          address: 1,
        },
      },
    ]);
    console.log(get);

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get.reverse(),
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

router.post("/getAllBookingHistory_v1", async function (req, res) {
  try {
    const { userId, status } = req.body;

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

    const get = await bookingSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: status,
            },
          ],
        },
      },
      {
        $project: {
          pickupDate: 1,
          pickupTime: 1,
          dateTime: 1,
          status: 1,
          bookingCompleteStatus: 1,
          totalPayAmount: 1,
          address: 1,
          instruction: 1,
          bookingId: 1,
        },
      },
    ]);
    console.log(get);
    data = "";
    if (get.length == 1) {
      a = get[0]._id.toString();
      console.log(a.toString());
      //console.log(userId.split(""))
      data = a.slice(-6);
      console.log(data);
    }

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get.reverse(),
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

router.post("/getBooking_v1", async function (req, res) {
  try {
    const { bookingId, status } = req.body;

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

    const get = await bookingSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(bookingId),
        },
      },
      {
        $lookup: {
          from: "servicedata2",
          localField: "cartId",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "carBrand",
          foreignField: "_id",
          as: "carBrandName",
        },
      },
      {
        $lookup: {
          from: "carmodels",
          localField: "carName",
          foreignField: "_id",
          as: "carModelName",
        },
      },
      {
        $lookup: {
          from: "fueltypes",
          localField: "fuelType",
          foreignField: "_id",
          as: "carFuelName",
        },
      },
      {
        $lookup: {
          from: "userdetails",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $lookup: {
          from: "venderworks",
          localField: "_id",
          foreignField: "bookingId",
          as: "venderWorkId",
        },
      },
      {
        $lookup: {
          from: "venderdetails",
          localField: "venderWorkId.venderId",
          foreignField: "_id",
          as: "venderWorkName",
        },
      },
      {
        $unwind: {
          path: "$userDetails"
        },
      },
      {
        $unwind: {
          path: "$carBrandName"
        },
      },
      {
        $unwind: {
          path: "$carFuelName"
        },
      },
      {
        $unwind: {
          path: "$carModelName"
        },
      },
      {
        $unwind: {
          path: "$venderWorkName"
        },
      },
      // {
      //   $project: {
      //     cartId: 0,
      //     userId: 0,
      //     carBrand: 0,
      //     carName: 0,
      //     "serviceDetails.service": 0,
      //     "serviceDetails.icon": 0,
      //     "serviceDetails.deliveryCharges": 0,
      //     "serviceDetails.subCategoryId": 0,
      //     "serviceDetails.carTypeId": 0,
      //     "carModelName.image": 0,
      //     "carModelName._id": 0,
      //     "carModelName.carBrandId": 0,
      //     "carModelName.carTypeId": 0,
      //     "brandName._id": 0,
      //     "brandName.image": 0,
      //     "brandName.carTypeId": 0,
      //   },
      // },
      {
        $project: {
          _id: 1,
          fuelType: 1,
          pickupDate: 1,
          pickupTime: 1,
          dateTime: 1,
          status: 1,
          trackBooking: 1,
          bookingCompleteStatus: 1,
          otp: 1,
          address: 1,
          instruction: 1,
          name: 1,
          phone: 1,
          lat: 1,
          long: 1,
          totalPayAmount: 1,
          razorePayOrderId: 1,
          razorePayPaymentId: 1,
          carPlateNumber: 1,
          bookingId: 1,
          "serviceDetails._id": 1,
          "serviceDetails.title": 1,
          "serviceDetails.image": 1,
          "serviceDetails.mrp": 1,
          "serviceDetails.currentMrp": 1,
          "serviceDetails.discount": 1,
          "serviceDetails.carModelId": 1,
          "serviceDetails.carFualTypeId": 1,
          "serviceDetails.regulerServiceId": 1,
          "carBrandName.brandName": 1,
          "carModelName.modelName": 1,
          "carFuelName.fuelType": 1,
          "userDetails.name": 1,
          "venderWorkName.workshopName": 1,
        },
      },
    ]);

    console.log(get);
    data = "";
    if (get.length == 1) {
      data = bookingId.slice(-6);
      console.log(data);
    }

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get.reverse(),
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

// router.post('/getAllCancelled', async function (req, res) {
//   try {

//     const {userId} = req.body

//     let authToken = req.headers['authorization'];

//     if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
//         return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
//     }

//     const get = await bookingSchema.aggregate([{
//       $match: {
//         $and:[
//           {userId: mongoose.Types.ObjectId(userId)},
//           {status: 3}
//         ]
//       }
//     }
//     ]);

//     if(get.length > 0){
//       return res.status(200).json({ IsSuccess: true,count: get.length, Data: get, Message:" Data Found"})
//     }else{
//       return res.status(200).json({ IsSuccess: true, Data: [],Message:"No Data Found" })
//     }

//   } catch (error) {
//     return res.status(500).json({ IsSuccess: false, Message: error.message })
//   }
// })

//--------------Dashbord Services  -----------kevil ---------

router.post("/getDashbordServices", async function (req, res) {
  try {
    // const {userId} = req.body

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

    const gets = await serviceSchema2.aggregate([
      {
        $match: {
          // carTypeId: mongoose.Types.ObjectId(gets[0].carTypeId)
        },
      },
      {
        $project: {
          title: 1,
          icon: 1,
        },
      },
    ]);
    if (gets.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: gets.length,
        Data: gets,
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

router.post("/getService", async function (req, res) {
  try {
    const { serviceId, userId } = req.body;
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

    const car = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    if (car.length == 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: car.length,
        Data: [],
        Message: "Please Add Your car",
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

//---------------------- Paras ---------------------------
router.post("/getService_v5", async function (req, res) {
  try {
    const { serviceId, userId } = req.body;
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

    const car = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    if (car.length == 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: car.length,
        Data: [],
        Message: "Please Add Your car",
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

//---------track Booking----------kevil----------

// router.post('/addTrackBooking', async function (req, res) {
//   try {

//     const {bookingId , userId} = req.body
//     let authToken = req.headers['authorization'];

//   if (authToken != config.tockenIs || authToken == null || authToken == undefined) {
//     return res.status(200).json({ IsSuccess: false, Data: [], Message: "You are not authenticated" });
//   }

//   const get = await trackBookingSchema.aggregate([{
//     $match: {
//       $and:[
//         {userId: mongoose.Types.ObjectId(userId)},
//         {bookingId: mongoose.Types.ObjectId(bookingId)}
//       ]
//     }
//   }
//   ]);

//   if(get.length >= 1){
//     return res.status(200).json({ IsSuccess: true, Data:[], Message: 'Already exits' })
//   }

//     const add = await new trackBookingSchema({
//       bookingId: bookingId,
//       userId:userId,
//       status: 0,
//       otp: getUserCodeNumber()
//     });

//     if (add != null) {
//       await add.save()
//       return res.status(200).json({ IsSuccess: true, Data: [add], Message: 'Added Data' })
//     } else {
//       return res.status(200).json({ IsSuccess: true, Data:[], Message: 'Not Added Data' })
//     }
//   }
//   catch (error) {
//     return res.status(500).json({ IsSuccess: false, Data: [], Message: error.message })
//   }
// });

router.post("/getAllTrackBooking", async function (req, res) {
  try {
    const { userId } = req.body;

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

    const gets = await bookingSchema.aggregate([
      {
        $match: {
          $and: [
            { userId: mongoose.Types.ObjectId(userId) },
            {
              status: 1,
            },
          ],
        },
      },
    ]);

    console.log(gets);
    data = "";

    if (gets.length == 1) {
      a = gets[0]._id.toString();
      console.log(a.toString());
      //console.log(userId.split(""))
      data = a.slice(-6);
      console.log(data);
    }

    // console.log(gets[0].bookingDetails[0].cartId.length)

    // const get = await trackBookingSchema.aggregate([{
    //   $match: {
    //     userId: mongoose.Types.ObjectId(userId)
    //   },
    // },

    // {
    //   $lookup: {
    //       from: "bookings",
    //       localField: "bookingId",
    //       foreignField: "_id",
    //       as: "bookingDetails",
    //   },
    // },
    // {
    //   $lookup: {
    //       from: "addtocarts",
    //       localField: "bookingDetails.cartId",
    //       foreignField: "_id",
    //       as: "bookingDetailss",
    //   },
    // },
    // {
    //   $lookup: {
    //       from: "servicedatas",
    //       localField: "bookingDetailss.serviceId",
    //       foreignField: "_id",
    //       as: "serviceDetailss",
    //   },
    // },{
    //   $project : {
    //     "serviceDetailss.image":1,
    //     "bookingDetails.pickupDate":1,
    //     "bookingDetails.pickupTime":1,
    //     "bookingDetails.timesOfDay":1
    //   }
    // }
    // ]);

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: gets.length,
        trackBooking: gets[0].trackBooking,
        otp: gets[0].otp,
        bookingId: data,
        fullId: gets[0]._id,
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

router.post("/getTrackBooking", async function (req, res) {
  try {
    const { bookingId } = req.body;

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

    const get = await bookingSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(bookingId),
        },
      },
      // {
      //   $lookup: {
      //       from: "bookings",
      //       localField: "bookingId",
      //       foreignField: "_id",
      //       as: "bookingDetails",
      //   },
      // },
      {
        $lookup: {
          from: "addtocart2",
          localField: "cartId",
          foreignField: "_id",
          as: "bookingDetailss",
        },
      },
      {
        $lookup: {
          from: "servicedata2",
          localField: "bookingDetailss.serviceId",
          foreignField: "_id",
          as: "serviceDetailss",
        },
      },
      {
        $project: {
          serviceDetailss: 1,
          otp: 1,
          trackBooking: 1,
          "bookingDetails.pickupDate": 1,
          "bookingDetails.pickupTime": 1,
          "bookingDetails.timesOfDay": 1,
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

//-----------car Brand -----------kevil ----------

router.post("/getAllCarBrand", async function (req, res) {
  try {
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

    const get = await carBrandSchema.aggregate([
      {
        $match: {},
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

//------------car Model------------kevil -------------

router.post("/getCarModel", async function (req, res) {
  try {
    const { carBrandId } = req.body;
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

    const get = await carModelSchema.aggregate([
      {
        $match: {
          carBrandId: mongoose.Types.ObjectId(carBrandId),
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

//-------------car Model feul -------------kevil --------
router.post("/getCarFuelType", async function (req, res) {
  try {
    const { carModelId } = req.body;
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

    const get = await carModelFuelSchema.aggregate([
      {
        $match: {
          carModelId: mongoose.Types.ObjectId(carModelId),
        },
      },
      {
        $lookup: {
          from: "fueltypes",
          localField: "fuelTypeId",
          foreignField: "_id",
          as: "fuelTypesDetails",
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

//------------User car Add ---------------kevil -----------
router.post("/addNewCar", async function (req, res) {
  try {
    const { image, carTypeId, fuelTypeId, carModelId, carBrandId, userId } =
      req.body;
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

    const get = await carModelSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carModelId),
        },
      },
    ]);
    console.log(get);

    const userCar = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              fuelTypeId: mongoose.Types.ObjectId(fuelTypeId),
            },
            {
              carModelId: mongoose.Types.ObjectId(carModelId),
            },
            {
              carBrandId: mongoose.Types.ObjectId(carBrandId),
            },
          ],
        },
      },
    ]);

    if (userCar.length == 1) {
      return res.status(200).json({
        IsSuccess: true,
        Data: [],
        Message: "Your car is already exist, Please check your car details",
      });
    }

    const userCars = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
          ],
        },
      },
    ]);

    if (userCar.length == 1) {
      return res.status(200).json({
        IsSuccess: true,
        Data: [],
        Message: "Your car is already exist, Please check your car details",
      });
    }

    if (userCars.length >= 1) {
      console.log(userCars);
      for (let i = 0; i < userCars.length; i++) {
        let updateIs;
        updateIs = {
          status: 0,
        };

        let updateIss = await userCarsSchema.findByIdAndUpdate(
          userCars[i]._id,
          updateIs,
          { new: true }
        );

        console.log(updateIss);
      }
    }

    console.log(userCars);
    const add = await new userCarsSchema({
      image: get[0].image,
      carTypeId: carTypeId,
      fuelTypeId: fuelTypeId,
      carModelId: carModelId,
      carBrandId: carBrandId,
      userId: userId,
      status: 1,
    });

    if (add != null) {
      await add.save();
      return res.status(200).json({
        IsSuccess: true,
        Data: [add],
        Message: "Your car is added successfully please check your car details",
      });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: [], Message: error.message });
  }
});

// --------------------- Paras userCar add ServiceId Add Karva Mate --------------------------------
router.post("/addNewUserCar_v5", async function (req, res) {
  try {
    const {
      image,
      carTypeId,
      fuelTypeId,
      carModelId,
      carBrandId,
      userId,
      subServiceCategoryId,
    } = req.body;
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
    const get = await carModelSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(carModelId),
        },
      },
    ]);

    console.log(get);

    const userCar = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              fuelTypeId: mongoose.Types.ObjectId(fuelTypeId),
            },
            {
              carModelId: mongoose.Types.ObjectId(carModelId),
            },
            {
              carBrandId: mongoose.Types.ObjectId(carBrandId),
            },
          ],
        },
      },
    ]);
    console.log(userCar.length);

    if (userCar.length == 1) {
    }
    // if (userCar.length == 1) {
    //   return res.status(200).json({
    //     IsSuccess: true,
    //     Data: [],
    //     Message: "Your car is already exist, Please check your car details",
    //   });
    // }

    // const userCars = await userCarsSchema.aggregate([
    //   {
    //     $match: {
    //       $and: [
    //         {
    //           userId: mongoose.Types.ObjectId(userId),
    //         },
    //       ],
    //     },
    //   },
    // ]);

    // if (userCar.length == 1) {
    //   return res.status(200).json({
    //     IsSuccess: true,
    //     Data: [],
    //     Message: "Your car is already exist, Please check your car details",
    //   });
    // }

    // if (userCars.length >= 1) {
    //   console.log(userCars);
    //   for (let i = 0; i < userCars.length; i++) {
    //     let updateIs;
    //     updateIs = {
    //       status: 0,
    //     };

    //     let updateIss = await userCarsSchema.findByIdAndUpdate(
    //       userCars[i]._id,
    //       updateIs,
    //       { new: true }
    //     );

    //     console.log(updateIss);
    //   }
    // }

    // console.log(userCars);
    // const add = await new userCarsSchema({
    //   image: get[0].image,
    //   carTypeId: carTypeId,
    //   fuelTypeId: fuelTypeId,
    //   carModelId: carModelId,
    //   carBrandId: carBrandId,
    //   userId: userId,
    //   status: 1,
    // });

    // if (add != null) {
    //   await add.save();
    //   return res.status(200).json({
    //     IsSuccess: true,
    //     Data: [add],
    //     Message: "Your car is added successfully please check your car details",
    //   });
    // } else {
    //   return res
    //     .status(200)
    //     .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    // }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: [], Message: error.message });
  }
});

router.post("/deleteUserCar", async function (req, res, next) {
  try {
    const { userCarId } = req.body;

    let deletes = await userCarsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userCarId),
        },
      },
    ]);

    if (deletes.length == 1) {
      let deleteData = await userCarsSchema.findByIdAndDelete(userCarId);
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

router.post("/getUserAllCar", async function (req, res) {
  try {
    const { userId } = req.body;
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

    // const check = await userCarsSchema.aggregate([{
    //   $match: {
    //     $and: [
    //       {userId: mongoose.Types.ObjectId(userId)},
    //       {status: 1}
    //     ]
    //   }
    // }])

    // console.log(check)

    const get = await userCarsSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "carmodels",
          localField: "carModelId",
          foreignField: "_id",
          as: "carModelDetails",
        },
      },
      {
        $lookup: {
          from: "fueltypes",
          localField: "fuelTypeId",
          foreignField: "_id",
          as: "carFuelDetails",
        },
      },
      {
        $project: {
          image: 1,
          "carModelDetails.modelName": 1,
          "carFuelDetails.fuelType": 1,
          "carModelDetails.isActive": 1,
          status: 1,
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

router.post("/getUserSelectedCar", async function (req, res) {
  try {
    const { userId } = req.body;
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

    const get = await userCarsSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 1 }],
        },
      },
      {
        $lookup: {
          from: "carmodels",
          localField: "carModelId",
          foreignField: "_id",
          as: "carModelDetails",
        },
      },
      {
        $lookup: {
          from: "fueltypes",
          localField: "fuelTypeId",
          foreignField: "_id",
          as: "carFuelDetails",
        },
      },
      {
        $project: {
          image: 1,
          // "carModelDetails.modelName": 1,
          // "carModelDetails.isActive": 1,
          "carFuelDetails.fuelType": 1,
          status: 1,
          "carModelDetails": 1
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

router.post("/UpdateUserCarSelect", async function (req, res) {
  try {
    const { userCarId, status, userId } = req.body;

    console.log(userId);

    const updat = await userCarsSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    console.log(updat);

    const update = await userCarsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userCarId),
        },
      },
    ]);

    const updates = await carModelSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(update[0].carModelId),
        },
      },
    ]);
    console.log(updates);
    for (let i = 0; i < updat.length; i++) {
      let updateIs;
      updateIs = {
        status: 0,
      };
      let updateIss = await userCarsSchema.findByIdAndUpdate(
        updat[i]._id,
        updateIs,
        { new: true }
      );
    }

    if (update.length == 1) {
      //
      let updateIs;
      updateIs = {
        status: status != undefined ? status : update[0].status,
      };
      let updateIss = await userCarsSchema.findByIdAndUpdate(
        userCarId,
        updateIs,
        { new: true }
      );
      return res.status(200).json({
        IsSuccess: true,
        carName: updates[0].modelName,
        Data: [updateIss],
        Message: `Updated Data`,
      });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//----------- user bookingCompleteStatus --------------kevil -------

router.post("/getUserBookingCompleteStatus", async function (req, res) {
  try {
    const { userId } = req.body;
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

    const get = await bookingSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          bookingCompleteStatus: 1,
        },
      },
    ]);
    // console.log(get.reverse())

    k = get.reverse();
    console.log(k[0]);

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        bookingCompleteStatus: 1,
        count: get.length,
        Data: [k[0]],
        Message: "Show tract booking",
      });
    } else {
      return res.status(200).json({
        IsSuccess: true,
        bookingCompleteStatus: 0,
        Data: [],
        Message: "add to cart show",
      });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//----------------------- Paras updateUserBookingCompleteStatus_v5-----------------------------------
router.post("/updateUserBookingCompleteStatus_v5", async function (req, res) {
  try {
    const { userId, bookingCompleteStatus, status, bookingId } = req.body;
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
    const update = await bookingSchema.aggregate([
      {
        $match: {
          $and: [
            {
              userId: mongoose.Types.ObjectId(userId),
            },
            {
              _id: mongoose.Types.ObjectId(bookingId),
            },
          ],
        },
      },
    ]);

    console.log(update[0]._id);
    if (update.length == 1) {
      let updateIs;
      updateIs = {
        bookingCompleteStatus:
          bookingCompleteStatus != undefined
            ? bookingCompleteStatus
            : update[0].bookingCompleteStatus,
        status: status != undefined ? status : update[0].status,
      };
      // console.log(updateIs);
      let updateIss = await bookingSchema.findByIdAndUpdate(
        bookingId,
        updateIs,
        { new: true }
      );

      // console.log(updateIss);
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//-----------------All Function -------- kevil -------------

// Send Reset Password Mail
const sendResetPasswordMail = async (name, email, emailToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "paraspatel9teen@gmail.com",
        pass: "hjxxuzapwlwukkxy",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      form: "Your <noreply@gmail.com>",
      to: email,
      subject: "For Reset Pasword",
      html: `<p>Hello ${name},Please click the link for<a href="http://localhost:3008/users/enterNewPassword?emailToken=${emailToken}"> Reset your password</a></p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent");
      }
    });
  } catch (error) {
    res.status(400).send({ isSuccess: false, msg: error.message });
  }
};

//---------------user add address--------kevil----------

router.post("/addNewUserAddress", async function (req, res) {
  try {
    const { userId, address, lat, long, name, phone } = req.body;
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

    const updat = await addressSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    for (let i = 0; i < updat.length; i++) {
      let updateIs;
      updateIs = {
        status: 0,
      };
      let updateIss = await addressSchema.findByIdAndUpdate(
        updat[i]._id,
        updateIs,
        { new: true }
      );
    }

    const add = await new addressSchema({
      address: address,
      lat: lat,
      long: long,
      userId: userId,
      status: 1,
      name: name,
      phone: phone,
    });

    if (add != null) {
      await add.save();
      return res.status(200).json({
        IsSuccess: true,
        Data: [add],
        Message:
          "Your Address is added successfully please check your Address details",
      });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: [], Message: error.message });
  }
});

router.post("/getUserAddress", async function (req, res) {
  try {
    const { userId } = req.body;
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

    const get = await addressSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
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

router.post("/getUserPrimaryAddress", async function (req, res) {
  try {
    const { userId } = req.body;
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

    const get = await addressSchema.aggregate([
      {
        $match: {
          $and: [{ userId: mongoose.Types.ObjectId(userId) }, { status: 1 }],
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

router.post("/UpdateUserAddress", async function (req, res) {
  try {
    const { addressId, status, userId } = req.body;

    console.log(userId);

    const updat = await addressSchema.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    console.log(updat);

    const update = await addressSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(addressId),
        },
      },
    ]);

    for (let i = 0; i < updat.length; i++) {
      let updateIs;
      updateIs = {
        status: 0,
      };
      let updateIss = await addressSchema.findByIdAndUpdate(
        updat[i]._id,
        updateIs,
        { new: true }
      );
    }

    if (update.length == 1) {
      //
      let updateIs;
      updateIs = {
        status: status != undefined ? status : update[0].status,
      };
      let updateIss = await addressSchema.findByIdAndUpdate(
        addressId,
        updateIs,
        { new: true }
      );
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [updateIss], Message: `Updated Data` });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/deleteUserAddress", async function (req, res, next) {
  try {
    const { addressId } = req.body;

    let deletes = await addressSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(addressId),
        },
      },
    ]);

    if (deletes.length == 1) {
      let deleteData = await addressSchema.findByIdAndDelete(addressId);
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

//--------------------setting ---------kevil---------------

router.post("/getRefer", async function (req, res) {
  try {
    const { userId } = req.body;
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

    const setting = await settingSchema.aggregate([
      {
        $match: {
          //userId: mongoose.Types.ObjectId(userId)
        },
      },
    ]);

    const get = await userDetailsSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    var a = parseInt(get[0].refferalPoint) / 4;
    console.log(a);

    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        totalEaring: get[0].refferalPoint,
        userPoint: setting[0].userCode,
        referalPoint: setting[0].referralCode,
        totalDiscount: a.toString(),
        discount: '25',
        code: get[0].randomNo,
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

router.post("/getServiceCategory", async function (req, res) {
  try {
    // const {userId} = req.body

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

    const get = await serviceCategorySchema.aggregate([
      {
        $match: {
          //userId: mongoose.Types.ObjectId(userId)
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

router.post("/getServiceSubCategoryWithCategoryId", async function (req, res) {
  try {
    const { categoryId } = req.body;

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
          subCategoryId: mongoose.Types.ObjectId(categoryId),
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

// ------------------- 5/12/2022 --------------------
router.post(
  "/getServiceSubCategoryWithCategoryId_v5",
  async function (req, res) {
    try {
      const { categoryId, userId } = req.body;

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
      let selectedCar = await userCarsSchema.aggregate([
        {
          $match: {
            $and: [
              {
                userId: mongoose.Types.ObjectId(userId),
              },
              {
                status: 1,
              },
            ],
          },
        },
        {
          $lookup: {
            from: "servicedata2",
            let: { fuelTypeId: "$fuelTypeId", carModelId: "$carModelId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$carFualTypeId", "$$fuelTypeId"],
                      },
                      {
                        $eq: ["$carModelId", "$$carModelId"],
                      },
                      {
                        $eq: [
                          "$subCategoryId",
                          mongoose.Types.ObjectId(categoryId),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "serviceData",
          },
        },
        {
          $unwind: "$serviceData",
        },
        {
          $project: {
            serviceData: 1,
            _id: 0,
          },
        },
      ]);

      selectedCar = selectedCar.map((e) => e.serviceData);

      if (selectedCar.length > 0) {
        return res.status(200).json({
          IsSuccess: true,
          count: selectedCar.length,
          Data: selectedCar,
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
  }
);

router.post("/getUserJobCartApprovedByUserId", async function (req, res) {
  try {
    const { userId } = req.body;

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
    const get = await bookingSchema.aggregate([
      {
        $match: {
          $and: [
            { trackBooking: 2 },
            { userId: mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $lookup: {
          from: "jobcartv2",
          localField: "_id",
          foreignField: "bookingId",
          as: "jobCartDetails",
        },
      },
      {
        $project: {
          jobCartDetails: { $first: "$jobCartDetails" },
        },
      },
    ]);

    console.log(get);
    if (get.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        count: get.length,
        Data: get.length >= 0 ? get[0].jobCartDetails : [],
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

router.post("/updateUserJobCartApproved", async function (req, res) {
  try {
    const { bookingId, trackBooking } = req.body;

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

    const get = await bookingSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(bookingId),
        },
      },
    ]);

    const gets = await venderWork.aggregate([
      {
        $match: {
          bookingId: mongoose.Types.ObjectId(bookingId),
        },
      },
    ]);
    console.log(get);
    console.log(gets);
    if (get[0].trackBooking == 2) {
      if (get.length == 1) {
        let updateIs;
        updateIs = {
          trackBooking: 3,
        };
        let updateIss = await bookingSchema.findByIdAndUpdate(
          get[0]._id,
          updateIs,
          { new: true }
        );
        console.log(updateIss);
      }

      if (gets.length == 1) {
        let updateIs;
        updateIs = {
          serviceStatus: 4,
        };
        let updateIss = await venderWork.findByIdAndUpdate(
          gets[0]._id,
          updateIs,
          { new: true }
        );
        console.log(updateIss);
      }
    }

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

// ------------------------- FeedBack -------- Paras -----------
router.post("/addFeedBack", async function (req, res) {
  try {
    const { rating, feedBack, bookingId } = req.body;

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

    let add = await new feedBackSchema({
      rating: rating,
      feedBack: feedBack,
      bookingId: bookingId,
    });
    if (bookingId != null) {
      await add.save();
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [add], Message: "Added Data" });
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Not Added Data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ IsSuccess: false, Data: 0, Message: error.message });
  }
});

router.post("/getAllFeedBack", async function (req, res) {
  try {
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
    const get = await feedBackSchema.aggregate([
      {
        $match: {},
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

router.post("/getFeedBack", async function (req, res) {
  try {
    const { feedBackId } = req.body;
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
    const get = await feedBackSchema.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(feedBackId),
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

//----------function------kevil --------

function getUserCodeNumber() {
  let generateNo = Math.random().toFixed(4).split(".")[1];
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

function getCurrentDateTimes() {
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
console.log(getCurrentDateTime());
var names = "RealMotors";
function referalCode(names) {
  var result = "";
  var nameIs = names.split(" ");
  var nameUppercase = nameIs[0].toUpperCase();
  var number = Math.floor(100 + Math.random() * 900);
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charLength = characters.length;
  for (var i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }
  var finalResult = nameUppercase + number + result;
  // console.log(finalResult);
  return finalResult;
}

//0 0 0 * * ?
//CRON_JOB for every 24 hour to check ad expiry
cron.schedule("* */24 * * * *", async function () {
  // console.log('running a task every 24 hour');
  let currentDateTime = getCurrentDateTime();
  let currentDate = currentDateTime[0];
  //console.log(currentDateTime)
  //console.log(currentDate)
  let expire = await discountCouponSchema.aggregate([
    {
      $match: {
        endDate: currentDateTime,
      },
    },
  ]);
  //console.log(expire)

  if (expire.length > 0) {
    expire.forEach(async function (adIs) {
      let updateStatus = {
        status: 1,
      };
      let updateAdStatus = await discountCouponSchema.findByIdAndUpdate(
        adIs._id,
        updateStatus
      );
    });
  }

  let memberShip = await userMemberShipSchema.aggregate([
    {
      $match: {
        exDateTime: currentDateTime,
      },
    },
  ]);
  //console.log(memberShip)

  if (memberShip.length > 0) {
    memberShip.forEach(async function (adIs) {
      //console.log(adIs)
      let updateStatus = {
        memberShipStatus: 0,
      };
      let updateAdStatus = await userDetailsSchema.findByIdAndUpdate(
        adIs.userId,
        updateStatus
      );
      console.log(updateAdStatus);
    });
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

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

//------------ GetALlLength -------------Paras -----------
router.post("/getAllLength", async function (req, res) {
  try {
    // const {userId} = req.body
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

    const totalWorkshop = await venderSchema.aggregate([
      {
        $match: {
          // userId: mongoose.Types.ObjectId(userId)
        },
      },
    ]);
    const pendingWorkshop = await venderSchema.aggregate([
      {
        $match: {
          // userId: mongoose.Types.ObjectId(userId)
          venderStatus: 4,
        },
      },
    ]);
    const verifyWorkshop = await venderSchema.aggregate([
      {
        $match: {
          // userId: mongoose.Types.ObjectId(userId)
          venderStatus: 2,
        },
      },
    ]);
    if (totalWorkshop.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        workShopData: [totalWorkshop],
        pendingWorkshop: [pendingWorkshop],
        verifyWorkshop: [verifyWorkshop],
        total: totalWorkshop.length,
        pending: pendingWorkshop.length,
        verify: verifyWorkshop.length,
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

//------------ getAllPaybleAmount -------------Paras -----------
router.post("/getAllPaybleAmount", async function (req, res) {
  try {
    // const {userId} = req.body
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

    const totalPayAmount = await venderWork.aggregate([
      {
        $match: {
          // userId: mongoose.Types.ObjectId(userId)
        },
      },
    ]);
    let total = 0;
    for (let i = 0; i < totalPayAmount.length; i++) {
      element = parseInt(totalPayAmount[i].totalPay);
      total += element;

      // console.log(element);
    }
    // console.log(total);
    if (totalPayAmount.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        TotalPayAmount: total,
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

//------------ todayEarning -------------Paras -----------
router.post("/getTotalEarning", async function (req, res) {
  try {
    // const {userId} = req.body
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

    const date = new Date().toLocaleDateString();
    console.log("newDate", date);
    const totalWorkshop = await venderWork.aggregate([
      {
        $match: {},
      },
    ]);
    console.log(totalWorkshop[0].dateTime[0]);

    totalToday = 0;

    for (let i = 0; i < totalWorkshop.length; i++) {
      if (totalWorkshop[i].dateTime[0] == date) {
        console.log(totalWorkshop[i].totalPay);

        totalToday += parseInt(totalWorkshop[i].totalPay);
      } else {
        console.log("not found");
      }
    }

    totalYesterday = 0;

    console.log(getPreviousDay().toLocaleDateString());

    for (let i = 0; i < totalWorkshop.length; i++) {
      if (totalWorkshop[i].dateTime[0] == getYesterdayString()) {
        console.log(totalWorkshop[i].totalPay);

        totalYesterday += parseInt(totalWorkshop[i].totalPay);
      } else {
        console.log("not found");
      }
    }

    WeekDay = [];

    function d1() {
      var date = new Date();
      date.setDate(date.getDate() - 1);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

      return day + "/" + month + "/" + (date.getYear() + 1900);
    }
    WeekDay.push(d1());
    console.log(d1());

    function d2() {
      var date = new Date();
      date.setDate(date.getDate() - 2);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

      return day + "/" + month + "/" + (date.getYear() + 1900);
    }
    WeekDay.push(d2());
    console.log(d2());

    function d3() {
      var date = new Date();
      date.setDate(date.getDate() - 3);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

      return day + "/" + month + "/" + (date.getYear() + 1900);
    }
    WeekDay.push(d3());
    console.log(d3());

    function d4() {
      var date = new Date();
      date.setDate(date.getDate() - 4);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

      return day + "/" + month + "/" + (date.getYear() + 1900);
    }
    WeekDay.push(d4());
    console.log(d4());

    function d5() {
      var date = new Date();
      date.setDate(date.getDate() - 5);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

      return day + "/" + month + "/" + (date.getYear() + 1900);
    }
    WeekDay.push(d5());
    console.log(d5());

    function d6() {
      var date = new Date();
      date.setDate(date.getDate() - 6);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

      return day + "/" + month + "/" + (date.getYear() + 1900);
    }
    WeekDay.push(d6());
    console.log(d6());

    function d7() {
      var date = new Date();
      date.setDate(date.getDate() - 7);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

      return day + "/" + month + "/" + (date.getYear() + 1900);
    }
    WeekDay.push(d7());
    console.log(d7());

    console.log(WeekDay);

    totalWeek = 0;

    for (let k = 0; k < WeekDay.length; k++) {
      for (let i = 0; i < totalWorkshop.length; i++) {
        if (totalWorkshop[i].dateTime[0] == WeekDay[k]) {
          console.log(totalWorkshop[i].totalPay);

          totalWeek += parseInt(totalWorkshop[i].totalPay);
        } else {
          console.log("not found");
        }
      }
    }

    totalMonth = [];

    for (let i = 0; i < 30; i++) {
      function d7() {
        var date = new Date();
        date.setDate(date.getDate() - i);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

        return day + "/" + month + "/" + (date.getYear() + 1900);
      }
      totalMonth.push(d7());
    }

    console.log(totalMonth);

    totalMonthAmount = 0;

    for (let k = 0; k < totalMonth.length; k++) {
      for (let i = 0; i < totalWorkshop.length; i++) {
        if (totalWorkshop[i].dateTime[0] == totalMonth[k]) {
          console.log(totalWorkshop[i].totalPay);

          totalMonthAmount += parseInt(totalWorkshop[i].totalPay);
        } else {
          console.log("not found");
        }
      }
    }

    return res.status(200).json({
      IsSuccess: true,
      totalToday: totalToday,
      totalYesterday: totalYesterday,
      totalWeek: totalWeek,
      totalMonthAmount: totalMonthAmount,
      Message: "data found",
    });
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getAllVenderFullDetails", async function (req, res) {
  try {
    const { status } = req.body;
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

    if (status == "All") {
      const get = await venderWork.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "bookings",
            localField: "bookingId",
            foreignField: "_id",
            as: "VenderWorkDetails",
          },
        },
        {
          $lookup: {
            from: "venderdetails",
            localField: "venderId",
            foreignField: "_id",
            as: "VenderDetails",
          },
        },

        // },{
        //     $unwind:{
        //       path:"$VenderWorkDetails"
        //     }
        //   },{
        //
        //   }
        {
          $project: {
            "VenderWorkDetails.pickupDate": 1,
            "VenderWorkDetails.pickupTime": 1,
            "VenderWorkDetails.name": 1,
            "VenderWorkDetails.phone": 1,
            "VenderWorkDetails._id": 1,
            "VenderDetails.workshopName": 1,
            dateTime: 1,
            totalPay: 1,
          },
        },
      ]);

      if (get.length == 0) {
        return res
          .status(200)
          .json({ IsSuccess: false, Data: get, Message: "Data Not Found" });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: get, Message: "Data Found" });
      }
    } else {
      const get = await venderWork.aggregate([
        {
          $match: {
            venderId: mongoose.Types.ObjectId(status),
          },
        },
        {
          $lookup: {
            from: "bookings",
            localField: "bookingId",
            foreignField: "_id",
            as: "VenderWorkDetails",
          },
        },
        {
          $lookup: {
            from: "venderdetails",
            localField: "venderId",
            foreignField: "_id",
            as: "VenderDetails",
          },
        },

        // },{
        //     $unwind:{
        //       path:"$VenderWorkDetails"
        //     }
        //   },{
        //
        //   }
        {
          $project: {
            "VenderWorkDetails.pickupDate": 1,
            "VenderWorkDetails.pickupTime": 1,
            "VenderWorkDetails.name": 1,
            "VenderWorkDetails.phone": 1,
            "VenderWorkDetails._id": 1,
            "VenderDetails.workshopName": 1,
            dateTime: 1,
            totalPay: 1,
          },
        },
      ]);

      if (get.length == 0) {
        return res
          .status(200)
          .json({ IsSuccess: false, Data: get, Message: "Data Not Found" });
      } else {
        return res
          .status(200)
          .json({ IsSuccess: true, Data: get, Message: "Data Found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

router.post("/getVenderAllBookingDetails", async function (req, res) {
  try {
    const { venderId } = req.body;
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

    const totalWorkshop = await venderWork.aggregate([
      {
        $match: {
          venderId: mongoose.Types.ObjectId(venderId),
        },
      },
    ]);

    if (totalWorkshop.length > 0) {
      return res.status(200).json({
        IsSuccess: true,
        total: totalWorkshop,

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

// For Calling System Paras

//Video Call or audio Call--------------------Paras---------------------22/12/2022
router.post("/memberCalling", async function (req, res, next) {
  try {
    const {
      callerMemberId,
      callerVenderId,
      receiverMemberId,
      receiverVenderId,
      contactNo,
      AddedBy,
      societyId,
      isVideoCall,
      callFor,
      watchmanId,
      entryId,
    } = req.body;

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
    let callType;

    if (isVideoCall == true) {
      callType = "video";
    } else {
      callType = "audio";
    }

    let updateOnCall = {
      isOnCall: true,
    };

    if (callFor == 0) {
      // Member to vender Calling

      let receiverIs = await venderSchema.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(receiverMemberId),
          },
        },
      ]);
      console.log(receiverIs);
      if (receiverIs[0].isOnCall == true) {
        return res.status(200).json({
          IsSuccess: true,
          Data: [],
          Message: "Receiver Is On Another Call",
        });
      }

      let addCall = await new callingSchema({
        Caller: {
          callerMemberId: callerMemberId,
          callerVenderId: callerVenderId,
        },
        Receiver: {
          receiverMemberId: receiverMemberId,
          receiverVenderId: receiverVenderId,
        },
        contactNo: contactNo,
        AddedBy: AddedBy != undefined || "" ? AddedBy : "Member",
        callStatus: 0,
        callFor: 0,
        date: getCurrentDate(),
        time: getCurrentTime(),
        isVideoCall: isVideoCall != undefined || "" ? isVideoCall : true,
      });

      if (addCall != null) {
        try {
          await addCall.save();

          let callerIs = await userDetailsSchema.aggregate([
            {
              $match: {
                _id: mongoose.Types.ObjectId(callerMemberId),
              },
            },
          ]);

          console.log("log", callerIs);
          let titleIs = `Call From ${callerIs[0].name}`;
          let bodyIs = `Call From ${callerIs[0].name} and contactNo ${callerIs[0].phoneNo}`;

          let notiDataIs = {
            CallerName: callerIs[0].name,
            CallerContactNo: callerIs[0].phoneNo,
            ReceiverName: receiverIs[0].ownerName,
            ReceiverContactNo: receiverIs[0].phone,
            CallingId: addCall._id,
            NotificationType:
              callType == "video" ? "VideoCalling" : "VoiceCall",
            content_available: true,
            click_action: "FLUTTER_NOTIFICATION_CLICK",
            view: "ghj",
          };

          let updateSender = await userDetailsSchema.findByIdAndUpdate(
            callerMemberId,
            updateOnCall
          );
          let updateReceiver = await venderSchema.findByIdAndUpdate(
            receiverMemberId,
            updateOnCall
          );
          if (receiverIs.length == 1) {
            let message = {
              app_id: process.env.APP_ID_IOS,
              contents: {
                en: bodyIs,
              },
              headings: { en: `${titleIs}`, es: "Spanish Title" },
              data: notiDataIs,
              content_available: 1,
              include_player_ids: [callerIs[0].fcm],
              ios_sound:
                callType == "video" ? "videocall.wav" : "Phone-Ring.wav",
            };
            sendOneSignalNotification(
              message,
              true,
              true,
              callerIs[0].fcm,
              callerMemberId,
              notiDataIs.NotificationType,
              receiverIs[0].fcm
            );
          }
          if (receiverIs.length > 0) {
            return res.status(200).json({
              IsSuccess: true,
              Data: [addCall],
              Message: `${callType} call requested to receiver`,
            });
          } else {
            return res.status(200).json({
              IsSuccess: true,
              Data: [],
              Message: `No receiver Tokens Found`,
            });
          }
        } catch (error) {
          return res
            .status(500)
            .json({ IsSuccess: false, Message: error.message });
        }
      }
    } else {
      return res
        .status(200)
        .json({ IsSuccess: true, Data: [], Message: "Calling Faild" });
    }
  } catch (error) {
    res.status(500).json({ IsSuccess: false, Message: error.message });
  }
});

//Get Single member PlayerId
async function getSingleMemberPlayerId(memberId) {
  let memberIdIs = String(memberId);

  let memberToken = await memberTokenSchema.aggregate([
    {
      $match: {
        $and: [
          { memberId: mongoose.Types.ObjectId(memberIdIs) },
          { playerId: { $exists: true } },
          { muteNotificationAudio: false },
        ],
      },
    },
  ]);
  return memberToken;
}

//Send Notification via oneSignal
var sendOneSignalNotification = function (
  data,
  receiver_type,
  sender_type,
  receiverId,
  senderId,
  notification_Category,
  deviceType
) {
  var headers;

  if (receiver_type == true) {
    headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic ZjNjZTU4ODItZjhlMS00NTRjLTg3NzYtYmEwMGZkYmViZTc4",
    };
  } else if (receiver_type == false) {
    headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic MjM3NjdjMjctOWVmMS00Mzg3LTk0MzYtZGEzZjRmZWFkMjQz",
    };
  } else {
    headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic ZjNjZTU4ODItZjhlMS00NTRjLTg3NzYtYmEwMGZkYmViZTc4",
    };
  }
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers,
  };

  var https = require("https");
  var req = https.request(options, function (res) {
    res.on("data", function (data) {
      console.log("Response:");
      // console.log(JSON.parse(data));
    });
  });

  req.on("error", function (e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

function getCurrentDate() {
  let date = moment()
    .tz("Asia/Calcutta")
    .format("DD/MM/YYYY,h:mm:ss a")
    .split(",")[0];

  return date;
}

function getCurrentTime() {
  let time = moment()
    .tz("Asia/Calcutta")
    .format("DD/MM/YYYY,h:mm:ss a")
    .split(",")[1];

  return time;
}

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

//console.log(getPreviousDay().toLocaleDateString(),"hello"); // 👉️ yesterday

function getYesterdayString() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(getYesterdayString())

function d1() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(d1())

function d2() {
  var date = new Date();
  date.setDate(date.getDate() - 2);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(d2())

function d3() {
  var date = new Date();
  date.setDate(date.getDate() - 3);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(d3())

function d4() {
  var date = new Date();
  date.setDate(date.getDate() - 4);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(d4())

function d5() {
  var date = new Date();
  date.setDate(date.getDate() - 5);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(d5())

function d6() {
  var date = new Date();
  date.setDate(date.getDate() - 6);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(d6())

function d7() {
  var date = new Date();
  date.setDate(date.getDate() - 7);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // fix 0 index

  return day + "/" + month + "/" + (date.getYear() + 1900);
}

//console.log(d7())

module.exports = router;

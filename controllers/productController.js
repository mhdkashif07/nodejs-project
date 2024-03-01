const multer = require('multer');
// const sharp = require('sharp');
const Product = require('../models/productModel');
// const {
//   createOne,
//   getAll,
//   getOne,
//   updateOne,
//   deleteOne,
// } = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { successResponse } = require('../helpers/successResponses');
const { CREATED_CODE, OK_CODE } = require('../constants/constants');
// const imageUploder = require('../utils/uploadFileToAws');

const multerStorage = multer.memoryStorage();

//check the uploaded file is only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    //if the mimetype is image so we did not pass any error and pass true
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
  { name: 'productImages', maxCount: 3 },
]);

//** Resize the image
exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files.productImages) return next();

  // 1) image Cover
  // req.body.productImages = `product-${req.params.id}-${Date.now()}-cover.jpeg`;
  // await sharp(req.files.productImages[0].buffer)
  //   .resize(2000, 1333)
  //   .toFormat('jpeg')
  //   .jpeg({ quality: 90 })
  //   .toFile(`public/img/tours/${req.body.productImages}`);

  // 2) Images
  req.body.productImages = [];

  // ** map returns a promise so we solve with Promise.all this will upload the file to local db
  // await Promise.all(
  //   req.files.productImages.map(async (file, i) => {
  //     const fileName = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
  //     await sharp(file.buffer)
  //       .resize(2000, 1333)
  //       .toFormat('jpeg')
  //       .jpeg({ quality: 90 })
  //       .toFile(`public/img/products/${fileName}`);

  //     req.body.productImages.push(fileName);
  //   })
  // );

  //**  this code will upload the image to aws
  await Promise.all(
    req.files.productImages.map(async (file, i) => {
      req.body.productImages.push(
        (
          await imageUploder(
            file.buffer,
            `product-image-${i + 1}-${file.originalname}`
          )
        ).Location
      );
    })
  );

  next();
});

//** create a single product
exports.createProduct = catchAsync(async(req, res, next) => {
  const doc = await Product.create(req.body);
  if(!doc){
    new AppError('No document created', 404)
  }
  successResponse(req, res, 'success', CREATED_CODE, 'Product created successfully', doc);
})

//** get all products
exports.getProducts = catchAsync(async(req, res) => {
  const doc = await Product.find()
  if(!doc){
    new AppError('No document found', 404)
  }
  successResponse(req, res, 'success', 201, '', doc)
})

// //** get a single Product
exports.getProduct = catchAsync(async(req, res) => {
  const doc = await Product.findById(req.params.id);
  if(!doc){
    new AppError('No document found', 404)
  }
  successResponse(req, res, 'success', OK_CODE, 'custom message', doc)
})

// // ** update single Product
// exports.updateProduct = updateOne(Product);

// // ** delete single Product
// exports.deleteProduct = deleteOne(Product);
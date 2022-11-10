//routes/api/mics

const express = require('express');

const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3');

const micValidation = [
  // check('imageURL')
  //   .notEmpty()
  //   .withMessage("Don't give us nothing; please provide an image URL.")
  //   .exists({checkFalsy: true})
  //   .withMessage('Please give us a valid image URL.')
  //   .isLength({max:255})
  //   .withMessage('The max length for your URL should not exceed 255 characters, please.')
  //   .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) //(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?  (try this one if the first doesn't work)
  //   .withMessage('This image link is not valid; Please provide a valid image link.'),
  check('title')
    .notEmpty()
    .withMessage('Please give us a title.')
    .exists({checkFalsy: true})
    .isLength({max: 80})
    .withMessage('Please ensure that your title length is fewer than 80 characters, including spaces'),
  check('description')
    .notEmpty()
    .withMessage('Hey now, give us a description of the Microphone, please.')
    .exists({checkFalsy: true})
    .withMessage("Don't be shy, please write a description.")
    .isLength({max: 255})
    .withMessage('No need to write a novel; keep it fewer than 255 characters, please'),
    handleValidationErrors
];


// get all the mic images     //routes/api/mics
router.get('/', asyncHandler(async function (req, res) {  // actual route path  '/'
  const micImages = await db.Mic.findAll()

  return res.json(micImages)
}));

//get one mic only
router.get('/:id', asyncHandler(async function (req, res) {
  const micId = parseInt(req.params.id, 10)
  const mic = await db.Mic.findOne({
    where: { id: micId }
  });
  return res.json(mic)
}));

//edit a mic image
router.put('/:id', micValidation, requireAuth, asyncHandler(async function (req, res) {


 //remember that micId is just to find it, it is not part of the data to be sent back
  const {
    micId,
    title,
    description,
  } = req.body


  const targetedMicPhoto = await db.Mic.findByPk(micId) //search database for spec mic by its primary key/id

  const editedMicPhoto = targetedMicPhoto.update(
    {
      title,
      description,
    })
    return res.json(editedMicPhoto)
}))


//delete a mic photo

router.delete('/delete', requireAuth, asyncHandler(async function (req, res) {
  const deletedMicPhoto = await db.Mic.findByPk(req.body.id)  //search db for specific mic photo by its primary key/ id
  await deletedMicPhoto.destroy();
  return res.json(req.body.id)
}))



//create a new mic
// router.post("/create", micValidation, requireAuth, asyncHandler(async function (req, res) {
//   const mic = await db.Mic.create(req.body)
//   return res.json(mic)
// }))

//double check the aws; check if aws bucket is set up properly; track where the data is coming from

//aws upload
router.post(
  "/create",
  multipleMulterUpload("micName"), // arg is "name of key"

  asyncHandler(async (req, response) => {

    // console.log('THIS IS THE REQ.FILES FROM THE FRONTEND, THIS IS IN THE MICS API ROUTE', req.files)
    const { userId, title, description } = req.body;

    console.log("This is the userId", userId, "Title:", title, "Description:", description)

    console.log("THIS IS THE REQ.FILES", req.files)

    const awsURLs = await multiplePublicFileUpload(req.files);

    const newMics = []

    awsURLs.forEach(async(oneIndividualAWSURL) => {
      const mic = await db.Mic.create({
        imageURL:oneIndividualAWSURL,
        userId,
        title,
        description,
      })
      newMics.push(mic)
    })




    response.json(newMics);
  })
);



module.exports = router;

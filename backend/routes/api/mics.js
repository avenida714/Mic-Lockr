const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const router = express.Router();
const { check} = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const micValidation = [
  check('imageURL')
    .exists({checkFalsy: true})
    .withMessage('Please give us a valid image URL.')
    .isLength({max:255})
    .withMessage('The max length for your URL should not exceed 255 characters, please.')
    .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) //(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?  (try this one if the first doesn't work)
    .withMessage('This image link is not valid; Please provide a valid image link.'),
  check('title')
    .exists({checkFalsy: true})
    .isLength({max: 80})
    .withMessage('Please ensure that your title length is fewer than 80 characters, including spaces'),
  check('description')
    .exists({checkFalsy: true})
    .withMessage("Don't be shy, please write a description.")
    .isLength({max: 255})
    .withMessage('No need to write a novel; keep it fewer than 255 characters, please')
]


//get all the mic images
router.get('/', asyncHandler(async function (req, res) {
  const micImages = await db.Mic.findAll({//in models, singular capitalized
    order: [
      ["createdAt", "DESC"],
    ],
    include: 'User'
  });

  return res.json(micImages)
}))



module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../../db/models')
const {handleValidationErrors} = require('../../utils/validation')
const { check } = require('express-validator')
const {requireAuth} = require('../../utils/auth')


const validateComment = [
  check('body')
  .exists({checkFalsy: true})
  .withMessage("Don't be shy, find your voice and please leave a comment.")
  .isLength({max: 600})
  .withMessage('Shall I call you Ishmael? Make it fewer than 600 characters please.'),
  handleValidationErrors
]

router.post('/', validateComment, requireAuth, asyncHandler(async function(req, res) {
  const {userId, micId, body} = req.body

  const comment = await db.Comment.build({  //flagx might need to add info to remember the user of this comment
    userId,
    body,
    micId
  })

  const userNewComment = await comment.save()

  return res.json(userNewComment)
}))

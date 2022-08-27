const express = require('express');
const router = express.Router();
const db = require('../../db/models')
const {handleValidationErrors} = require('../../utils/validation')
const { check } = require('express-validator')
const {requireAuth} = require('../../utils/auth')
const asyncHandler = require('express-async-handler');




const validateComment = [
  check('body')
  .notEmpty()
  .withMessage('Let us know what you think; fill out your comment.')
  .exists({checkFalsy: true})
  .withMessage("Don't be shy, find your voice and please leave a comment.")
  .isLength({max: 600})
  .withMessage('Shall I call you Ishmael? Make it fewer than 600 characters please.'),
  handleValidationErrors
]

//get all the comments of a mic
router.get('/:micId', asyncHandler(async function (req, res) {
  const micId = req.params.micId;
  const micComments = await db.Comment.findAll({where: {micId}})
  return res.json(micComments)
}))

//create a comment
router.post('/create', validateComment, requireAuth, asyncHandler(async function(req, res) {
  const {userId, micId, body} = req.body

  const comment = await db.Comment.build({  //flagx might need to add info to remember the user of this comment
    userId,
    body,
    micId
  })

  const userNewComment = await comment.save()

  return res.json(userNewComment)
}))



//update or edit a comment
router.put('/', requireAuth, validateComment, asyncHandler(async function (req, res) {
  const {comment} = req.body;
  const editComment = await db.Comment.findByPk(comment.id)
  const updatedComment = await editComment.update({comment})

  return res.json(updatedComment)
}))


// delete a comment
router.delete('/', requireAuth, asyncHandler(async function (req, res) {
  const commentForDelete = await db.Comment.findByPk(req.body.id)
  await commentForDelete.destroy();
  return res.json(req.body.id)
}))


module.exports = router;

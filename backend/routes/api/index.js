// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const micsRouter = require('./mics.js')

const commentsRouter = require('./comments')


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/mics', micsRouter)

router.use('/comments', commentsRouter)

// router.post('/test', (req, res) => {  from authMe, used for testing
//   res.json({ requestBody: req.body });
// });



module.exports = router;

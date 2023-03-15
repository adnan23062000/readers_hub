const router = require("express").Router();

const userRouter = require("./user.router");
const authRouter = require('./auth.router');
const postRouter = require('./post.router');

router.use('/users', userRouter);

router.use('/auth', authRouter);

router.use('/blog', postRouter);

module.exports = router;


const router = require("express").Router();

const userRouter = require("./user.router");
const authRouter = require('./auth.router');
const blogRouter = require('./post.router');

router.use('/users', userRouter);

router.use('/auth', authRouter);

router.use('/blog', blogRouter);


module.exports = router;


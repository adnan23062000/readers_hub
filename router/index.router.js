const router = require("express").Router();

const userRouter = require("./user.router");
const authRouter = require('./auth.router');
const blogRouter = require('./blog.router');
const totalRouter = require('./totalCount.router');

router.use('/users', userRouter);

router.use('/auth', authRouter);

router.use('/blog', blogRouter);

router.use('/total', totalRouter);


module.exports = router;


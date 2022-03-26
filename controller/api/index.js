const router = require('express').Router();

// const userRoutes = require('./user-routes.js');
// const postRoutes = require("./post-routes.js");
// const commentRoutes = require("./comment-routes.js");
const apiRoutes = require("./test-route.js");

// router.use('/users', userRoutes);
// router.use("/posts", postRoutes);
// router.use("/comments", commentRoutes);
router.use("/", apiRoutes);

module.exports = router;
const {Post, User} = require("../../Models");

const router = require("express").Router();

// Test route to post a post
router.post("/posts", (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
    })
    .then(postData => {
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Test route to post a user
router.post("/users", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Get all users
router.get("/users", (req, res) => {
    User.findAll()
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Get all posts
router.get("/posts", (req, res) => {
    Post.findAll()
    .then(postData => {
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});


module.exports = router;
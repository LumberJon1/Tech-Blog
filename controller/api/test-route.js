const {Post, User, Comment} = require("../../Models");

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

// Get a specific user by ID

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

// Get a specific post by ID
router.get("/posts/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "title",
            "content",
            "created_at"
        ],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(postData => {
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Get all comments for a specific post
router.get("/comments", (req, res) => {
    Comment.findAll()
    .then(commentData => {
        res.json(commentData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

// Post a comment to a specific post
router.post("/comments", (req, res) => {
    // Check whether user has a logged-in session
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(commentData => {
        res.json(commentData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})



module.exports = router;
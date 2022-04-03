const router = require("express").Router();
const {Post, User} = require("../../Models");

// Get all posts
router.get("/", (req, res) => {
    Post.findAll()
    .then(postData => {
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Get a specific post by ID
router.get("/:id", (req, res) => {
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

// Test route to post a post
router.post("/", (req, res) => {
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

module.exports = router;
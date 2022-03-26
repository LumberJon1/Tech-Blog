const router = require("express").Router();
const {User} = require("../../Models");

// Test route to post a user
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
    User.findAll()
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Get a specific user by ID
router.get("/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})


module.exports = router;
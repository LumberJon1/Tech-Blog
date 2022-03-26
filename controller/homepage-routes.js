const { Post, User} = require("../Models");

const router = require("express").Router();


// Render the homepage at the root url
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "title",
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
        // Serialize the data so it can be read by handlebars
        const posts = postData.map(post => post.get({plain: true}));
        res.render("homepage", {posts})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Display the login form page
router.get("/login", (req, res) => {
    res.render("login");
});

// Display the signup form page
router.get("/signup", (req, res) => {
    res.render("signup");
})

module.exports = router;
const { Post, User, Comment} = require("../Models");

const router = require("express").Router();


// Render the homepage at the root url
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "title",
            "created_at",
            "id"
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
        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });
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

// Display the dashboard
router.get("/dashboard", (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
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
        const posts = postData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Display a single post with comments
router.get("/posts/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "content",
            "user_id",
            "created_at"
        ],
        include: [
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ["username"]
                    }
                ]
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json("No post found with this ID");
            return;
        }

        const post = postData.get({plain: true});

        res.render("single-post", {post, loggedIn: req.session.loggedIn});
        console.log(post);
    })
    .catch(err => {res.status(500).json(err)});
})

module.exports = router;
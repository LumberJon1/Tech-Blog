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
});

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json("No user with that username");
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json("Incorrect password.");
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

module.exports = router;
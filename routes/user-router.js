const Router = require('../framework/router');

const router = new Router();

const users = [
    {
        id: 1,
        name: "Vadim"
    },
    {
        id: 2,
        name: "Ernie"
    }
];

router.get("/users",  (req, res) => {
    const user = req.body;
    res.send(user);
});

router.post("/users",  (req, res, next) => {
    const user = req.body;
    res.send(user);
    next()
});

router.get("/posts", (req, res) => {
    console.log("Hello from get /posts")
});

module.exports = router;
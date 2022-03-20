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

router.get("/users", (req, res) => {
    console.log("Hello from get /users");
});

router.post("/users", async (req, res) => {
    const user = await req.body;
    console.log(user, "user")
    users.push(user);
    res.send(users);
});

router.get("/posts", (req, res) => {
    console.log("Hello from get /posts")
});

module.exports = router;
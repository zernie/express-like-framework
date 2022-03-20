const App = require('./framework/app');
const PORT = process.env.PORT || 5000;
const app = new App();
const router = require('./routes/user-router');
const parseJSON = require('./framework/middlewares/parseJSON');
const bodyParser = require('./framework/middlewares/bodyParser');

app.use(parseJSON)
app.use(bodyParser)

app.addRouter(router)

console.dir(router)

app.listen(PORT);
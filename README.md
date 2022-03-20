# express-like-framework
в framework/middlewares лежит bodyParse.js
его суть принять req, res и записать в req.body тело запроса полученного при post запросе например. 
но проблема в том что когда код в bodyParse.js отрабатывает req.on('end') еще не успевает отработать 
и соответственно записать в req.body тело запроса.
я попробовал эту проблему решить с помощью промисов но получилосб по костыльному.
в routes/user-router.js вызывается:

      router.post("/users", async (req, res) => {
          const user = await req.body;
          console.log(user, "user")
          users.push(user);
          res.send(users);
      });

и чтобы получить req.body приходится использовать async await

Вопрос: как сделать так чтобы не приходилось в user-router использовать async await для получения req.body?

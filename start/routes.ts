import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post("/register", "AuthController.register")
Route.post("login", "AuthController.login")
Route.post("/write", "ArticleController.write")
Route.get("/read", "ArticleController.read")

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post("/register", "AuthController.register")
Route.post("login", "AuthController.login")
Route.post("/escreve_article", "ArticleController.write")
Route.get("/ler_article", "ArticleController.read")
Route.post("/escreve_competicao", "CompetController.write")
Route.get("/ler_competicao", "CompetController.read")

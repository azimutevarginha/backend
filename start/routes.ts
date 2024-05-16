import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")
Route.post("/escrever_article", "ArticleController.escreveNoti")
Route.get("/ler_article", "ArticleController.leNoti")
Route.post("/escrever_competicao", "CompetController.escreveComp")
Route.get("/ler_competicao", "CompetController.leComp")

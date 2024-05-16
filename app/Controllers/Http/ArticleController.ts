import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import ArticleValidator from '../../Validators/ArticleValidator'

export default class ArticleController{
    public async escreveNoti({ request }: HttpContextContract) {
        const data = await request.validate(ArticleValidator)
        const article = await Article.create({...data})
        return article
    }
    public async leNoti({ request }: HttpContextContract) {
        const { page, perPage } = request.only(['page', 'perPage']);
        const data = await Article.query().paginate(page || 1, perPage || 10)
    
        return data;
      }
}
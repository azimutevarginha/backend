import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Compet from '../../Models/Compet'

import CompetValidator from '../../Validators/CompetValidator'


export default class CompetController {


    //const file: File = converToFile(data.arqBoletim); // Converta para o tipo File

    public async escreveComp({ request, response }: HttpContextContract) {
        
        const data = await request.validate(CompetValidator)
        const compet = await Compet.create({
            data: data.data,
            nome: data.nome,
            descricao: data.descricao,
            linkBoletim: data.linkBoletim,
            
            linkInscricao: data.linkInscricao,
            updatedAt: data.updateAt,
        })
        return compet
    }

    public async leComp({ request }: HttpContextContract) {
        const { page, perPage } = request.only(['page', 'perPage']);
        const data = await Compet.query().paginate(page || 1, perPage || 10)
        return data;
    }
}
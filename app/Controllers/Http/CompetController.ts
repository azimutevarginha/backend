import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Compet from '../../Models/Compet'
import GoogleDriveService from '../../Services/GoogleDriveService'
import CompetValidator from '../../Validators/CompetValidator'
import { join } from 'path'


export default class CompetController {


    //const file: File = converToFile(data.arqBoletim); // Converta para o tipo File

    public async escreveComp({ request }: HttpContextContract) {
        
        const data = await request.validate(CompetValidator)

        const boletimFile = request.file('arqBoletim')
        const tempFilePath = join(__dirname, '../../../tmp/uploads', `${Date.now()}-${boletimFile?.clientName}`)
        await boletimFile?.move(tempFilePath)

        const file = await GoogleDriveService.uploadFile(tempFilePath, boletimFile?.clientName || '', boletimFile?.headers['content-type'] || '')

        const compet = await Compet.create({
            data: data.data,
            nome: data.nome,
            descricao: data.descricao,
            linkBoletim: data.linkBoletim,
            arqBoletim: file.webViewLink,
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
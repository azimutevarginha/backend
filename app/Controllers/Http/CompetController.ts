import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Compet from 'App/Models/Compet'
import { MultipartFileContract} from '@ioc:Adonis/Core/BodyParser'
import CompetValidator from '../../Validators/CompetValidator'
import { MultipartFile } from '@adonisjs/bodyparser'

const fs = require('fs');
const { File } = require('interface-file');

function converToFile(multipartFile:any) {

  // Crie um novo arquivo do tipo File
  const interfaceFile = new File();

  // Configure o nome do arquivo
  interfaceFile.name = multipartFile.clientName;

  // Configure o tipo MIME do arquivo
  interfaceFile.type = multipartFile.headers['content-type'];

  // Leia o conteúdo do arquivo e configure-o no arquivo de interface
  interfaceFile.data = fs.readFileSync(multipartFile.tmpPath);

  return interfaceFile;
}

export default class CompetController {
    
    public async escreveComp({ request }: HttpContextContract) {
        const data = await request.validate(CompetValidator)
        const file: File = converToFile(data.arqBoletim); // Converta para o tipo File
        const compet = await Compet.create({
            data: data.data,
            nome: data.nome,
            descricao: data.descricao,
            linkBoletim: data.linkBoletim,
            arqBoletim: file,
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
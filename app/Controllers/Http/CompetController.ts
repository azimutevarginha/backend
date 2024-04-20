import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Compet from 'App/Models/Compet'
import GoogleDriveService from 'App/Services/GoogleDriveService'
import CompetValidator from '../../Validators/CompetValidator'

const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync('app\Services\client_secret_887865607362-stt5ougotg9t0gr4q2ggk21fkdccge79.apps.googleusercontent.com.json', 'utf-8'))
const scopes = ['https://www.googleapis.com/auth/drive']
const IdPasta = '1GfxpebCLfNWLGSYCDJyATI7KGzL1p6tu'

// *CONVERSOR DE TIPOS DE ARQUIVO - CASO NECESSÁRIO
//const { File } = require('interface-file');

//function converToFile(multipartFile: any) {

// *Crie um novo arquivo do tipo File
//const interfaceFile = new File();

// *Configure o nome do arquivo*/
//interfaceFile.name = multipartFile.clientName;

// *Configure o tipo MIME do arquivo
//interfaceFile.type = multipartFile.headers['content-type'];

// *Leia o conteúdo do arquivo e configure-o no arquivo de interface
//interfaceFile.data = fs.readFileSync(multipartFile.tmpPath);

//return interfaceFile;
//}

export default class CompetController {

    public async uploadArquivo({ request }: HttpContextContract) : Promise<string> {
        const data = await request.validate(CompetValidator)
        const file = request.file(data.arqBoletim.fieldName) //Nome do arquivo no formulário do frontend

        if (file != null) {
            try {
                const googleDriveService = new GoogleDriveService(credentials, scopes);
                if (!file.tmpPath) {
                    throw new Error('Caminho temporário do arquivo não definido.');
                }

                const fileId = await googleDriveService.uploadFile({
                    file: { tmpPath: file.tmpPath },
                    filePath: file.tmpPath, // Caminho temporário do arquivo
                    folderId: IdPasta, // ID da pasta no Google Drive
                    fileName: file.clientName, // Nome do arquivo
                });

                return fileId;
            } catch (error) {
                console.error('Erro ao fazer upload do arquivo:', error)
            }
        }
        return 'Erro ao fazer upload do arquivo.';
    }

    //const file: File = converToFile(data.arqBoletim); // Converta para o tipo File

    public async escreveComp({ request, response }: HttpContextContract) {
        const arq = await this.uploadArquivo(<HttpContextContract>{request, response});
        const data = await request.validate(CompetValidator)
        const compet = await Compet.create({
            data: data.data,
            nome: data.nome,
            descricao: data.descricao,
            linkBoletim: data.linkBoletim,
            arqBoletim: arq,
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
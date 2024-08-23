import { google } from 'googleapis'
import Env from '@ioc:Adonis/Core/Env'
import fs from 'fs'

class GoogleDriveService {
  private driveClient = new google.drive_v3.Drive({
    auth: new google.auth.GoogleAuth({
      credentials: {
        client_email: Env.get('GOOGLE_DRIVE_CLIENT_EMAIL'),
        private_key: Env.get('GOOGLE_DRIVE_PRIVATE_KEY'),
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    }),
  })

  public async uploadFile(filePath: string, fileName: string, mimeType: string) {
    const fileMetadata = {
      name: fileName,
      parents: [Env.get('GOOGLE_DRIVE_FOLDER_ID')],
    }

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    }

    const response = await this.driveClient.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    })

    // Opcional: Apagar o arquivo local após o upload
    fs.unlinkSync(filePath)

    return response.data
  }

  // Outras funções relacionadas ao Google Drive podem ser adicionadas aqui
}

export default new GoogleDriveService()

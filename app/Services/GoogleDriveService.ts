import { google, drive_v3 } from 'googleapis';
import fs from 'fs';

interface UploadOptions {
    file: { tmpPath: string | undefined };
    filePath: string;
    folderId: string;
    fileName: string;
}

export default class GoogleDriveService {
    private readonly authClient: any;

    constructor(credentials: any, scopes: string[]) {
        const auth = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: scopes,
        });

        this.authClient = auth.getClient();
    }

    public async uploadFile(options: UploadOptions): Promise<string> {
        const drive = google.drive({ version: 'v3', auth: await this.authClient });

        // Leitura do arquivo
        const fileContent = fs.readFileSync(options.filePath);

        // Metadata do arquivo
        const fileMetadata: Partial<drive_v3.Schema$File> = {
            name: options.fileName,
            parents: [options.folderId],
        };

        try {
            // Upload do arquivo
            const response = await drive.files.create({
                requestBody: fileMetadata,
                media: {
                    mimeType: 'text/plain',
                    body: fileContent,
                },
                fields: 'id',
            });

            // Verificar se o ID do arquivo está presente na resposta
            if (response.data.id) {
                return response.data.id;
            } else {
                throw new Error('ID do arquivo não está presente na resposta.');
            }
        } catch (error) {
            throw new Error(`Erro ao enviar o arquivo: ${error.message}`);
        }
    }
}
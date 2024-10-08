import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import vine from '@vinejs/vine'

export default class CompetValidator {
    constructor(protected ctx: HttpContextContract) { }

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string([ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string([
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
        nome: schema.string({}, [
            rules.required()
        ]),
        data: schema.date({
            format: 'yyyy-MM-dd'
        }, [
            rules.required(),
        ]),
        descricao: schema.string({}, [
            rules.required(),
        ]),
        linkBoletim: schema.string({}, [
            rules.required(),
        ]),
        arqBoletim: schema.file({
            size: '2mb',
            extnames: ['.pdf'],
        }, [
            rules.required(),
        ]),
        linkInscricao: schema.string({}, [
            rules.required(),
        ]),
        updateAt: schema.date({}, [
            rules.required(),
        ]),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {
        'arqBoletim.file.extname': 'O arquivo do boletim deve ser um arquivo PDF.',
        'arqBoletim.file.size': 'O arquivo do boletim deve ter no máximo 2MB.',
        'nome.required': 'O nome da competição é obrigatório.',
        'data.required': 'A data da competição é obrigatória.',
        'descricao.required': 'A descrição da competição é obrigatória.',
        'linkBoletim.required': 'O link do boletim é obrigatório.',
        'arqBoletim.required': 'O arquivo do boletim é obrigatório.',
        'linkInscricao.required': 'O link de inscrição é obrigatório.',
    }
}
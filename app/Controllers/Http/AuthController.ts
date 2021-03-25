import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        const token = await auth.use('api').attempt(email, password)
        return token.toJSON()
    }

    public async create({ request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        if (!email || !password) {
            return response.status(400).send({
                error: 'Missing required field'
            });
        }

        const hashedPassword = await Hash.make(password);

        return await Database
          .insertQuery()
          .table('users')
          .insert({ email, password: hashedPassword })
    }
}

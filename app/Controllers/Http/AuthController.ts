import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import ApiException from 'App/Exceptions/ApiException.ts'

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        const token = await auth.use('api').attempt(email, password)
        return token.toJSON()
    }

    public async create({ request }: HttpContextContract) {
        const userSchema = schema.create({
            email: schema.string({}, [ rules.email() ]),
            password: schema.string({}, [
                rules.minLength(8),
                rules.maxLength(256),
            ]),
        })

        const validatedData = await request.validate({ schema: userSchema })
        const existingUser = await User.findBy('email', validatedData.email)

        if (existingUser) {
            throw new ApiException('User already exists')
        }

        const user = await User.create({
            email: validatedData.email,
            password: validatedData.password,
        })

        return {
            success: true,
            message: 'User created',
            data: {
                email: user.email,
            },
        }
    }
}

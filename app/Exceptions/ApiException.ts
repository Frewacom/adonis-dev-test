import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserExistException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ApiException extends Exception {
    constructor(message: string, code: number=400) {
        super(message, code)
    }

    /**
     * Implement the handle method to manually handle this exception.
     * Otherwise it will be handled by the global exception handler.
     */
    public async handle (error: this, { response }: HttpContextContract) {
        response
            .status(error.status)
            .send({
                id: 'E_API_EXCEPTION',
                status: error.code,
                success: false,
                message: error.message,
            })
    }
}

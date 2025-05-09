import { RoutePath } from '#config/routes'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toPath(RoutePath.HOME)
  }
}

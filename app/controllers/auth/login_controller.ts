import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import { RoutePath } from '#config/routes'

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect().toPath(RoutePath.PROFILE)
  }
}

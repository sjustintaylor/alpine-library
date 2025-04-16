import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { RoutePath } from '#config/routes'

export default class ProfilesController {
  /**
   * Display the user's personal profile, where they can make changes.
   */
  async index({ view, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) {
      return response.redirect().toPath(RoutePath.HOME)
    }
    return view.render('pages/profiles/private-profile')
  }

  /**
   * Show individual profile, if public
   */
  async show({ view, params, auth, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const user = await auth.authenticate()
      if (user.username === params.id) {
        return view.render('pages/profiles/public-profile')
      }
    } else {
      const profile = await User.findBy({ username: params.id })
      if (!profile || !profile.hasPublicProfile) {
        return response.redirect().toPath(RoutePath.HOME)
      }
      return view.render('pages/profiles/public-profile')
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}
}

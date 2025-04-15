import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  /**
   * Display the user's personal profile, where they can make changes.
   */
  async index({ view }: HttpContext) {
    return view.render('pages/profiles/private-profile')
  }

  /**
   * Show individual profile, if public
   */
  async show({ view, params }: HttpContext) {
    return view.render('pages/profiles/public-profile')
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}
}

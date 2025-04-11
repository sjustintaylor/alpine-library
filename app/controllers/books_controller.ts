import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display book search page
   */
  async index({ request, view }: HttpContext) {
    return view.render('pages/books/search')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}
}

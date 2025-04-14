import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display book search page
   * Also returns search results if request contains query params for it
   */
  async index({ request, view }: HttpContext) {
    return view.render('pages/books/search')
  }

  /**
   * Handle form submission for the create book action (if the book is being added manually)
   */
  async store({ request }: HttpContext) {}
}

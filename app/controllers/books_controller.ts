import type { HttpContext } from '@adonisjs/core/http'
import ky from 'ky'
import ISBN from 'isbn3'
import Book from '#models/book'
import { GoogleBook } from '../lib/types.js'

export default class BooksController {
  /**
   * Display book search page
   * Also returns search results if request contains query params for it
   */
  async index(ctx: HttpContext) {
    const query: string = ctx.request.qs().query
    if (!query) {
      return ctx.view.render('pages/search')
    }
    const googleBooks = await ky
      .get<GoogleBook>('https://www.googleapis.com/books/v1/volumes', {
        searchParams: {
          q: query,
        },
      })
      .json()

    return ctx.view.render('pages/search', {
      results: googleBooks.items.map((el) => ({
        title: el.volumeInfo.title,
        author: el.volumeInfo.authors.join(', '),
        description: el.volumeInfo.description,
        googleId: el.id,
      })),
    })
  }

  /**
   * Handle form submission for the create book action (if the book is being added manually)
   */
  async store({ request }: HttpContext) {}
}

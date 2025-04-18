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
    const query: string = ctx.params.query
    const isbn = (() => {
      const result = ISBN.parse(query.trim())
      if (result?.isValid) {
        if (result.isIsbn10) {
          return result.isbn10
        }
        if (result.isIsbn13) {
          return result.isbn13
        }
      }
    })()
    let results: Book[] = []
    if (isbn) {
      const searchResults = await Book.findBy({ isbn })
      if (!searchResults) {
        const googleBooks = await ky
          .get<GoogleBook>('https://www.googleapis.com/books/v1/volumes', {
            searchParams: {
              q: `isbn:${isbn}`,
            },
          })
          .json()
        results.push(
          googleBooks.items.map((el) => {
            const {
              title,
              subtitle,
              authors,
              publishedDate,
              description,
              imageLinks,
              industryIdentifiers,
            } = el.volumeInfo

            const id = Object.fromEntries(industryIdentifiers.map((el) => [el.type, el.identifier]))

            return Book.crea
          })
        )
      }
    } else {
      searchResults = await ky
        .get('https://www.googleapis.com/books/v1/volumes', {
          searchParams: {
            q: query,
          },
        })
        .json()
    }
    return ctx.view.render('pages/search')
  }

  /**
   * Handle form submission for the create book action (if the book is being added manually)
   */
  async store({ request }: HttpContext) {}
}

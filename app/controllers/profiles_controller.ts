import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { RoutePath } from '#config/routes'
import ReadingListEntry, { EntryType } from '#models/reading_list_entry'
import Book from '#models/book'

export default class ProfilesController {
  /**
   * Display the user's personal profile, where they can make changes if they're logged in.
   * Will display their profile publically if enabled.
   */
  async index({ view, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) {
      return response.redirect().toPath(RoutePath.HOME)
    }
    const readingLists = await ReadingListEntry.findManyBy({ userId: user.id })
    const books = await Book.findMany(readingLists.map((el) => el.id))

    let reading: Book[] = []
    let finished: Book[] = []
    let abandoned: Book[] = []
    let wantToRead: Book[] = []

    for (const book of books) {
      const entry = readingLists.find((el) => el.bookId === book.id)
      if (entry) {
        switch (entry.entryType) {
          case EntryType.WANT_TO_READ: {
            wantToRead.push(book)
            break
          }
          case EntryType.READING: {
            reading.push(book)
            break
          }
          case EntryType.FINISHED: {
            finished.push(book)
            break
          }
          case EntryType.ABANDONED: {
            abandoned.push(book)
            break
          }
        }
      }
    }

    return view.render('pages/profile', {
      username: user.username,
      visibility: user.hasPublicProfile,
      reading,
      finished,
      abandoned,
      wantToRead,
    })
  }

  /**
   * Show individual profile, if public
   */
  async show({ view, params, auth, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const user = await auth.authenticate()
      if (user.username === params.id) {
        return view.render('pages/profile')
      }
    } else {
      const profile = await User.findByOrFail({ username: params.id })
      if (!profile.hasPublicProfile) {
        return response.redirect().toPath(RoutePath.HOME)
      }
      const readingLists = await ReadingListEntry.findManyBy({ userId: profile.id })
      const books = await Book.findMany(readingLists.map((el) => el.id))

      let reading: Book[] = []
      let finished: Book[] = []
      let abandoned: Book[] = []
      let wantToRead: Book[] = []

      for (const book of books) {
        const entry = readingLists.find((el) => el.bookId === book.id)
        if (entry) {
          switch (entry.entryType) {
            case EntryType.WANT_TO_READ: {
              wantToRead.push(book)
              break
            }
            case EntryType.READING: {
              reading.push(book)
              break
            }
            case EntryType.FINISHED: {
              finished.push(book)
              break
            }
            case EntryType.ABANDONED: {
              abandoned.push(book)
              break
            }
          }
        }
      }

      return view.render('pages/profile', {
        username: profile.username,
        visibility: profile.hasPublicProfile,

        reading,
        finished,
        abandoned,
        wantToRead,
      })
    }
  }

  /**
   * Handle form submission for setting visibility
   */
  async update(ctx: HttpContext) {
    const user = await ctx.auth.authenticate()
    if (!user) {
      return ctx.response.redirect().toPath(RoutePath.HOME)
    }

    const profile = await User.findByOrFail({ username: user.username })
    profile.hasPublicProfile = !profile.hasPublicProfile

    await profile.save()
  }
}

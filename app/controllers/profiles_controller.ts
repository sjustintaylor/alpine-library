import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { RoutePath } from '#config/routes'
import ReadingListEntry, { EntryType } from '#models/reading_list_entry'
import Book from '#models/book'

export default class ProfilesController {
  /**
   * Display the user's personal profile, where they can make changes.
   */
  async index({ view, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) {
      return response.redirect().toPath(RoutePath.HOME)
    }
    const readingLists = await ReadingListEntry.findManyBy({ userId: user.id })
    const books = await Book.findMany(readingLists.map((el) => el.id))

    const readingList = readingLists.filter((el) => el.entryType === EntryType.READING)
    const finishedList = readingLists.filter((el) => el.entryType === EntryType.FINISHED)
    const abandonedList = readingLists.filter((el) => el.entryType === EntryType.ABANDONED)
    const wantToReadList = readingLists.filter((el) => el.entryType === EntryType.WANT_TO_READ)

    return view.render('pages/profiles/private-profile', {
      username: user.username,
      visibility: user.hasPublicProfile,
      reading: books.filter((el) => readingList.some((sm) => sm.bookId === el.id)),
      finished: books.filter((el) => finishedList.some((sm) => sm.bookId === el.id)),
      abandoned: books.filter((el) => abandonedList.some((sm) => sm.bookId === el.id)),
      wantToRead: books.filter((el) => wantToReadList.some((sm) => sm.bookId === el.id)),
    })
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
   * Handle form submission for setting visibility
   */
  async update(ctx: HttpContext) {
    const user = await ctx.auth.authenticate()
    if (!user) {
      return ctx.response.redirect().toPath(RoutePath.HOME)
    }
    const profile = await User.findBy({ username: user.username })
    if (!profile) {
      return ctx.response.redirect().toPath(RoutePath.HOME)
    }
    profile.hasPublicProfile = !profile.hasPublicProfile
    await profile.save()
  }
}

import Book from '#models/book'

import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const book = await Book.create({
      title: 'On writing',
      subtitle: '',
      description:
        "Part memoir, part master class by one of the bestselling authors of all time, this superb volume is a revealing and practical view of the writer's craft, comprising the basic tools of the trade every writer must have. King's advice is grounded in the vivid memories from childhood through his emergence as a writer, from his struggling early career to his widely reported, near-fatal accident in 1999 - and how the inextricable link between writing and living spurred his recovery.",
    })
    await book.related('authors').create({ fullName: 'Stephen King' })

    await book.related('identifiers').create({
      isbn10: '0743455967',
    })

    const user = await User.create({
      username: 'darthbobcat',
      email: 'hello@sjustintaylor.me',
      password:
        '$scrypt$n=16384,r=8,p=1$5GM4foXIU9iLMC3RQC1EGA$FUb4mVg9D37MBLzNN0y77l433TKjkJ0IS+jn3ILHZZAMGMxjbpaBFTz/MlwjJTkFUN5sasmOUsPOuVj9uPBOxA',
      hasPublicProfile: true,
    })

    await user.related('readingListEntries').create({ bookId: book.id })
  }
}

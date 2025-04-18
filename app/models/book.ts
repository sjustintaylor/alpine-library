import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'

import type { HasMany } from '@adonisjs/lucid/types/relations'
import ReadingListEntry from './reading_list_entry.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare title: string

  @column()
  declare subtitle: string | null

  @column()
  declare description: string | null

  @column()
  declare coverUrl: string | null

  @column.dateTime()
  declare publishedDate: DateTime | null

  @column()
  declare isbn: string | null

  @column()
  declare googleBooksId: string | null

  @column()
  declare authors: string | null

  @hasMany(() => ReadingListEntry)
  declare readingListEntries: HasMany<typeof ReadingListEntry>
}

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import BookIdentifier from './book_identifier.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
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

  @hasOne(() => BookIdentifier)
  declare identifiers: HasOne<typeof BookIdentifier>

  @hasMany(() => ReadingListEntry)
  declare readingListEntries: HasMany<typeof ReadingListEntry>
}

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ReadingListEntry extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare entryType: EntryType

  @column()
  declare bookId: number

  @column()
  declare userId: number
}
export enum EntryType {
  WANT_TO_READ,
  READING,
  FINISHED,
  ABANDONED,
}

import { relations, sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
export const booksTable = sqliteTable('books', {
  id: int().primaryKey({ autoIncrement: true }),
  created_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  title: text().notNull(),
  subtitle: text(),
  description: text(),
  cover_url: text(),
  published_date: int({ mode: 'timestamp' }),
})

export const booksRelations = relations(booksTable, ({ one }) => ({
  identifiers: one(bookIdentifiersTable),
}))

export const bookIdentifiersTable = sqliteTable('book_identifiers', {
  id: int().primaryKey({ autoIncrement: true }),
  created_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  isbn10: text(),
  isbn13: text(),
  google_book_id: text(),
})

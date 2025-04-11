import { sql } from 'drizzle-orm'
import { int, sqliteTable } from 'drizzle-orm/sqlite-core'

export const readingListEntriesTable = sqliteTable('reading_list_entries', {
  id: int().primaryKey({ autoIncrement: true }),
  created_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  entry_type: int().notNull().default(0),
})

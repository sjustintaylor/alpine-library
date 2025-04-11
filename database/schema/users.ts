import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  created_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: int({ mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})

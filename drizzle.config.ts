import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './database/migrations',
  schema: './database/schema',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'tmp/libsql.db',
  },
  // dbCredentials: {
  //   url: process.env.DATABASE_URL,
  //   authToken: process.env.DATABASE_TOKEN,
  // },
})

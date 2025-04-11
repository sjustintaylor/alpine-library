import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('NODE_ENV') === 'production' ? 'remote' : 'local',
  connections: {
    local: {
      client: 'libsql',
      connection: {
        filename: `file:${app.tmpPath('libsql.db')}`,
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    remote: {
      client: 'libsql',
      connection: {
        filename: `${env.get('DATABASE_URL')}?authToken=${env.get('DATABASE_TOKEN')}`,
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig

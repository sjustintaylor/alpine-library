import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.text('title').notNullable()
      table.text('subtitle')
      table.text('description')
      table.text('cover_url')

      table.text('isbn').unique()
      table.text('google_books_id').unique()

      table.text('authors')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'author_book'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('book_id').unsigned().references('books.id')
      table.integer('author_id').unsigned().references('authors.id')
      table.unique(['author_id', 'book_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

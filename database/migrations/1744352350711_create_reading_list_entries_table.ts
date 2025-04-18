import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reading_list_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('entry_type').unsigned().notNullable().defaultTo(0)

      table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.unique(['user_id', 'book_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

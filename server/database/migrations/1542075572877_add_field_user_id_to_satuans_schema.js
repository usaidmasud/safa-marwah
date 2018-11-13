'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldUserIdToSatuansSchema extends Schema {
  up () {
    this.table('satuans', (table) => {
      // alter table
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('satuans', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddFieldUserIdToSatuansSchema

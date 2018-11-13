'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldUserIdToKategorisSchema extends Schema {
  up () {
    this.table('kategoris', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('kategoris', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddFieldUserIdToKategorisSchema

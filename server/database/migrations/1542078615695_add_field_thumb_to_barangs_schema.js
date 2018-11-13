'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldThumbToBarangsSchema extends Schema {
  up () {
    this.table('barangs', (table) => {
      table.string('thumbnail')
    })
  }

  down () {
    this.table('barangs', (table) => {
      table.dropColumn('thumbnail')
    })
  }
}

module.exports = AddFieldThumbToBarangsSchema

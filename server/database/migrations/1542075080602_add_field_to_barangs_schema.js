'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldToBarangsSchema extends Schema {
  up () {
    this.table('barangs', (table) => {
      table.integer('satuan_id').unsigned().references('id').inTable('satuans')
      table.integer('kategori_id').unsigned().references('id').inTable('kategoris')
    })
  }

  down () {
    this.table('barangs', (table) => {
      table.dropColumn('satuan_id')
      table.dropColumn('kategori_id')
    })
  }
}

module.exports = AddFieldToBarangsSchema

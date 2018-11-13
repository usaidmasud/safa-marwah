'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangSchema extends Schema {
  up () {
    this.create('barangs', (table) => {
      table.increments()
      table.string('slug').unique().index()
      table.string('nama_barang')
      table.integer('qty')
      table.integer('harga_beli')
      table.integer('diskon')
      table.integer('harga_jual')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('barangs')
  }
}

module.exports = BarangSchema

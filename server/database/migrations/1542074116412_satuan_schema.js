'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SatuanSchema extends Schema {
  up () {
    this.create('satuans', (table) => {
      table.increments()
      table.string('nama_satuan')
      table.timestamps()
    })
  }

  down () {
    this.drop('satuans')
  }
}

module.exports = SatuanSchema

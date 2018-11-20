'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Barang extends Model {
    user(){
        return this.belongsTo('App/Models/User')
    }

    satuan(){
        return this.belongsTo('App/Models/Satuan')
    }

    kategori(){
        return this.belongsTo('App/Models/Kategori')
    }
}

module.exports = Barang

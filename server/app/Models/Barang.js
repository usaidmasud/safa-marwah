'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Barang extends Model {
    user(){
        return this.belongsTo('App/Model/User')
    }

    satuan(){
        return this.belongsTo('App/Model/Satuan')
    }

    kategori(){
        return this.belongsTo('App/Model/Kategori')
    }
}

module.exports = Barang

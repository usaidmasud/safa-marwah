'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Satuan extends Model {
    user(){
        return this.belongsTo('App/Model/User')
    }

}

module.exports = Satuan

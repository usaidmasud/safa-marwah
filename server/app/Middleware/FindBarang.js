


'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Barang = use('App/Models/Barang')

class FindBarang {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    const barang = await Barang.find(id)
    
    if (!barang) {
      return response.status(404).json({
        message : 'not found',
        id
      })
    }
    
    request.barang = barang
    
    await next()
  }
}

module.exports = FindBarang

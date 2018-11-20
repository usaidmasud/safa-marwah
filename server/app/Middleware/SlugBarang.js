'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Barang = use('App/Models/Barang')
const { sanitizor } = use('Validator')

class SlugBarang {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    // call next to advance the request
    const input = request.all()
    const slug = sanitizor.slug(input.nama_barang)
    
    const cek = await Barang.findBy('slug',slug)
    if (cek) {
      return response.status(409).json({
        status : 'duplicate',
        message : 'nama barang sama, silahkan ganti dengan nama barang yang lain'
      })
    }

    request.slug = slug
    await next()
  }
}

module.exports = SlugBarang

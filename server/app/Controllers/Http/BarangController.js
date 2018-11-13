'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with barangs
 */

const Barang = use('App/Models/Barang')
const AuthorizationService = use('App/Services/AuthorizationService')
const { sanitizor } = use('Validator')

class BarangController {
  async index ({ auth }) {
    const user = await auth.getUser()
    return await user.barangs().fetch()
  }

  async store ({ request, auth }) {
    const user = await auth.getUser()
    const input = request.all()
    // upload gambar

    const barang = new Barang()
    barang.fill({
      nama_barang : input.nama_barang,
      slug : sanitizor.slug('input.nama_barang'),
      qty : input.qty,
      harga_beli : input.harga_beli,
      diskon : input.diskon,
      harga_jual : input.harga_jual,
      satuan_id : input.satuan_id,
      barang_id : input.barang_id,
      thumbnail : input.thumbnail,
    })
    // await user.barangs().save(barang)
    return input
  }


  async show ({ request }) {
    
  }

  async update ({ params, request, auth }) {
    const user = await auth.getUser()
    const barang = await Barang.find(params.id)
    AuthorizationService.verifyPermission(barang, user)
    barang.merge(request.only('nama_barang'))
    await barang.save()

    return barang
  }

  async destroy ({ params, auth }) {
    const user = await auth.getUser()
    const barang = await Barang.find(params.id)
    AuthorizationService.verifyPermission(barang, user)
    await barang.delete()
    return barang
  }
}

module.exports = BarangController

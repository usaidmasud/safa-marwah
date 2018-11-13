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
const Helpers = use('Helpers')

class BarangController {
  
  async index ({ auth }) {
    const user = await auth.getUser()
    return await user.barangs().fetch()
  }

  async store ({ request, auth }) {
    const user = await auth.getUser()
    const input = request.all()
    const slug = sanitizor.slug(input.nama_barang)

    const cek = await Barang.findBy('slug',slug)
    if (cek) {
      return {
        'message' : input.nama_barang + ' sudah di pakai, silahkan diganti dengan nama yang lain'
      }
    }

    const barang = new Barang()
    barang.nama_barang = input.nama_barang
    barang.slug = slug
    barang.qty = input.qty
    barang.harga_beli = input.harga_beli
    barang.diskon = input.diskon
    barang.harga_jual = input.harga_jual
    barang.satuan_id = input.satuan_id
    barang.kategori_id = input.kategori_id
    
    // upload gambar
    const myPicture = request.file('thumbnail')
    barang.thumbnail = new Date().getTime()+'.'+myPicture.subtype
    await user.barangs().save(barang)

    await myPicture.move(Helpers.publicPath('uploads'), {
      name : barang.thumbnail
    })

    return barang
  }

  async show ({ auth, params }) {
    
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

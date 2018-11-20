'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')
const Helpers = use('Helpers')
const Barang = use('App/Models/Barang')

class BarangController {
  
  async index ({ response, auth }) {
    const user = await auth.getUser()
    const barang =  await user.barangs()
      .with('satuan')
      .with('kategori')
      .with('user')
      .fetch()

    return response.status(200).json({
      message : 'list barang',
      data : barang
    })
  }

  async store ({response, request, auth }) {
    const user = await auth.getUser()
    const input = request.all()
    

    const barang = new Barang()
    barang.nama_barang = input.nama_barang
    barang.slug = request.slug
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

    return response.status(202).json({
      message : 'data berhasil disimpan',
      data  : barang
    })
  }

  async show ({ request, response}) {
    const barang = request.barang
    
    response.status(200).json({
      message : 'success',
      data : barang
    })
  }

  async update ({ request, auth, response }) {
    const user = await auth.getUser()
    const barang = request.barang
    const input = request.all()
    AuthorizationService.verifyPermission(barang, user)
    // upload gambar
    const myPicture = request.file('thumbnail')
    if (myPicture) {
      barang.thumbnail = new Date().getTime()+'.'+myPicture.subtype
      await myPicture.move(Helpers.publicPath('uploads'), {
        name : barang.thumbnail
      })
    }
  
    barang.nama_barang = input.nama_barang
    barang.slug = request.slug
    barang.qty = input.qty
    barang.harga_beli = input.harga_beli
    barang.diskon = input.diskon
    barang.harga_jual = input.harga_jual
    barang.satuan_id = input.satuan_id
    barang.kategori_id = input.kategori_id

    await user.barangs().save(barang)

    return response.status(202).json({
      message : 'data berhasil diupdate',
      data  : barang
    })

  }

  async destroy ({ request, response, auth }) {
    const user = await auth.getUser()
    const barang = request.barang
    AuthorizationService.verifyPermission(barang, user)
    await barang.delete()
    response.status(200).json({
      message : 'data berhasil dihapus',
      data : barang
    })
  }
}

module.exports = BarangController

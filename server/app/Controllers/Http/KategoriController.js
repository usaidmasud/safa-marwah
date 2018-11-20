'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with kategoris
 */

const Kategori = use('App/Models/Kategori')
const AuthorizationService = use('App/Services/AuthorizationService')

class KategoriController {
  
  async index ({ auth, response }) {
    const user = await auth.getUser()
    const kategori = await user.kategoris().fetch()
    return response.status(200).json({
      message : 'success',
      data : kategori
    })
  }

  async store ({ request, auth }) {
    const user = await auth.getUser()
    const {nama_kategori} = request.only('nama_kategori')
    const kategori = new Kategori()
    kategori.fill({
      nama_kategori
    })
    await user.kategoris().save(kategori)
    return kategori
  }


  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, auth }) {
    const user = await auth.getUser()
    const kategori = await Kategori.find(params.id)
    AuthorizationService.verifyPermission(kategori, user)
    kategori.merge(request.only('nama_kategori'))
    await kategori.save()

    return kategori
  }

  async destroy ({ params, auth }) {
    const user = await auth.getUser()
    const kategori = await Kategori.find(params.id)
    AuthorizationService.verifyPermission(kategori, user)
    await kategori.delete()
    return kategori
  }
  
}

module.exports = KategoriController

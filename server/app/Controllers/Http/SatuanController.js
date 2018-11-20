'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with satuans
 */
const AuthorizationService = use('App/Services/AuthorizationService')

const Satuan = use('App/Models/Satuan')

class SatuanController {
  /**
   * Show a list of all satuans.
   * GET satuans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, response }) {
    const user = await auth.getUser()
    const satuan = await user.satuans().fetch()
    return response.status(200).json({
      status : 200,
      message : 'success',
      data : satuan
    })
  }

  async store ({ request, auth }) {
    const user = await auth.getUser()
    const {nama_satuan} = request.all()
    const satuan = new Satuan()
    satuan.fill({
      nama_satuan
    })

    await user.satuans().save(satuan)

    return satuan
  }

  async show ({request, response }) {
    const satuan = request.satuan
    
    return response.status(200).json({
      status : 200,
      data : satuan
    })
  }

  async update ({ params, request, auth, response }) {
    const user = await auth.getUser()
    const satuan = await Satuan.find(params.id)
    AuthorizationService.verifyPermission(satuan, user)
    satuan.merge(request.only('nama_satuan'))

    await satuan.save()
    return response.status(200).json({
      status : 200,
      data : satuan
    })
    
  }

  async destroy ({ request, auth, response }) {
    const user = await auth.getUser()
    const satuan = request.satuan
    AuthorizationService.verifyPermission(satuan, user)

    await satuan.delete()
    return response.status(200).json({
      status : 200,
      message : 'Data berhasil dihapus',
      data : satuan
    })
  }
}

module.exports = SatuanController

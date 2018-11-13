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
  async index ({ auth }) {
    const user = await auth.getUser()
    return await user.satuans().fetch()
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

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, auth }) {
    const user = await auth.getUser()
    const satuan = await Satuan.find(params.id)
    AuthorizationService.verifyPermission(satuan, user)
    satuan.merge(request.only('nama_satuan'))
    await satuan.save()
    return satuan
  }

  async destroy ({ params, auth }) {
    const user = await auth.getUser()
    const satuan = await Satuan.find(params.id)
    AuthorizationService.verifyPermission(satuan, user)

    await satuan.delete()
    return satuan
  }
}

module.exports = SatuanController

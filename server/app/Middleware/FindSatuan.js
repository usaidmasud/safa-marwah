'use strict'

const Satuan = use('App/Models/Satuan')

class FindSatuan {
 
  async handle ({ request, response, params:{id} }, next) {
    // call next to advance the request
    const satuan = await Satuan.find(id)
    
    if (!satuan) {
      return response.status(404).json({
        message : 'not found',
        id
      })
    }

    request.satuan = satuan
    
    
    await next()
  }
}

module.exports = FindSatuan

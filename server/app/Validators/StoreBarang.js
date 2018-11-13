'use strict'

class StoreBarang {
  get rules () {
    return {
      nama_barang : 'required',
      qty : 'required',
      harga_beli : 'required',
      diskon : 'required',
      harga_jual : 'required',
      satuan_id : 'required',
      kategori_id : 'required',
      // thumbnail : 'file|file_ext:png,jpg,jpeg|file_size:2mb',
    }
  }

  get messages () {
    return {
      'required' : 'Field {{ field }} kosong',
      'unique' : 'Field {{ field }} tidak boleh sama',
    }
  }

  async fails(errorMessages){
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StoreBarang

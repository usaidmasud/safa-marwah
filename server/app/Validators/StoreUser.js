'use strict'

class StoreUser {
  get rules () {
    return {
      email : 'required|unique:users,email',
      password : 'required'
    }
  }

  get message() {
    return {
      'required' : 'Field {{ field }} kosong',
      'unique' : 'Field {{ field }} tidak boleh sama',
    }
  }

  async fails(errorMessages){
    return this.ctx.response.send(errorMessages)
    
  }
}

module.exports = StoreUser

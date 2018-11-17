'use strict'

const User = use('App/Models/User')

class UserController {
    async index(){
        const user = await User.all()
        return user
    }

    async register({request, response}) {
        const {password, email, role} = request.all()
        const user = await User.create({
            email,
            username : email,
            password,
            role
        })
        return response.json({
            status : 'success',
            message : 'Data user berhasil disimpan'

        })
    }

    async login({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return token
    }

}

module.exports = UserController

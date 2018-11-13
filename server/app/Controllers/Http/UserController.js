'use strict'

const User = use('App/Models/User')

class UserController {
    async index(){
        const user = await User.all()
        return user
    }

    async register({request}) {
        const {password, email, role} = request.all()
        const user = await User.create({
            email,
            username : email,
            password,
            role
        })
        return user
    }

    async login({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return token

    }
}

module.exports = UserController

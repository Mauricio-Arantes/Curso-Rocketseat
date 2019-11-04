'use strict'
const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({request, response}){
    try{
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
  
      await user.save()

      await Mail.send(
        ['emails.forgot_password'], 
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}` 
        },
        message => {
          message
          .to(user.email)
          .from('noob-crispim@hotmail.com', 'Mauricio')
          .subject('Recuperação de senha')
       }
     )

    } catch (err) {
      return response
      .status(err.status)
      .send({error: {message: 'Nao deu'}})
    }
  }
  async update ({request, response}){
    try{
      const {token, password} = request.all()

      const user = await User.findByOrFail('token', token)

      console.log('Parada1')
      const tokenExpired = moment()
      console.log(tokenExpired)
      console.log(moment())
       .subtract('2', 'days')
       .isAfter(user.token_created_at)

       console.log('Parada2')

       if (tokenExpired) {
        console.log('Parada3')
         return response
          .status(401)
          .send({error: {message: 'O problemas ta no token (expirado)'}})
       }
       console.log('Parada4')
       user.token = null
       user.token_created_at = null
       user.password = password

       console.log('Parada5')

       await user.save

    } catch (err) {
      return response
        .status(err.status)
        .send({error: {message: 'Token errado'}})
    }
  }
}

module.exports = ForgotPasswordController

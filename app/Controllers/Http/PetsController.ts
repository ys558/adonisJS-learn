// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PetsController {
  public async index() {
    return 'GET pets'
  }

  public async store() {
    return 'POST pets'
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Pet.all()
  }

  public async store({ request, response }: HttpContextContract) {
    response.status(201)
    const body = request.body() // TODO: 鉴权
    const pet = await Pet.create(body) // 创建实例并存储在一个实例中, 单例的应用
    response.status(201)
    return pet
  }

  public async show({params}: HttpContextContract) {
    return Pet.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const pet = await Pet.findOrFail(params.id)
    pet.name = body.name
    return pet.save()
  }

  public async destroy({params, response}: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    // response.status(204)
    await pet.delete()
    return pet
  }
}

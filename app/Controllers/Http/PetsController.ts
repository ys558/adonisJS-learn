import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Pet.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const newPetSchema = schema.create({
      // 用shema.string()为其鉴权, 括号里放其规则
      name: schema.string({ trim: true })
    })
    const payload = await request.validate({ schema: newPetSchema })
    
    const pet = await Pet.create(payload) // 创建实例并存储在一个实例中, 单例的应用
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

## [AdonisJS基础](https://docs.adonisjs.com/guides/installation)

一款专注于web的node框架，下面介绍其安装：

```bash
mkdir simple-mall && cd simple-mall
yarn create adonis-ts-app .
```

安装过程中可选api, web和slim三种模式，我们选择api模式

```bash
node ace serve --watch
# or
yarn dev
```

vscode 调试插件：
- `Thunder Client` ，类似postman，但比postman简单快捷
- `Adonis JS Goto Controller`，能在routes层面，用ctrl + 鼠标左键，快速进入Controller层面

`start\routes.ts` 里控制路由，可看到 `hello world`, 以下路由中的回调参数，可以解构出 params，request，response
```js
Route.get('/posts/:postId', async ({ params, request, response }) => {
  response.status(400)
  return 'hehe' + params.postId
})
```

## controller

用命令行生成对应的controller:
```bash
node ace make:controller Pet
```

`start\routes.ts`
```js
Route.get('/pets', 'PetsController.index')
Route.post('/pets', 'PetsController.store')
Route.put('/pets', 'PetsController.store')
Route.delete('/pets', 'PetsController.store')
```

执行，可看到路由对应的controller
```bash
> node ace list:routes
┌───────────┬────────────┬──────────────────────┬────────────┬───────────────────┐
│ Method    │ Route      │ Handler              │ Middleware │ Name              │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ HEAD, GET │ /uploads/* │ Closure              │            │ drive.local.serve │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ HEAD, GET │ /pets      │ PetsController.index │            │                   │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ POST      │ /pets      │ PetsController.store │            │                   │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ PUT       │ /pets      │ PetsController.store │            │                   │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ DELETE    │ /pets      │ PetsController.store │            │                   │
└───────────┴────────────┴──────────────────────┴────────────┴───────────────────┘
```

以上路由所有路由可简写为：
```js
Route.resource('/pets', 'PetsController').apiOnly()
```
运行如下，可以看到配置好的对应路由如下：
```bash
> node ace list:routes
┌────────────┬────────────┬────────────────────────┬────────────┬───────────────────┐
│ Method     │ Route      │ Handler                │ Middleware │ Name              │
├────────────┼────────────┼────────────────────────┼────────────┼───────────────────┤
│ HEAD, GET  │ /uploads/* │ Closure                │            │ drive.local.serve │
├────────────┼────────────┼────────────────────────┼────────────┼───────────────────┤
│ HEAD, GET  │ /pets      │ PetsController.index   │            │ pets.index        │
├────────────┼────────────┼────────────────────────┼────────────┼───────────────────┤
│ POST       │ /pets      │ PetsController.store   │            │ pets.store        │
├────────────┼────────────┼────────────────────────┼────────────┼───────────────────┤
│ HEAD, GET  │ /pets/:id  │ PetsController.show    │            │ pets.show         │
├────────────┼────────────┼────────────────────────┼────────────┼───────────────────┤
│ PUT, PATCH │ /pets/:id  │ PetsController.update  │            │ pets.update       │
├────────────┼────────────┼────────────────────────┼────────────┼───────────────────┤
│ DELETE     │ /pets/:id  │ PetsController.destroy │            │ pets.destroy      │
└────────────┴────────────┴────────────────────────┴────────────┴───────────────────┘
```

还可以更复杂的结构生成对应路由，如：
```js
Route.resource('owners', 'OwnersController').apiOnly()
Route.resource('owners.pets', 'PetsController').apiOnly()
```

```bash
> node ace list:routes
┌────────────┬────────────────────────────┬──────────────────────────┬────────────┬─────────────────────┐
│ Method     │ Route                      │ Handler                  │ Middleware │ Name                │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ HEAD, GET  │ /uploads/*                 │ Closure                  │            │ drive.local.serve   │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ HEAD, GET  │ /owners                    │ OwnersController.index   │            │ owners.index        │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ POST       │ /owners                    │ OwnersController.store   │            │ owners.store        │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ HEAD, GET  │ /owners/:id                │ OwnersController.show    │            │ owners.show         │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ PUT, PATCH │ /owners/:id                │ OwnersController.update  │            │ owners.update       │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ DELETE     │ /owners/:id                │ OwnersController.destroy │            │ owners.destroy      │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ HEAD, GET  │ /owners/:owner_id/pets     │ PetsController.index     │            │ owners.pets.index   │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ POST       │ /owners/:owner_id/pets     │ PetsController.store     │            │ owners.pets.store   │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ HEAD, GET  │ /owners/:owner_id/pets/:id │ PetsController.show      │            │ owners.pets.show    │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ PUT, PATCH │ /owners/:owner_id/pets/:id │ PetsController.update    │            │ owners.pets.update  │
├────────────┼────────────────────────────┼──────────────────────────┼────────────┼─────────────────────┤
│ DELETE     │ /owners/:owner_id/pets/:id │ PetsController.destroy   │            │ owners.pets.destroy │
└────────────┴────────────────────────────┴──────────────────────────┴────────────┴─────────────────────┘
```


## 连接数据库及生成数据库脚本文件

安装专门连接数据库的库：`@adonisjs/lucid`
```bash
npm i @adonisjs/lucid
```

运行以下命令，可选常用数据库安装, 一次可选择多个, 这里选择了 sqlite 和 mysql 两个数据库

```bash
> node ace configure @adonisjs/lucid
❯ Select the database driver you want to use …  Press <SPACE> to select
◉ SQLite
◉ MySQL / MariaDB
◯ PostgreSQL
◯ OracleDB
◯ Microsoft SQL Server
```

选择完成后, 会出现如下提示, 如果是 `MYSQL`, `MSSQL`, `PostgreSQL` 或 `OracleDB`, 则需改动 `config/database.ts` 里的数据库连接配置, 复制粘贴过去即可. 

```bash
Open the env.ts file and paste the following code inside the Env.rules object.

    DB_CONNECTION: Env.schema.string(),

## Variables for the MYSQL driver

    MYSQL_HOST: Env.schema.string({ format: 'host' }),
    MYSQL_PORT: Env.schema.number(),
    MYSQL_USER: Env.schema.string(),
    MYSQL_PASSWORD: Env.schema.string.optional(),
    MYSQL_DB_NAME: Env.schema.string(),

    * The MYSQL_HOST should always be present and formatted as a valid host.
    * The MYSQL_PORT should always be present and a valid number.
    * The MYSQL_USER and MYSQL_PASSWORD are required to authenticate with the database server. The password is marked as optional since many local database servers are configured to work without passwords.
    * The MYSQL_DB_NAME is the database name you want to connect with.

## Variables for the PostgreSQL driver

    PG_HOST: Env.schema.string({ format: 'host' }),
    PG_PORT: Env.schema.number(),
    PG_USER: Env.schema.string(),
    PG_PASSWORD: Env.schema.string.optional(),
    PG_DB_NAME: Env.schema.string(),

## Variables for the MSSQL driver

    MSSQL_SERVER: Env.schema.string({ format: 'host' }),
    MSSQL_PORT: Env.schema.number(),
    MSSQL_USER: Env.schema.string(),
    MSSQL_PASSWORD: Env.schema.string.optional(),
    MSSQL_DB_NAME: Env.schema.string(),

## Variables for the OracleDB driver

    ORACLE_HOST: Env.schema.string({ format: 'host' }),
    ORACLE_PORT: Env.schema.number(),
    ORACLE_USER: Env.schema.string(),
    ORACLE_PASSWORD: Env.schema.string.optional(),
    ORACLE_DB_NAME: Env.schema.string(),
CREATE: ace-manifest.json file
```

生成完后多了 `config/database.ts` 文件, 即为连接数据库文件

新建 `tmp/.env` 文件, 
```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=''
DB_CONNECTION=sqlite
```

迁移生成对应controller文件, 执行以下命令: 
```bash
> node ace make:migration pets                                                                           ⏎
CREATE: database/migrations/1637380011782_pets.ts
```

生成的文件如下:
```ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pets extends BaseSchema {
  protected tableName = 'pets'

  // up 用于更新 migration
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
++    table.string('name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  // down 用于回滚 migration
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
```

再根据以上文件生成数据库的脚本文件
```bash
❯ node ace migration:run      
❯ migrated database/migrations/1637380011782_pets
```

生成对应的model
```bash
❯ node ace make:model Pet    
CREATE: app/Models/Pet.ts
```

`app/Models/Pet.ts`
```ts
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

++ @column()
++ public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
```
注意:  
以上添加或删除column后需要重新migration一遍,才能更新数据库, 重新migrations之前, 须删除`tmp/db.sqlite3` 文件, 及完全删除 `database/migrations/` 的文件夹及里面的文件,才能生成新的,否则报错

## 修改返回 `app/Controllers/Http/PetsController.ts` 使其和数据库脚本对应上

```ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// 从model导入Pet实例
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

  public async destroy({params, reponse}: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    // response.status(204)
    await pet.delete()
    return pet
  }
}
```
更改完后直接用 `Thunder Client` 测试一下, 发现会添加成功:

![效果](https://cdn.jsdelivr.net/gh/ys558/my-blog-imgs@0.45/articles/adonisJS学习/01.png)


## 鉴权

返回`PetsController.ts`里, 把之前没完成的鉴权补充完整:

```ts
  public async store({ request, response }: HttpContextContract) {

-- const body = request.body() // TODO: 鉴权

++ const newPetSchema = schema.create({
      // 用shema.string()为其鉴权, 括号里放入其规则
      name: schema.string({ trim: true })
    })
    const payload = await request.validate({ schema: newPetSchema })
    
    const pet = await Pet.create(payload) // 创建实例并存储在一个实例中, 单例的应用
    response.status(201)
    return pet
  }
```

adonisJS鉴权的所有具体参数可以参考其[文档](https://docs.adonisjs.com/guides/validator/introduction)

![如果插入格式不符合的数据, 则会报422错误](https://cdn.jsdelivr.net/gh/ys558/my-blog-imgs@0.45/articles/adonisJS学习/02.png)
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
$ node ace list:routes
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
$ node ace list:routes
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
$ node ace list:routes
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


## 连接数据库

安装专门连接数据库的库：`@adonisjs/lucid`
```bash
npm i @adonisjs/lucid
```

运行以下命令，可选常用数据库安装, 一次可选择多个, 这里选择了 sqlite 和 mysql 两个数据库

```bash
$ node ace configure @adonisjs/lucid
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
$ node ace make:migration pets
CREATE: database/migrations/1637378552380_pets.ts
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

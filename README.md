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

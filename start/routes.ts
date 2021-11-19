/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/posts/:postId', async ({ params, request, response }) => {
//   response.status(400)
//   request.qs()
//   return 'hehe' + params.postId
// })

Route.get('/pets', 'PetsController.index')
Route.post('/pets', 'PetsController.store')
Route.put('/pets', 'PetsController.store')
Route.delete('/pets', 'PetsController.store')



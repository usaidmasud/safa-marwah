'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('upload', async({request})=>{
  
})

Route.group(() => {
  Route.post('register','UserController.register')
  Route.post('login','UserController.login')
  Route.get('users','UserController.index')
}).prefix('api')

Route.group(() => {
  // satuan
  Route.post('satuans','SatuanController.store')
  Route.get('satuans','SatuanController.index')
  Route.delete('satuans/:id','SatuanController.destroy')
  Route.patch('satuans/:id','SatuanController.update')
  // kategori
  Route.post('kategoris','KategoriController.store')
  Route.get('kategoris','KategoriController.index')
  Route.delete('kategoris/:id','KategoriController.destroy')
  Route.patch('kategoris/:id','KategoriController.update')
  // kategori
  Route.post('barangs','BarangController.store').validator('StoreBarang')
  Route.get('barangs','BarangController.index')
  Route.delete('barangs/:id','BarangController.destroy')
  Route.patch('barangs/:id','BarangController.update')
}).prefix('api').middleware('auth')

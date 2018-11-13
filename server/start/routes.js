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
  const profilePic = request.file('profile_pic', {
    types: ['image'],
    size: '2mb'
  })

  await profilePic.move(Helpers.tmpPath('uploads'), {
    name: `${new Date().getTime()}.${file.subtype}`,
    overwrite: true
  })

  if (!profilePic.moved()) {
    return profilePic.error()
  }
  return 'File moved'
})

Route.group(() => {
  Route.post('register','UserController.register')
  Route.post('login','UserController.login')
  Route.get('users','UserController.index')
  
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
  Route.post('barangs','BarangController.store')
  Route.get('barangs','BarangController.index')
  Route.delete('barangs/:id','BarangController.destroy')
  Route.patch('barangs/:id','BarangController.update')
}).prefix('api')

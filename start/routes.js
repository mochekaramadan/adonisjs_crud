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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//index
Route.on('/').render('welcome')

// Controller Post
Route.group(() => {
    Route.get('', 'PostController.index')
    Route.get(':id/edit', 'PostController.edit')
    Route.get('add', 'PostController.add')
    Route.get(':id/delete', 'PostController.delete')
    Route.post('', 'PostController.store')
    Route.put(':id', 'PostController.update')
}).prefix('post')

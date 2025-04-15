/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const LogoutController = () => import('#controllers/auth/logout_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProfilesController = () => import('#controllers/profiles_controller')
const BooksController = () => import('#controllers/books_controller')

router.on('/').render('pages/home')
router
  .group(() => {
    router.resource('search', BooksController).only(['index', 'store'])
    router.resource('profiles', ProfilesController).only(['index', 'update'])
  })
  .use(middleware.auth())

router.resource('profiles', ProfilesController).only(['show'])

router
  .group(() => {
    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post('/register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())

    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

    router.post('/logout', [LogoutController, 'handle']).as('logout')
  })
  .as('auth')

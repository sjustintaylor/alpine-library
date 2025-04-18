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
import { RoutePath } from '#config/routes'
const ProfilesController = () => import('#controllers/profiles_controller')
const BooksController = () => import('#controllers/books_controller')

router.on('/').render('pages/home').use(middleware.guest())
router
  .group(() => {
    router.resource('books', BooksController).only(['index', 'store'])
    router.resource('profiles', ProfilesController).only(['index', 'update'])
  })
  .use(middleware.auth())

router.resource('profiles', ProfilesController).only(['show'])

router
  .group(() => {
    router
      .get(RoutePath.REGISTER, [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post(RoutePath.REGISTER, [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())

    router.get(RoutePath.LOGIN, [LoginController, 'show']).as('login.show').use(middleware.guest())
    router
      .post(RoutePath.LOGIN, [LoginController, 'store'])
      .as('login.store')
      .use(middleware.guest())

    router.post(RoutePath.LOGOUT, [LogoutController, 'handle']).as('logout')
  })
  .as('auth')

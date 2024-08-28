import express from 'express'
import { UserController } from '../../application/controller/UserController'
import { UserUseCase } from '../../application/UserUseCase'
import { UserRepositoryImpl } from '../../infrastructure/UserRepository'
import UserModel from '../../infrastructure/UserModel'

const router = express.Router()
const userRepo = new UserRepositoryImpl(UserModel)
const userUseCase = new UserUseCase(userRepo)
const userController = new UserController(userUseCase);

router.get('/',userController.signUpPage)
router.get('/login',userController.loginPage)
router.get('/home',userController.homePage)
router.post('/signUpSubmit',userController.signUpSubmit)
router.post('/loginSubmit',userController.loginSubmit)
router.get('/logOut',userController.logOut)

export default router;


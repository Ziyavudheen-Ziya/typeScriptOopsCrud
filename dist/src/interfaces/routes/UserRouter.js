"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../../application/controller/UserController");
const UserUseCase_1 = require("../../application/UserUseCase");
const UserRepository_1 = require("../../infrastructure/UserRepository");
const UserModel_1 = __importDefault(require("../../infrastructure/UserModel"));
const router = express_1.default.Router();
const userRepo = new UserRepository_1.UserRepositoryImpl(UserModel_1.default);
const userUseCase = new UserUseCase_1.UserUseCase(userRepo);
const userController = new UserController_1.UserController(userUseCase);
router.get('/', userController.signUpPage);
router.get('/login', userController.loginPage);
router.get('/home', userController.homePage);
router.post('/signUpSubmit', userController.signUpSubmit);
router.post('/loginSubmit', userController.loginSubmit);
router.get('/logOut', userController.logOut);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const userEntity_1 = require("../domain/userEntity");
const helper_1 = require("./service/helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    signUpPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.isLogin) {
                res.redirect('/home');
            }
            else {
                res.render("userPages/signUpPage");
            }
        });
    }
    loginPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.isLogin) {
                res.redirect('/home');
            }
            else {
                res.render("userPages/loginPage");
            }
        });
    }
    homePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.isLogin) {
                res.render("userPages/homePage");
            }
            else {
                res.redirect('/login');
            }
        });
    }
    signUpSubmit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phone } = req.body;
            const exsistingUser = yield this.userRepository.findByEmail(email);
            if (exsistingUser) {
                return res.redirect("/login");
            }
            const hashPassword = yield helper_1.Helper.hashPassword(password);
            const user = new userEntity_1.User(name, email, phone, hashPassword);
            yield this.userRepository.save(user);
            res.redirect("/home");
        });
    }
    loginSubmit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.getPassword());
                if (isPasswordCorrect) {
                    console.log("It's commi checkin gthe session ");
                    req.session.isLogin = true;
                    res.redirect("/home");
                }
                else {
                    res.redirect("/login");
                }
            }
            else {
                res.redirect("/login");
            }
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.isLogin = false;
            res.redirect("/login");
        });
    }
}
exports.UserUseCase = UserUseCase;

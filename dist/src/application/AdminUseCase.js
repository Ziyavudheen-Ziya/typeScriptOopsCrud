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
Object.defineProperty(exports, "__esModule", { value: true });
const userEntity_1 = require("../domain/userEntity");
const helper_1 = require("./service/helper");
class AdminUseCase {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    getAdminPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.adminLoginSession) {
                res.redirect('/adminDashboard');
            }
            else {
                res.render("adminPages/adminLogin");
            }
        });
    }
    getAdminDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.adminLoginSession) {
                const users = yield this.adminRepository.getUsers();
                res.render("adminPages/dashboard", { users: users || [] });
                console.log("entring");
            }
            else {
                console.log("entring this page");
                res.redirect('/admin');
            }
        });
    }
    getCreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("adminPages/createUser");
        });
    }
    postAdminDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let adminName = process.env.ADMINMAIL;
            let password = process.env.ADMINPASSWORD;
            if (adminName === req.body.name && password === req.body.password) {
                req.session.adminLoginSession = true;
                res.redirect("/adminDashboard");
            }
            else {
                res.redirect("/admin");
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const exsistEmail = req.body.email;
            const checkingEmail = yield this.adminRepository.findEmail(exsistEmail);
            const { name, email, phone, password } = req.body;
            if (checkingEmail) {
                res.redirect("/adminCreateUser");
            }
            else {
                const hashPassword = yield helper_1.Helper.hashPassword(password);
                const user = new userEntity_1.User(name, email, phone, hashPassword);
                yield this.adminRepository.save(user);
                res.redirect("/adminDashboard");
                console.log("User saved");
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone } = req.body;
            const { id } = req.params;
            yield this.adminRepository.editUser(id, name, email, phone);
            res.redirect('/adminDashboard');
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.adminRepository.deleteUser(id);
            res.redirect('/adminDashboard');
        });
    }
    adminSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.body;
            const users = yield this.adminRepository.searchUser(search);
            res.render('adminPages/dashboard', { users });
        });
    }
    adminLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.adminLoginSession = false;
            res.redirect("/admin");
        });
    }
}
exports.default = AdminUseCase;

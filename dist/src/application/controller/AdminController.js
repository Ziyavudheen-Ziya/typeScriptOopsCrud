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
class AdminController {
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
        this.getAdminPage = this.getAdminPage.bind(this);
        this.getAdminDashboard = this.getAdminDashboard.bind(this);
        this.getCreateUser = this.getCreateUser.bind(this);
        this.postAdminDashboard = this.postAdminDashboard.bind(this);
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.adminSearch = this.adminSearch.bind(this);
        this.adminLogout = this.adminLogout.bind(this);
    }
    getAdminPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.getAdminPage(req, res);
        });
    }
    getAdminDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.getAdminDashboard(req, res);
        });
    }
    getCreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.getCreateUser(req, res);
        });
    }
    postAdminDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.postAdminDashboard(req, res);
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.createUser(req, res);
        });
    }
    adminLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.adminLogout(req, res);
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.editUser(req, res);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.deleteUser(req, res);
        });
    }
    adminSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.adminSearch(req, res);
        });
    }
}
exports.default = AdminController;

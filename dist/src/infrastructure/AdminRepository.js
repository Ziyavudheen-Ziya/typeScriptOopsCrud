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
class AdminRepository {
    constructor(userCollection) {
        this.userCollection = userCollection;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userCollection.find();
        });
    }
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userCollection.findOne({ email });
            return user
                ? new userEntity_1.User(user.name, user.email, user.phone, user.password)
                : null;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userCollection.create(user);
        });
    }
    editUser(id, name, email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userCollection.findByIdAndUpdate(id, {
                $set: {
                    name,
                    email,
                    phone,
                },
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userCollection.deleteOne({ _id: id });
        });
    }
    searchUser(search) {
        return __awaiter(this, void 0, void 0, function* () {
            const trimmedSearch = search.trim();
            return yield this.userCollection.find({
                name: { $regex: trimmedSearch, $options: 'i' }
            });
        });
    }
}
exports.default = AdminRepository;

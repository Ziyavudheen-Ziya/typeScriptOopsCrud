"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SessionService_1 = __importDefault(require("../../application/service/SessionService"));
const isUser = (req, res, next) => {
    const session = SessionService_1.default.getInstance().getSession();
    if (!session || !session.loggedIn) {
        return res.redirect("/login");
    }
    next();
};
exports.default = isUser;

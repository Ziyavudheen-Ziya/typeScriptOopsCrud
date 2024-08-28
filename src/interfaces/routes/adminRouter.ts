import express from "express";
import AdminController from "../../application/controller/AdminController";
import AdminUseCase from "../../application/AdminUseCase";
import AdminRepository from "../../infrastructure/AdminRepository";
import UserModel from "../../infrastructure/UserModel";

import adminMiddleware from "../../infrastructure/middleware/adminMiddleware";

const router = express.Router();
const adminRepo = new AdminRepository(UserModel);
const adinUsercase = new AdminUseCase(adminRepo);
const adminController = new AdminController(adinUsercase);
router.get("/admin", adminController.getAdminPage);
router.get("/adminDashboard", adminController.getAdminDashboard);
router.post("/postAdminDashboard",adminController.postAdminDashboard);
router.get("/adminCreateUser", adminController.getCreateUser);
router.post('/addUser',adminController.addUser)
router.post('/editUser/:id',adminController.editUser)
router.get('/deleteUser/:id',adminController.deleteUser)
router.post('/searchUser',adminController.adminSearch)
router.get('/adminLogout',adminController.adminLogout)

export default router;

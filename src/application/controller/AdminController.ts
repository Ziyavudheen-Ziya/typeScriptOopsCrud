import { Request, Response } from "express";
import AdminUseCase from "../AdminUseCase";

interface AdminControllerInterface {
  getAdminPage(req: Request, res: Response): Promise<void>;
  getAdminDashboard(req: Request, res: Response): Promise<void>;
  getCreateUser(req: Request, res: Response): Promise<void>;
  postAdminDashboard(req: Request, res: Response): Promise<void>;
  adminLogout(req: Request, res: Response): Promise<void>;
  addUser(req: Request, res: Response): Promise<void>;
  editUser(req:Request,res:Response):Promise<void>;
  adminSearch(req:Request,res:Response):Promise<void>;
}

class AdminController implements AdminControllerInterface {
  private adminUseCase: AdminUseCase;

  constructor(adminUseCase: AdminUseCase) {
    this.adminUseCase = adminUseCase;
    this.getAdminPage = this.getAdminPage.bind(this);
    this.getAdminDashboard = this.getAdminDashboard.bind(this);
    this.getCreateUser = this.getCreateUser.bind(this);
    this.postAdminDashboard = this.postAdminDashboard.bind(this);
    this.addUser = this.addUser.bind(this);
     this.editUser = this.editUser.bind(this)
     this.deleteUser = this.deleteUser.bind(this)
     this.adminSearch = this.adminSearch.bind(this)
    this.adminLogout = this.adminLogout.bind(this);
  }

  async getAdminPage(req: Request, res: Response): Promise<void> {
    await this.adminUseCase.getAdminPage(req, res);
  }

  async getAdminDashboard(req: Request, res: Response): Promise<void> {
    await this.adminUseCase.getAdminDashboard(req, res);
  }

  async getCreateUser(req: Request, res: Response): Promise<void> {
    await this.adminUseCase.getCreateUser(req, res);
  }

  async postAdminDashboard(req: Request, res: Response): Promise<void> {
    await this.adminUseCase.postAdminDashboard(req, res);
  }

  async addUser(req: Request, res: Response): Promise<void> {
    await this.adminUseCase.createUser(req, res);
  }

  async adminLogout(req: Request, res: Response): Promise<void> {
    await this.adminUseCase.adminLogout(req, res);
  }

  async editUser(req:Request,res:Response):Promise<void>{
      await this.adminUseCase.editUser(req,res)
  }

  async deleteUser(req:Request,res:Response):Promise<void>{

      await this.adminUseCase.deleteUser(req,res)
  }

  async adminSearch(req:Request,res:Response):Promise<void>{

      await this.adminUseCase.adminSearch(req,res)
  }
}

export default AdminController;

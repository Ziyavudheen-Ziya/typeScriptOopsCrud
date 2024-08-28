import { User } from "../domain/userEntity";
import AdminRepository from "../infrastructure/AdminRepository";
import { Helper } from "./service/helper";
import SessionService from "./service/SessionService";
class AdminUseCase {
  private adminRepository: AdminRepository;

  

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async getAdminPage(req: any, res: any): Promise<void> {
     if(req.session.adminLoginSession){

        res.redirect('/adminDashboard')
     }else{
      res.render("adminPages/adminLogin");

     }
      

    
  }

  async getAdminDashboard(req: any, res: any): Promise<void> {

  
     
     if(req.session.adminLoginSession ){
      const users = await this.adminRepository.getUsers();
      res.render("adminPages/dashboard", { users: users || [] });
      console.log("entring");
      
     }else{
       console.log("entring this page");
       
       res.redirect('/admin')
     }
   
      
      
  }

  async getCreateUser(req: any, res: any): Promise<void> {
    res.render("adminPages/createUser");
  }

  async postAdminDashboard(req: any, res: any): Promise<void> {
    let adminName = process.env.ADMINMAIL
    let password = process.env.ADMINPASSWORD;
    if (adminName === req.body.name && password === req.body.password) {
      req.session.adminLoginSession = true
      res.redirect("/adminDashboard");
    } else {
      res.redirect("/admin");
    }
  }


  async createUser(req: any, res: any): Promise<void> {
    const exsistEmail = req.body.email;

    const checkingEmail = await this.adminRepository.findEmail(exsistEmail);

    const { name, email, phone, password } = req.body;

    if (checkingEmail) {
      res.redirect("/adminCreateUser");
    } else {
      const hashPassword = await Helper.hashPassword(password);

      const user = new User(name, email, phone, hashPassword);
      await this.adminRepository.save(user);

      res.redirect("/adminDashboard");
      console.log("User saved");
    }
  }


  async editUser(req: any, res: any): Promise<void> {
    const { name, email, phone } = req.body;
    const  {id } = req.params;


    await this.adminRepository.editUser(id,name,email,phone);
    res.redirect('/adminDashboard');
}

  async deleteUser(req:any,res:any):Promise<void>{

        const {id} = req.params

        await this.adminRepository.deleteUser(id)
        res.redirect('/adminDashboard')
  }
    async adminSearch(req:any,res:any):Promise<void>{

         const {search} = req.body
         const users = await this.adminRepository.searchUser(search)
         res.render('adminPages/dashboard',{users})
    }

    
  async adminLogout(req: any, res: any): Promise<void> {
     req.session.adminLoginSession = false
      res.redirect("/admin");
  }
}

export default AdminUseCase;

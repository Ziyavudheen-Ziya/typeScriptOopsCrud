import { User } from "../domain/userEntity";
import { UserRepository } from "../infrastructure/UserRepository";
import { Helper } from "./service/helper";
import bcrypt from "bcrypt";
export class UserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async signUpPage(req: any, res: any) {
    if (req.session.isLogin) {
      res.redirect("/home");
    } else {
      res.render("userPages/signUpPage");
    }
  }

  public async loginPage(req: any, res: any) {
    if (req.session.isLogin) {
      res.redirect("/home");
    } else {
      res.render("userPages/loginPage");
    }
  }

  public async homePage(req: any, res: any) {
    if (req.session.isLogin) {
      res.render("userPages/homePage");
    } else {
      res.redirect("/login");
    }
  }

  public async signUpSubmit(req: any, res: any) {
    const { name, email, password, phone } = req.body;

    const exsistingUser = await this.userRepository.findByEmail(email);

    if (exsistingUser) {
      return res.redirect("/login");
    }

    const hashPassword = await Helper.hashPassword(password);

    const user = new User(name, email, phone, hashPassword);
    await this.userRepository.save(user);

    res.redirect("/home");
  }

  public async loginSubmit(req: any, res: any) {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.getPassword()
      );

      if (isPasswordCorrect) {
        console.log("It's commi checkin gthe session ");
        req.session.isLogin = true;
        res.redirect("/home");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  }

  public async logOut(req: any, res: any) {
    req.session.isLogin = false;
    res.redirect("/login");
  }
}

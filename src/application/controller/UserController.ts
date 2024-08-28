import { UserUseCase } from "../UserUseCase";

interface IUserController {
  signUpPage(req: any, res: any): Promise<void>;
  loginPage(req: any, res: any): Promise<void>;
  homePage(req: any, res: any): Promise<void>;
  signUpSubmit(req: any, res: any): Promise<void>;
  loginSubmit(req: any, res: any): Promise<void>;
  logOut(req: any, res: any): Promise<void>;
}

export class UserController implements IUserController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;

    this.signUpPage = this.signUpPage.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.homePage = this.homePage.bind(this);
    this.signUpSubmit = this.signUpSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  public async signUpPage(req: any, res: any) {
    await this.userUseCase.signUpPage(req, res);
  }

  public async loginPage(req: any, res: any) {
    await this.userUseCase.loginPage(req, res);
  }

  public async homePage(req: any, res: any) {
    await this.userUseCase.homePage(req, res);
  }

  public async signUpSubmit(req: any, res: any) {
    await this.userUseCase.signUpSubmit(req, res);
  }

  public async loginSubmit(req: any, res: any) {
    await this.userUseCase.loginSubmit(req, res);
  }

  public async logOut(req: any, res: any) {
    await this.userUseCase.logOut(req, res);
  }
}

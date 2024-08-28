import bcrypt from 'bcrypt'

export class Helper{

     public static emailValidate(emai:string):boolean{

         return false
     }

     public static async hashPassword(password:string):Promise<string>{

         const saltRound = 10;
         const salt = await bcrypt.genSalt(saltRound)
         const hashPassword = await bcrypt.hash(password,salt)
         return hashPassword;
     }

     public static async comparePassword(password:string,hash:string):Promise<boolean>{
         return await bcrypt.compare(password,hash)
     }
}
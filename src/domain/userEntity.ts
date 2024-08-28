export class User{

     private name:string;
     private email:string;
     private phone:string;
     private password:string;

     constructor(name:string,email:string,phone:string,password:string){

         this.name = name;
         this.email = email;
         this.phone = phone;
         this.password = password;
     }

     public getName():string{
         return this.name;
     }

     public getEmail():string{
         return this.email
     }

     public getPhone():string{
         return this.phone
     }

     public getPassword():string{
          return this.password;
     }
}
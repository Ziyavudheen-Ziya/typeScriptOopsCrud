import { strict } from "assert";
import { Helper } from "../application/service/helper";
import { User } from "../domain/userEntity";

interface AdminRepositoryInterface {
  getUsers(): Promise<User[]>;
  findEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  editUser(
    id: string,
    name: string,
    email: string,
    phone: string
  ): Promise<void>;

    deleteUser(id:string):Promise<void>;
    searchUser(search:string):Promise<User[]>;
}

class AdminRepository implements AdminRepositoryInterface {
  private userCollection: any;

  constructor(userCollection: any) {
    this.userCollection = userCollection;
  }

  public async getUsers(): Promise<User[]> {
    return await this.userCollection.find();
  }

  public async findEmail(email: string): Promise<User | null> {
    const user = await this.userCollection.findOne({ email });
    return user
      ? new User(user.name, user.email, user.phone, user.password)
      : null;
  }

  public async save(user: User): Promise<void> {
    await this.userCollection.create(user);
  }

  public async editUser(
    id: string,
    name: string,
    email: string,
    phone: string
  ): Promise<void> {
    await this.userCollection.findByIdAndUpdate(id, {
      $set: {
        name,
        email,
        phone,
      },
    });
  }

  public async deleteUser(id:string):Promise<void>{

       await this.userCollection.deleteOne({_id:id})
  }

   public async searchUser(search:string):Promise<User[]>{
       
     const trimmedSearch = search.trim()
     return await this.userCollection.find({
        name:{$regex:trimmedSearch,$options:'i'}
     })
   }
}

export default AdminRepository;

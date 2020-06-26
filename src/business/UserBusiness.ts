import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness{
    private userDatabase = new UserDatabase();
    private idGenerator = new IdGenerator();

    public async signup(name: string, email: string, password: string ) : Promise<string>{
        const id = this.idGenerator.generate();
        await this.userDatabase.signup(name, email, password);
        return id;
    }

    public async createFriendship(user_id: string, friend_id: string): Promise<any> {
        const userFriends = await this.userDatabase.getFriendById(user_id);

        for (let i = 0; i < userFriends.length; i++) {
            if (userFriends[i].friend_id === friend_id) {
              throw new Error("You are already friends");
            }
          }

       return await this.userDatabase.createFriendship( user_id, friend_id);
    }

    public async login(email: string): Promise<any> {
       return  await this.userDatabase.getUserByEmail(email);
    }

    public async deletefriendship(user_id: string, friend_id: string){
        await this.userDatabase.deleteFriendship(user_id, friend_id);
    }

    public async createPost(user_id: string,photo: string,description: string, type: string): Promise<void>{
        await this.userDatabase.createPost( user_id, photo, description, type);
    }
        
};

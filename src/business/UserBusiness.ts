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

    public async friendship(user_id: string, friend_id: string): Promise<any> {
        await this.userDatabase.friendship(user_id, friend_id);
    }

    public async login(email: string): Promise<any> {
        await this.userDatabase.getUserByEmail(email);
    }

    public async deletefriendship(user_id: string, friend_id: string){
        await this.userDatabase.deleteFriendship(user_id, friend_id);
    }

    public async createPost(
        post_id:string,
        user_id: string, 
        photo: string, 
        description: string, 
        date: string, 
        type: string
    ): Promise<void>{
        await this.userDatabase.createPost(post_id, user_id, photo, description, date, type);
    }
        
};

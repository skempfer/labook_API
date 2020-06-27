import { PostDataBase } from "../data/PostDataBase";


export class PostBusiness{
    private postDatabase = new PostDataBase();
    
    public async createPost(user_id: string,photo: string,description: string, type: string): Promise<void>{
        await this.postDatabase.createPost( user_id, photo, description, type);
    };        

    public async getFeed(user_id: string): Promise<any>{
        await this.postDatabase.getFeed(user_id);
    }

    async getFeedByType(postsType: string) {
        await this.postDatabase.getFeedByType(postsType);
    }
        
};

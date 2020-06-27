import { PostDatabase } from "../data/PostDataBase";
import { UserOrderInputDTO } from "../dto/PostDTO";


export class PostBusiness{
    private postDatabase = new PostDatabase();
    
    public async createPost(user_id: string,photo: string,description: string, type: string): Promise<void>{
        await this.postDatabase.createPost( user_id, photo, description, type);
    };        

    public async getFeed(user_id: string): Promise<any>{
        await this.postDatabase.getFeed(user_id);
    }

    async getFeedByTypeAndPage(postsType: string, page: number) {
        const postPerPage = 5;
        let offset = postPerPage * (page - 1);
        return await this.postDatabase.getFeedByTypeAndPage(postsType, postPerPage, offset);
    }
        
};

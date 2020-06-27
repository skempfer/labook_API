import { PostDatabase } from "../data/PostDataBase";


export class PostBusiness{
    private postDatabase = new PostDatabase();
    
    public async createPost( user_id: string,photo: string,description: string, type: string): Promise<void>{
        await this.postDatabase.createPost( user_id, photo, description, type);
    };        

    public async getFeedAndPage( friend_id: string, page: number): Promise<any>{
        const postPerPage = 5;
        let offset = postPerPage * (page - 1);
        await this.postDatabase.getFeedAndPage( friend_id, postPerPage, offset);
    }

    async getFeedByTypeAndPage(friend_id: string, postsType: string, page: number) {
        const postPerPage = 5;
        let offset = postPerPage * (page - 1);
        return await this.postDatabase.getFeedByTypeAndPage( friend_id, postsType, postPerPage, offset);
    }
        
};

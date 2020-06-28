import { PostDataBase } from "../data/PostDataBase";


export class PostBusiness{
    private postDataBase = new PostDataBase();
    
    public async createPost(user_id: string,photo: string,description: string, type: string): Promise<void>{
        await this.postDataBase.createPost( user_id, photo, description, type);
    };        

    public async getFeedAndPage( user_id: string, page: number): Promise<any>{
        const postPerPage = 5;
        let offset = postPerPage * (page - 1);
        await this.postDataBase.getFeedAndPage( user_id, postPerPage, offset);
    };

    async getFeedByTypeAndPage(user_id: string, postsType: string, page: number) {
        const postPerPage = 5;
        let offset = postPerPage * (page - 1);
        return await this.postDataBase.getFeedByTypeAndPage(user_id, postsType, postPerPage, offset);
    };

    public async searchPost(post_id: string) {
      return await this.postDataBase.searchPost(post_id);
    };
    
    public async isLiked(user_id: string, post_id: string) {
      return await this.postDataBase.isLiked(user_id, post_id);
    };
    
    public async likePost(user_id: string, post_id: string) {
      await this.postDataBase.likePost(user_id, post_id);
    };
    
    public async dislikePost(user_id: string, post_id: string) {
      await this.postDataBase.dislikePost(user_id, post_id)
    };

      // public async createComment(
      //   postId: string,
      //   comment: string,
      //   authorId: string
      //   ) {
      //   await this.postDatabase.createComment(
      //     postId, 
      //     comment,
      //     authorId
      //     )
      //   }
        
};

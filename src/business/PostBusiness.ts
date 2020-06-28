import { PostDatabase } from "../data/PostDataBase";


export class PostBusiness{
    private postDatabase = new PostDatabase();
    
    public async createPost(user_id: string,photo: string,description: string, type: string): Promise<void>{
        await this.postDatabase.createPost( user_id, photo, description, type);
    };        

    public async getFeedAndPage( friend_id: string, page: number): Promise<any>{
        const postPerPage = 5;
        let offset = postPerPage * (page - 1);
        await this.postDatabase.getFeedAndPage( friend_id, postPerPage, offset);
    }

    // public async getPosts(id: string) {
    //     return await this.postDatabase.getPosts(id);
    //   }
    

    async getFeedByTypeAndPage(friend_id: string, postsType: string, page: number) {
        const postPerPage = 5;
        let offset = postPerPage * (page - 1);
        return await this.postDatabase.getFeedByTypeAndPage( friend_id, postsType, postPerPage, offset);
    }

    // public async getPostByType(id: string, postType: string) {
    //     return await this.postDatabase.getPostByType(id, postType);
    //   }

    //////////////////////////////////////////////////

    public async searchPost(postId: string) {
        return await this.postDatabase.searchPost(postId)
      }
    
      public async isLiked(postId: string, userId: string) {
        return await this.postDatabase.isLiked(postId, userId)
      }
    
      public async likePost(postId: string, userId: string) {
        await this.postDatabase.likePost(postId, userId)
      }
    
      public async dislikePost(postId: string, userId: string) {
        await this.postDatabase.dislikePost(postId, userId)
    
      }
      public async createComment(
        postId: string,
        comment: string,
        authorId: string
        ) {
        await this.postDatabase.createComment(
          postId, 
          comment,
          authorId
          )
        }
        
};

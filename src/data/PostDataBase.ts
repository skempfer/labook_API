import { BaseDataBase } from "./BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Post } from "../models/Post";
import { UserOrderInputDTO } from "../dto/PostDTO";

export class PostDataBase extends BaseDataBase{

    static TABLE_NAME: string = "Labook_posts";
    private idGenerator = new IdGenerator();

    public async createPost (user_id: string,photo: string,description: string,type: string): Promise<any> {
        const post_id = this.idGenerator.generate();
        const date = new Date();
        try{
            await this.getConnection()
            .insert({
                post_id,
                photo,
                description,
                date,
                type,
                user_id
            })
            .into("Labook_posts");
        }catch (err){
            throw new Error(err.message)
        }
    }

    public async getFeedAndPage (user_id: string, usersPerPage: number, offset: number): Promise<any[]> {
        try{
            const result = await this.getConnection().raw(`
                SELECT Labook_users.name, Labook_posts.date, Labook_posts.description, Labook_posts.photo
                FROM Labook_posts
                JOIN Labook_users
                ON Labook_posts.user_id = Labook_users.user_id
                WHERE Labook_posts.user_id IN (
                SELECT friend_id 
                FROM Labook_friendship
                WHERE user_id = "${user_id}")
                OR Labook_posts.user_id IN (
                SELECT friend_id 
                FROM Labook_friendship
                WHERE friend_id = "${user_id}")
                ORDER BY Labook_posts.date DESC
                LIMIT "${usersPerPage}"
                OFFSET "${offset}";
            `);

            return result[0];
        }catch (err){
            throw new Error(err.message);
        }
    }

    public async getFeedByTypeAndPage (user_id: string, postType: string, usersPerPage: number, offset: number): Promise<any[]>{
        try{
            const result = await this.getConnection().raw(`
            SELECT Labook_users.name, Labook_posts.date, Labook_posts.description, Labook_posts.photo
            FROM Labook_posts
            JOIN Labook_users
            ON (Labook_posts.user_id = Labook_users.user_id
            AND Labbok_posts.type = "${postType}")
            WHERE Labook_posts.user_id IN (
            SELECT friend_id 
            FROM Labook_friendship
            WHERE user_id = "${user_id}")
            OR Labook_posts.user_id IN (
            SELECT friend_id 
            FROM Labook_friendship
            WHERE friend_id = "${user_id}")
            ORDER BY Labook_posts.date DESC
            LIMIT "${usersPerPage}"
            OFFSET "${offset}";
            `);

            const postArray: Post[] = [];

            if(result){
                for (const post of result[0]){
                    const newPost = new post(
                        post.name, 
                        post.date,
                        post.description, 
                        post.photo,
                        post.mapStringToPostType(post.type) 
                    );
                    postArray.push(newPost);
                }
                return postArray;
            }else{
                return postArray;
            }

        }catch (err){
            throw new Error(err.message);
        }
    }

    //////////////////////////////////////////

    public async isLiked(user_id: string, post_id: string): Promise<any> {
        const result = await this.getConnection()
          .select("*")
          .from("Labook_likes")
          .where({ post_id, liked_by: user_id });
    
        return result[0];
      }
    
    public async searchPost(post_id: string): Promise<any> {
        const result = await this.getConnection()
          .select("*")
          .from("Labook_posts")
          .where({ post_id: post_id });
    
        return result[0];
    }
    
    public async likePost(user_id: string, post_id: string): Promise<void> {
        await this.getConnection()
          .insert({
            post_id,
            liked_by: user_id,
           })
          .into("Labook_likes");
    }

    //   public async dislikePost(postId: string, userId: string): Promise<void> {
    //     await this.getConnection()
    //       .del()
    //       .from("LaBookLikes")
    //       .where({postId,
    //         likedBy: userId })
    //   }
    //   public async createComment(
    //     postId: string,
    //     comment: string,
    //     authorId: string
        
    //     ) {
    //       await this.getConnection()
    //        .insert({
    //           postId,
    //           comment,
    //           authorId
    //        })
    //        .into("LaComments")
    //     }

};

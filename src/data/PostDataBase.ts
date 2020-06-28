import { BaseDataBase } from "./BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Post } from "../models/Post";
import { UserOrderInputDTO } from "../dto/PostDTO";

export class PostDatabase extends BaseDataBase{

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
                // FROM Labook_posts
                // JOIN Labook_users
                // ON Labook_posts.user_id = Labook_users.user_id
                // WHERE Labook_posts.user_id IN (
                // SELECT friend_id 
                // FROM Labook_friendship
                // WHERE user_id = "${user_id}")
                // OR Labook_posts.user_id IN (
                // SELECT friend_id 
                // FROM Labook_friendship
                // WHERE friend_id = "${user_id}")
                // ORDER BY Labook_posts.date DESC
                //LIMIT "${usersPerPage}"
                //OFFSET "${offset}";
            `);

            // 
            return result[0];
        }catch (err){
            throw new Error(err.message);
        }
    }

    public async getFeedByTypeAndPage ( friend_id: string, postType: string, usersPerPage: number, offset: number): Promise<any[]>{
        try{
            const result = await this.getConnection().raw(`
                SELECT post_id, photo, description, date, type, friend_id, name
                FROM Labook_posts
                JOIN Labook_friendship
                ON Labook_posts.user_id = Labook_friendship.friend_id
                JOIN Labook_users
                ON Labook_posts.user_id = friend_id
                WHERE friend_id = "${friend_id}" AND
                WHERE type = "${postType}"
                ORDER BY date DESC
                LIMIT "${usersPerPage}"
                OFFSET "${offset}";
            `);

                // SELECT LabookUsers.name, LaPosts.createdAt, LaPosts.description, LaPosts.photo, LaPosts.type
                // FROM LaPosts
                // JOIN LabookUsers
                // ON (LaPosts.createdBy = LabookUsers.id
                // AND LaPosts.type = "${postType}")
                // WHERE LaPosts.createdBy IN (
                // SELECT res_friend 
                // FROM LaFriends
                // WHERE req_friend = "${id}")
                // OR LaPosts.createdBy IN (
                // SELECT req_friend 
                // FROM LaFriends
                // WHERE res_friend = "${id}")
                // ORDER BY LaPosts.createdAt DESC;
                        
            const postArray: Post[] = [];

            if(result){
                for (const post of result[0]){
                    const newPost = new post(post.id, post.name, post.photo, post.description, post.type );
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

    // public async isLiked(postId: string, userId: string): Promise<any> {
    //     const result = await this.getConnection()
    //       .select("*")
    //       .from("LaBookLikes")
    //       .where({ postId, likedBy: userId });
    
    //     return result[0];
    //   }
    
    //   public async searchPost(postId: string): Promise<any> {
    //     const result = await this.getConnection()
    //       .select("*")
    //       .from("LaPosts")
    //       .where({ id: postId });
    
    //     return result[0];
    //   }
    
    //   public async likePost(postId: string, userId: string): Promise<void> {
    //     await this.getConnection()
    //       .insert({
    //         postId,
    //         likedBy: userId,
    //       })
    //       .into("LaBookLikes");
    //   }
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

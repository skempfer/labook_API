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

    public async getFeedAndPage (friend_id: string, usersPerPage: number, offset: number): Promise<any[]> {
        try{
            const result = await this.getConnection().raw(`
            SELECT post_id, photo, description, date, type, friend_id, name
            FROM Labook_posts
            JOIN Labook_friendship
            ON Labook_posts.user_id = Labook_friendship.friend_id
            JOIN Labook_users
            ON Labook_posts.user_id = friend_id
            WHERE friend_id = "${friend_id}"
            ORDER BY date DESC
            LIMIT "${usersPerPage}"
            OFFSET "${offset}";
            `);
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
                        
            const postArray: Post[] = [];

            if(result){
                for (const post of result){
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

};

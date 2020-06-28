import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { Authenticator } from "../services/Authenticator";
import { BaseDataBase } from "../data/BaseDatabase";

const postBusiness: PostBusiness = new PostBusiness();
const authenticator = new Authenticator();

export class PostController {
    
    async createPost (req: Request, res: Response): Promise<void> {
        try {          
            const token = req.headers.authorization as string;
            const idData = authenticator.getData(token);
            const user_id = idData.id;
        
            const postData = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                user_id
            };      
          
            await postBusiness.createPost(postData.photo, postData.description, postData.type, postData.user_id);
          
            res.status(200).send({
               message: "Post successfuly registered",
            });
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
        await BaseDataBase.destroyConnection();
    }; 
      
    async getFeedAndPage(req: Request, res: Response) {        
      try {            
        const token = req.headers.authorization as string;
        const idData = authenticator.getData(token);
        const user_id = idData.id;
        const page: number = Number(req.query.page) >= 1 ? Number(req.query.page): 1;
            
        const result = await postBusiness.getFeedAndPage(user_id, page );
          
        res.status(200).send(result);
      }catch (err) {
        res.status(400).send({ error: err.message });
      };
      await BaseDataBase.destroyConnection();
    };

    async getFeedByTypeAndPage(req: Request, res: Response) {
      try {
        const token = req.headers.authorization as string;
        const idData = authenticator.getData(token);
        const user_id = idData.id;
        const postType = req.query.postType as string;
        const page: number = Number(req.query.page) >= 1 ? Number(req.query.page): 1;
        
        const result = await postBusiness.getFeedByTypeAndPage(user_id, postType, page);
            
          res.status(200).send(result);
      }catch (err) {
        res.status(400).send({ error: err.message })
      }
    }

    async likePost(req: Request, res: Response) {
      try {
        const token = req.headers.authorization as string;
        const idData = authenticator.getData(token);
        const user_id = idData.id;
        const { post_id } = req.params;
    
        if (!post_id) {
          throw new Error("Invalid Post ID");
        }
    
        const searchPost = await postBusiness.searchPost(post_id);
    
        if (!searchPost) {
          throw new Error("Post doesn't exist");
        }
    
        const isLiked = await postBusiness.isLiked(post_id, user_id);
    
        if (isLiked) {
          throw new Error("You already liked this post");
        }
    
        await postBusiness.likePost(post_id, user_id);
    
        res.status(200).send({
          message: "Post Liked",
        });
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
      await BaseDataBase.destroyConnection();
    }

    async dislikePost(req: Request, res: Response) {
      try {
        const token = req.headers.authorization as string;
        const idData = authenticator.getData(token);
        const user_id = idData.id;    
        const { post_id } = req.params;
    
        if (!post_id) {
          throw new Error("Invalid Post ID");
        }
    
        const searchPost = await postBusiness.searchPost(post_id);
    
        if (!searchPost) {
          throw new Error("Post doesn't exist");
        }
    
        const isLiked = await postBusiness.isLiked(user_id, post_id);
    
        if (!isLiked) {
          throw new Error("You didn't like this post");
        }
    
        await postBusiness.dislikePost(user_id, post_id);
    
        res.status(200).send({
          message: "Post disliked",
        });
      }catch(err){
        res.status(400).send({ error: err.message});
        }
        await BaseDataBase.destroyConnection();
      }
    
      // async comment(req: Request, res: Response) {
      //   try {
      //     const token = req.headers.authorization!;
      //     const authorId = auth.getData(token).id;
      //     const { comment } = req.body;
      //     const { postId } = req.params;
    
      //     if (!postId) {
      //       throw new Error("Invalid Post ID");
      //     }
    
      //     const searchPost = await postBusiness.searchPost(postId);
    
      //     if (!searchPost) {
      //       throw new Error("Post doesn't exist");
      //     }
    
      //     await postBusiness.createComment(postId, comment, authorId);
    
      //     res.status(200).send({
      //       message: "Post commented",
      //     });
      //   } catch (err) {
      //     res.status(400).send({
      //        error: err.message
      //     });
      //   }
      //   await BaseDatabase.destroyConnection();
      // }
}

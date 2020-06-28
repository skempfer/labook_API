import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";


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
    }; 
      
    async getFeedAndPage(req: Request, res: Response) {
        
        try {
            
            const token = req.headers.authorization as string;
            authenticator.getData(token);       
            const friend_id = req.body.friend_id;
            const page: number = Number(req.body.page) >= 1 ? Number(req.body.page): 1;
            
            const result = await postBusiness.getFeedAndPage(friend_id, page );
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

    // async getPosts(req: Request, res: Response) {
    //   try {
    //     const token = req.headers.authorization as string;
    //     const idData = auth.getData(token);
    //     const tokenId = idData.id;
  
    //     const posts = await postBusiness.getPosts(tokenId);
  
    //     res.status(200).send({
    //       posts,
    //     });
    //   } catch (err) {
    //     res.status(400).send({
    //       message: err.message,
    //     });
    //   }
    //   await BaseDatabase.destroyConnection();
    // }
    
    async getFeedByTypeAndPage(req: Request, res: Response) {
    
        try {
            const token = req.headers.authorization as string;
            authenticator.getData(token);
            const postType = req.body.postType as string;
            const page: number = Number(req.body.page) >= 1 ? Number(req.body.page): 1;
            const friend_id = req.body.friend_id;
    
            const result = await postBusiness.getFeedByTypeAndPage(friend_id, postType, page);
            
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({ error: err.message })
        }
    }

    //////////////////////////////////////////////////////////

    async likePost(req: Request, res: Response) {
        try {
          const token = req.headers.authorization!;
          const id = auth.getData(token).id;
          const { postId } = req.params;
    
          if (!postId) {
            throw new Error("Invalid Post ID");
          }
    
          const searchPost = await postBusiness.searchPost(postId);
    
          if (!searchPost) {
            throw new Error("Post doesn't exist");
          }
    
          const isLiked = await postBusiness.isLiked(postId, id);
    
          if (isLiked) {
            throw new Error("You already liked this post");
          }
    
          await postBusiness.likePost(postId, id);
    
          res.status(200).send({
            message: "Post Liked",
          });
        } catch (err) {
          res.status(400).send({
            message: err.message,
          });
        }
        await BaseDatabase.destroyConnection();
      }
      async dislikePost(req: Request, res: Response) {
    
        try {
          const token = req.headers.authorization!;
          const id = auth.getData(token).id;
    
          const { postId } = req.params;
    
          if (!postId) {
            throw new Error("Invalid Post ID");
          }
    
          const searchPost = await postBusiness.searchPost(postId);
    
          if (!searchPost) {
            throw new Error("Post doesn't exist");
          }
    
          const isLiked = await postBusiness.isLiked(postId, id);
    
          if (!isLiked) {
            throw new Error("You didn't like this post");
          }
    
          await postBusiness.dislikePost(postId, id);
    
          res.status(200).send({
            message: "Post disliked",
          });
    
        } catch (err) {
          res.status(400).send({
            message: err.message,
          });
        }
        await BaseDatabase.destroyConnection();
      }
    
      async comment(req: Request, res: Response) {
        try {
          const token = req.headers.authorization!;
          const authorId = auth.getData(token).id;
          const { comment } = req.body;
          const { postId } = req.params;
    
          if (!postId) {
            throw new Error("Invalid Post ID");
          }
    
          const searchPost = await postBusiness.searchPost(postId);
    
          if (!searchPost) {
            throw new Error("Post doesn't exist");
          }
    
          await postBusiness.createComment(postId, comment, authorId);
    
          res.status(200).send({
            message: "Post commented",
          });
        } catch (err) {
          res.status(400).send({
            message: err.message,
          });
        }
        await BaseDatabase.destroyConnection();
      }
}

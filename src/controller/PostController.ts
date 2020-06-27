import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { PostDatabase } from "../data/PostDataBase";

const postBusiness: PostBusiness = new PostBusiness();
const authenticator = new Authenticator();
const postDatabase = new PostDatabase();
const hashManager = new HashManager();

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
      
    async getFeed(req: Request, res: Response) {
        const postBusiness: PostBusiness = new PostBusiness();
    
        const token = req.headers.authorization as string;
        const idData = authenticator.getData(token);
        const user_id = idData.id;
    
        try {
            const result = await postBusiness.getFeed(user_id);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }
    
    async getFeedByType(req: Request, res: Response) {
    
        try {
            const postType = req.body.postType as string;
    
            const result = await postBusiness.getFeedByType(postType);
            
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({ error: err.message })
        }
    }
}

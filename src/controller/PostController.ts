import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { postInputDTO} from "../dto/PostDTO";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness: UserBusiness = new UserBusiness();
const authenticator = new Authenticator();
const userDatabase = new UserDatabase();
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
          
            await userBusiness.createPost(postData.photo, postData.description, postData.type, postData.user_id);
          
            res.status(200).send({
           message: "Post successfuly registered",
            });
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    }; 
      
    async getFeedFriendship(req: Request, res: Response) {
        const userBusiness: UserBusiness = new UserBusiness();
    
        const token = req.headers.authorization as string;
        const idData = authenticator.getData(token);
        const user_id = idData.id;
    
        try {
            const result = await userBusiness.getFeedFriendship(user_id);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }
    
    async getFeedByType(req: Request, res: Response) {
    
        try {
            const postType = req.body.postType as string;
    
            const result = await new UserBusiness().getFeedByType(postType);
            
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({ error: err.message })
        }
    }
}

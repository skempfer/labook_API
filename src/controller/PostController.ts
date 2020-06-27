import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { Authenticator } from "../services/Authenticator";
import { UserOrderInputDTO } from "../dto/PostDTO";

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
    
    async getFeedByTypeAndPage(req: Request, res: Response) {
    
        try {
            const postType = req.body.postType as string;
            const order: UserOrderInputDTO = {type: "ASC"}
            const page: number = Number(req.body.page) >= 1 ? Number(req.body.page): 1;
    
            if(req.body.orderType === "DESC"){
                order.type = req.body.orderType;
            }

            const result = await postBusiness.getFeedByTypeAndPage(postType, page);
            
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send({ error: err.message })
        }
    }
}

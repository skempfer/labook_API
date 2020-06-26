import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { SignupInputDTO} from "../dto/UserDTO";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness: UserBusiness = new UserBusiness();
const authenticator = new Authenticator();
const userDatabase = new UserDatabase();
const hashManager = new HashManager();

export class UserController {
    
  async signup(req: Request, res: Response) {
    try {
      const userData: SignupInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
            
      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(userData.password);

      const id = await userBusiness.signup(userData.name, userData.email, hashPassword);

      const accessToken = authenticator.generateToken({ id  });

      res.status(200).send({ accessToken });

      } catch (err) {
        res.status(400).send({ error: err.message });
      }
  }

  async friendship(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            authenticator.getData(token);

            const { user_id } = req.body;
            const { friend_id } = req.body;

          const id =  await userBusiness.friendship(user_id, friend_id);

          authenticator.generateToken({
              id: id                
          });

            res.status(200).send({ message: "Solicitação de amizade enviada com sucesso!" })
        } catch(err) {
            res.status(400).send({ error: err.message });
        }
  }
   
  async login (req: Request, res: Response) {
      try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
          throw new Error("Invalid email");
        }
    
        const userData = {
          email: req.body.email,
          password: req.body.password,
        };
    
        const userDatabase = new UserDatabase();
        const user = await userBusiness.login(userData.email);
    
        const hashManager = new HashManager();
        const compareResult = await hashManager.compare(userData.password, user.password);
    
        if (!compareResult) {
          throw new Error("Invalid password");
        }
    
        const authenticator = new Authenticator();
        const token = authenticator.generateToken({
          id: user.id,
        });
    
        res.status(200).send({
          token,
        });
      } catch (err) {
        res.status(400).send({
          message: err.message,
        });
      }
  };

  async createPost (req: Request, res: Response){
    try {
      const token = req.headers.authorization as string;
      authenticator.getData(token);

      const postData = {
        user_id: req.params.user_id,
        photo: req.body.photo,
        description: req.body.description,
        type: req.body.type
      };
      
      if (!postData.photo) {
        throw new Error("Invalid photo");
      }

      if (!postData.description) {
        throw new Error("Invalid description");
      }

      if (!postData.type) {
        throw new Error("Invalid type");
      }

      await userBusiness.createPost(postData.user_id, postData.photo, postData.description, postData.type);
      
      res.status(200).send({
        message: "Post successfuly registered",
      });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };  
}

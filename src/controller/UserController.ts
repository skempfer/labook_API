import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { SignupInputDTO, LoginInputDTO} from "../dto/UserDTO";
import { RefreshTokenDataBase } from "../data/RefreshTokenDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { BaseDataBase } from "../data/BaseDatabase";
 
const userBusiness: UserBusiness = new UserBusiness();
const authenticator = new Authenticator();
const hashManager = new HashManager();

export class UserController {
    
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const userData: SignupInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        device: req.body.device
      }
            
      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(userData.password);

      const id = await userBusiness.signup(userData.name, userData.email, hashPassword);

      const accessToken = authenticator.generateToken({ 
        id
      }, process.env.ACCESS_TOKEN_EXPIRES_IN);

      const refreshToken = authenticator.generateToken({
        id, 
        device: userData.device
      }, process.env.REFRESH_TOKEN_EXPIRES_IN);

      res.status(200).send({ accessToken, refreshToken });

      } catch (err) {
        res.status(400).send({ error: err.message });
      }
      await BaseDataBase.destroyConnection();
  }
   
  async login (req: Request, res: Response): Promise<void> {
      try {
            
        const userData: LoginInputDTO = {
          email: req.body.email,
          password: req.body.password,
          device: req.body.device
        };    

        if (!req.body.email || req.body.email.indexOf("@") === -1) {
          throw new Error("Invalid email");
        }

        const user = await userBusiness.login(userData.email);
    
        const compareResult = await hashManager.compare(userData.password, user.password);
    
        if (!compareResult) {
          throw new Error("Invalid password");
        }
    
        const accessToken = authenticator.generateToken({ 
          id : user.id
        }, process.env.ACCESS_TOKEN_EXPIRES_IN);
  
        const refreshToken = authenticator.generateToken({
          id : user.id,
          device: userData.device
        }, process.env.REFRESH_TOKEN_EXPIRES_IN);

        const refreshTokenDataBase = new RefreshTokenDataBase();
        const refreshTokenFromDataBase = await refreshTokenDataBase.getRefreshTokenByIdAndDevide(user.id, userData.device);
    
        if(refreshTokenDataBase){
          await refreshTokenDataBase.deleteToken(refreshTokenFromDataBase.token);
        };

        await refreshTokenDataBase.createRefreshToken(refreshToken,user.user_id, userData.device, true ),

        res.status(200).send({
          accessToken, refreshToken
        });
      } catch (err) {
        res.status(400).send({
          message: err.message,
        });
      }
  };

  async createFriendship(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;
      const idData = authenticator.getData(token);
      const user_id = idData.id;

      const { friend_id } = req.body;

      const id =  await userBusiness.createFriendship(user_id, friend_id);

      authenticator.generateToken({
        id: id                
      });

      res.status(200).send({ message: "Friendship request sent successfully!" })
    } catch(err) {
      res.status(400).send({ error: err.message });
    }
    await BaseDataBase.destroyConnection();
  }

  async undoFriendship(req: Request, res: Response): Promise<void> {
    try{
      const token = req.headers.authorization as string;
      const idData = authenticator.getData(token);
      const user_id = idData.id;
    
      const { friend_id } = req.body;

          
      await userBusiness.deleteFriendship(
        user_id, 
        friend_id
      );

      res.status(200).send({ message: "Friendship successfully undone!" })
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
    await BaseDataBase.destroyConnection();
  }

  async createRefreshToken(req: Request, res: Response): Promise<any> {
    try{
      const refreshToken = req.body.refreshToken;
      const device = req.body.device;

      const authenticator = new Authenticator;
      const refreshTokenData = authenticator.getData(refreshToken);
      
      if(refreshTokenData.device !== device){
        throw new Error("Refresh Token has no device");
      };

      const userDataBase = new UserDatabase();
      const user = await userDataBase.getUserById(refreshTokenData.id);

      const accessToken = authenticator.generateToken(
        {
          id: user.id,
        }
      );

      res.status(200).send({accessToken});
    }catch(err){
      res.status(400).send({ error: err.message });
    }
    await BaseDataBase.destroyConnection();
  }
}

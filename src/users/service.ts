import {LoginData} from "./model";
import Promise = require("bluebird")
import {IUserRepository} from "./repository";
import {Result, getResult} from "../global/result";

export interface IUserService{
    login(user : {username : string, password : string}) : Promise<Result<LoginData>>;
    register(user : {username : string, password : string, passwordConfirm : string});
}

export class UserService implements IUserService{

    constructor(private userRepository : IUserRepository){

    }

    login(user:{username:string; password:string}):Promise<Result<LoginData>> {
        return undefined;
    }

    register(user:{username:string; email : string ;password:string; passwordConfirm:string}): Promise<{}> {

        return new Promise((resolve : (val : Result<{}>) => void, reject: (error?: any) => void) => {
            if(user.password === user.passwordConfirm){
                return this.userRepository.register({login : user.username, email: user.email, password: user.password}).then((onFullFill) => {
                        resolve(getResult(true));
                }, onReject => {
                    reject(onReject)
                });
            }
            else{
                reject({code : 1, errmsg : "password confirm not equal to password"});
            }
        });
    }

}

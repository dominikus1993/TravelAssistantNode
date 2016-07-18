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

    register(user:{username:string; password:string; passwordConfirm:string}): Promise<{}> {

        return new Promise((resolve : (val : Result<{}>) => void, reject: (error?: any) => void) => {
            if(user.password === user.passwordConfirm){
                return this.userRepository.register({login : user.username, password: user.password}).then((onFullFill, onReject) => {
                    if (onReject) {
                        reject(onReject);
                    }
                    else{
                        resolve(getResult(true))
                    }
                });
            }
            else{
                reject("password confirm not equal to password");
            }
        });
    }

}

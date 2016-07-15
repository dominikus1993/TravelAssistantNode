import {LoginData} from "./model";
import Promise = require("bluebird")
import {IUserRepository} from "./repository";
import {Result} from "../global/result";

export interface IUserService{
    login(user : {login : string, password : string}) : Promise<Result<LoginData>>;
    register(user : {login : string, password : string, passwordConfirm : string});
}

export class UserService implements IUserService{

    constructor(private userRepository : IUserRepository){

    }

    login(user:{login:string; password:string}):Promise<Result<LoginData>> {
        return undefined;
    }

    register(user:{login:string; password:string; passwordConfirm:string}) {
    }

}

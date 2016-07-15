import {User, LoginData} from "./model";
import Result = jasmine.Result;
import Promise = require("bluebird")

export interface IUserService{
    login(user : {login : string, password : string}) : Promise<Result<LoginData>>;
    register(user : {login : string, password : string, passwordConfirm : string});
}

export class UserService implements IUserService{
    login(user:{login:string; password:string}):Promise<Result<LoginData>> {
        return undefined;
    }

    register(user:{login:string; password:string; passwordConfirm:string}) {
    }

}


import {User, LoginData} from "./model";
import Promise = require("~mongoose~mpromise/index");
import {Model} from "~mongoose/index";
export interface IUserRepository{
    get(by : Object) : Promise<User>;
}

export class UserReposiitory implements IUserRepository{

    constructor(private model : Model<User>, private loginDataModel : Model<LoginData>){

    }

    get(by:Object):Promise<User> {
        return this.model.findOne(by).exec();
    }

    register(data : {login:string; password:string;}) : Promise<any>{
        return new this.model({username : data.login, email : "", password : data.password}).save()
    }

    
}
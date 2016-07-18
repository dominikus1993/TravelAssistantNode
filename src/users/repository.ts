
import {User, LoginData} from "./model";
import Promise = require("~mongoose~mpromise/index");
import {Model} from "~mongoose/index";
import {encrypt} from "../global/utils";

export interface IUserRepository{
    get(by : Object) : Promise<User>;
    register(data : {login:string; password:string;}) : Promise<{}>;
}

export class UserReposiitory implements IUserRepository{

    constructor(private model : Model<User>, private loginDataModel : Model<LoginData>){

    }

    get(by:Object):Promise<User> {
        return this.model.findOne(by).exec();
    }

    register(data : {login:string; password:string;}) : Promise<{}>{
        return new this.model({username : data.login, email : "", password : encrypt(data.password)}).save()
    }
}
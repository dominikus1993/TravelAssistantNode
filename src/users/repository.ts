
import {User, LoginData} from "./model";
import Promise = require("~mongoose~mpromise/index");
import {Model} from "~mongoose/index";
import {encrypt} from "../global/utils";

export interface IUserRepository{
    get(by : Object) : Promise<User>;
    register(data : {login:string; email: string; password:string;}) : Promise<{}>;
    saveLoginData(data : Object) : Promise<{}>;
    getLoginData(by : Object) : Promise<LoginData>;
}

export class UserReposiitory implements IUserRepository{

    constructor(private model : Model<User>, private loginDataModel : Model<LoginData>){

    }

    get(by:Object):Promise<User> {
        return this.model.findOne(by).exec();
    }

    saveLoginData(data : Object){
        return new this.loginDataModel(data).save();
    }

    getLoginData(by : Object) : Promise<LoginData>{
        return this.loginDataModel.findOne(by).exec();
    }

    register(data : {login:string; email : string; password:string;}) : Promise<{}>{
        return new this.model({username : data.login, email : data.email, password : encrypt(data.password)}).save()
    }
}

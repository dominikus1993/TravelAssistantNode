
import {User, Singin} from "./model";
import Promise = require("~mongoose~mpromise/index");
import {Model} from "~mongoose/index";
export interface IUserRepository{
    get(by : Object) : Promise<User>;
}

export class UserReposiitory implements IUserRepository{

    constructor(private model : Model<User>, private signModel : Model<Singin>){

    }

    get(by:Object):Promise<User> {
        return this.model.findOne(by).exec();
    }

    
}
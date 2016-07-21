
import {encrypt} from "../global/utils";
import {LoginData, User} from "./model";
import {Model} from "~mongoose/index";
import Promise = require("~mongoose~mpromise/index");

export interface IUserRepository {
    get(by: Object): Promise<User>;
    register(data: {login: string; email: string; password: string; }): Promise<{}>;
    saveLoginData(data: Object): Promise<{}>;
    getLoginData(by: Object): Promise<LoginData>;
}

export class UserReposiitory implements IUserRepository {

    constructor(private model: Model<User>, private loginDataModel: Model<LoginData>) {

    }

    public get(by: Object): Promise<User> {
        return this.model.findOne(by).exec();
    }

    public saveLoginData(data: Object) {
        return new this.loginDataModel(data).save();
    }

    public getLoginData(by : Object) : Promise<LoginData> {
        return this.loginDataModel.findOne(by).exec();
    }

    public register(data: {login: string; email: string; password: string}): Promise<{}> {
        return new this.model({email : data.email, password : encrypt(data.password), username : data.login}).save();
    }
}

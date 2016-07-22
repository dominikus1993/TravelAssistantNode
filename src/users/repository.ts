import {encrypt} from "../global/utils";
import {LoginData, User} from "./model";
import * as Promise from "bluebird";
import {Model}  from "mongoose";

export interface IUserRepository {
    get(by: Object): Promise<User>;
    register(data: {username: string; email: string; password: string}): Promise<{}>;
    saveLoginData(data: Object): Promise<{}>;
    getLoginData(by: Object): Promise<LoginData>;
}

export class UserReposiitory implements IUserRepository {

    constructor(private model: Model<User>, private loginDataModel: Model<LoginData>) {

    }

    public get(by: Object): Promise<User> {
        return this.model.findOne(by).exec() as any as Promise<User>;
    }

    public saveLoginData(data: Object) {
        return new this.loginDataModel(data).save() as any as Promise<{}>;
    }

    public getLoginData(by: Object): Promise<LoginData> {
        return this.loginDataModel.findOne(by).exec() as any as Promise<LoginData>;
    }

    public register(data: {username: string; email: string; password: string}): Promise<{}> {
        return new this.model({email : data.email, password : encrypt(data.password), username : data.username}).save() as any as Promise<{}>;
    }
}

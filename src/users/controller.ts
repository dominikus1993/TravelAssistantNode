///<reference path="../../typings/index.d.ts"/>
import Promise = require("bluebird");
import {UserService} from "./service";
import {UserReposiitory} from "./repository";
import {userModel, loginDataModel} from "./model";

const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next){
    let user : {username : string, password : string, passwordConfirm : string} = req.body;
    console.log(user);
    res.status(200).json(user);
}




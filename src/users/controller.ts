///<reference path="../../typings/index.d.ts"/>
import Promise = require("bluebird");
import {UserService} from "./service";
import {UserReposiitory} from "./repository";
import {userModel, loginDataModel} from "./model";

const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next){
    let user : {username : string, email: string, password : string, passwordConfirm : string} = req.body;
    service.register(user).then(fullFill => {
        res.status(200).json(fullFill);
    }, onreject => {
        res.status(400).json(onreject)
    }).catch(error => {
        res.status(400).json(error);
    });
}




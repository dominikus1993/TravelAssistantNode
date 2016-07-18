///<reference path="../../typings/index.d.ts"/>
import Promise = require("bluebird");
import {UserService} from "./service";
import {UserReposiitory} from "./repository";
import {userModel, loginDataModel} from "./model";
import {STATUS_CODES} from "http";

const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next){
    let user : {username : string, email: string, password : string, passwordConfirm : string} = req.body;
    service.register(user).then(fulfilled => {
        res.status(200).json(fulfilled);
    }, rejected => {
        res.status(400).json(rejected)
    }).catch(error => {
        res.status(400).json(error);
    });
}

export function login(req, res, next) {
    let user: {username : string, password : string} = req.body;
    service.login(user).then((fulfilled) => {
        res.status(200).json(fulfilled);
    }).catch(error => {
        res.status(400).json(error);
    });
}




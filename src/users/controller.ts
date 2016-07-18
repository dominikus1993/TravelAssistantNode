///<reference path="../../typings/index.d.ts"/>
import Promise = require("bluebird");
import {UserService} from "./service";
import {UserReposiitory} from "./repository";
import {userModel, loginDataModel} from "./model";
import * as statuses from "../global/constants"
const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next){
    let user : {username : string, email: string, password : string, passwordConfirm : string} = req.body;
    service.register(user).then(fulfilled => {
        res.status(statuses.HttpStatus.OK).json(fulfilled);
    }, rejected => {
        res.status(statuses.HttpStatus.NOT_FOUND).json(rejected)
    }).catch(error => {
        res.status(statuses.HttpStatus.NOT_FOUND).json(error);
    });
}

export function login(req, res, next) {
    let user: {username : string, password : string} = req.body;
    service.login(user).then((fulfilled) => {
        res.status(statuses.HttpStatus.OK).json(fulfilled);
    }).catch(error => {
        res.status(statuses.HttpStatus.NOT_FOUND).json(error);
    });
}




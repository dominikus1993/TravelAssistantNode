///<reference path="../../typings/index.d.ts"/>
import Promise = require("bluebird");
import {UserService} from "./service";
import {UserReposiitory} from "./repository";
import {userModel, loginDataModel, LoginData} from "./model";
import * as status from "../global/constants"
import {Result, getResult, getError} from "../global/result";
const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next){
    let user : {username : string, email: string, password : string, passwordConfirm : string} = req.body;
    service.register(user).then(fulfilled => {
        res.status(status.HttpStatus.OK).json(fulfilled);
    }, rejected => {
        res.status(status.HttpStatus.NOT_FOUND).json(rejected)
    }).catch(error => {
        res.status(status.HttpStatus.NOT_FOUND).json(error);
    });
}

export function login(req, res, next) {
    let user: {username : string, password : string} = req.body;
    service.login(user).then((fulfilled : Result<LoginData>) => {
        res.status(status.HttpStatus.OK).json(fulfilled);
    }).catch((error ?: any) => {
        res.status(status.HttpStatus.NOT_FOUND).json(error);
    });
}

export function checkAuth(req, res, next){
    let loginData:any = req.headers["authorization"] || "";
    service.checkAuth(loginData).then((fullfiled : Result<boolean>) => {
        if (fullfiled.isSuccess && fullfiled.value) {
            next()
        }else{
            res.status(status.HttpStatus.UNAUTHORIZED).json(getError({code: 401, errmsg: "Unauthorized"}));
        }
    }, rejected => {
        res.status(status.HttpStatus.UNAUTHORIZED).json(getError({code: 401, errmsg: rejected}));
    }).catch(error => {
        res.status(status.HttpStatus.UNAUTHORIZED).json(getError({code: 401, errmsg: error}))
    });
}




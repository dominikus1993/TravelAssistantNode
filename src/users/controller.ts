///<reference path="../../typings/index.d.ts"/>
import Promise = require("bluebird");
import {UserService} from "./service";
import {UserReposiitory} from "./repository";
import {userModel, loginDataModel, LoginData, User} from "./model";
import * as status from "../global/constants"
import {Result, getResult, getError} from "../global/result";
const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next){
    let user : {username : string, email: string, password : string, passwordConfirm : string} = req.body;
    service.register(user).then(fulfilled => {
        res.status(status.HttpStatus.OK).json(fulfilled).end();
    }, rejected => {
        res.status(status.HttpStatus.NOT_FOUND).json(rejected).end();
    }).catch(error => {
        res.status(status.HttpStatus.NOT_FOUND).json(getError(error)).end();
    });
}

export function login(req, res, next) {
    let user: {username : string, password : string} = req.body;
    service.login(user).then((fulfilled : Result<LoginData>) => {
        res.status(status.HttpStatus.OK).json(fulfilled).end();
    }).catch((error ?: any) => {
        res.status(status.HttpStatus.NOT_FOUND).json(error).end();
    });
}

export function checkAuth(req, res, next){
    let loginData:any = req.headers["authorization"] || "";
    service.checkAuth(loginData).then((fullfiled : Result<User>) => {
        if (fullfiled.isSuccess) {
            req.user = fullfiled.value;
            next();
        }else{
            res.status(status.HttpStatus.UNAUTHORIZED).json(getError({code: 401, errmsg: "Unauthorized"})).end();
        }
    }, rejected => {
        res.status(status.HttpStatus.UNAUTHORIZED).json(getError({code: 401, errmsg: rejected})).end();
    }).catch(error => {
        res.status(status.HttpStatus.UNAUTHORIZED).json(getError({code: 401, errmsg: error})).end();
    });
}




import Promise = require("bluebird");
import * as status from "../global/constants";
import {LoginData, loginDataModel, User, userModel} from "./model";
import {UserReposiitory} from "./repository";
import {UserService} from "./service";
import {getError, Result} from "../global/result";

const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next) {
    let user: {username: string, email: string, password: string, passwordConfirm: string} = req.body;
    service.register(user).then(fulfilled => {
        res.status(status.OK).json(fulfilled).end();
    }, rejected => {
        res.status(status.NOT_FOUND).json(rejected).end();
    }).catch(error => {
        res.status(status.NOT_FOUND).json(getError(error)).end();
    });
}

export function login(req, res, next) {
    let user: {username: string, password: string} = req.body;
    service.login(user).then((fulfilled: Result<LoginData>) => {
        res.status(status.OK).json(fulfilled).end();
    }).catch((error ?: any) => {
        res.status(status.NOT_FOUND).json(error).end();
    });
}

export function checkAuth(req, res, next) {
    let loginData: string = req.headers["authorization"] || "";
    service.checkAuth(loginData).then((fullfiled: Result<User>) => {
        if (fullfiled.isSuccess) {
            req.user = fullfiled.value;
            next();
        } else {
            res.status(status.UNAUTHORIZED).json(getError(new Error("Unathorized access"))).end();
        }
    }, rejected => {
        res.status(status.UNAUTHORIZED).json(rejected).end();
    }).catch(error => {
        res.status(status.UNAUTHORIZED).json(error).end();
    });
}

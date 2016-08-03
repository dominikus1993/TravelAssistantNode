import {HTTP_STATUS} from "../global/constants";
import {Result, getError} from "../global/result";
import {LoginData, User, loginDataModel, userModel} from "./model";
import {UserReposiitory} from "./repository";
import {UserService} from "./service";

const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export function register(req, res, next) {
    let user: {username: string, email: string, password: string, passwordConfirm: string} = req.body;
    service.register(user).then(fulfilled => {
        res.status(HTTP_STATUS.OK).json(fulfilled).end();
    }, rejected => {
        res.status(HTTP_STATUS.NOT_FOUND).json(rejected).end();
    }).catch(error => {
        res.status(HTTP_STATUS.NOT_FOUND).json(getError(error)).end();
    });
}

export function login(req, res, next) {
    let user: {username: string, password: string} = req.body;
    service.login(user).then((fulfilled: Result<LoginData, Error>) => {
        res.status(HTTP_STATUS.OK).json(fulfilled).end();
    }).catch((error ?: any) => {
        res.status(HTTP_STATUS.NOT_FOUND).json(error).end();
    });
}

export function checkAuth(req, res, next) {
    let loginData: string = req.headers["authorization"] || "";
    service.checkAuth(loginData).then((fullfiled: Result<User, Error>) => {
        if (fullfiled.isSuccess) {
            req.user = fullfiled.value;
            next();
        } else {
            res.status(HTTP_STATUS.UNAUTHORIZED).json(getError(new Error("Unathorized access"))).end();
        }
    }, rejected => {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(rejected).end();
    }).catch(error => {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(error).end();
    });
}

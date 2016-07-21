import Promise = require("bluebird");
import * as status from "../global/constants";
import {getError, getResult} from "../global/result";
import {encrypt, isNullOrUndefined} from "../global/utils";
import {LoginData, User} from "./model";
import {IUserRepository} from "./repository";


export interface IUserService {
    login(user: { username: string, password: string });
    register(user: { username: string, password: string, passwordConfirm: string });
    checkAuth(loginData: string);
}

export class UserService implements IUserService {

    constructor(private userRepository: IUserRepository) {

    }

    public login(user: { username: string; password: string }) {
        return Promise.resolve(this.userRepository.get({username: user.username})).then(fulfilled => {
            if (!isNullOrUndefined(fulfilled)) {
                if (fulfilled.password === encrypt(user.password)) {
                    return Promise.resolve(fulfilled);
                } else {

                    return Promise.reject({code: 1, errmsg: "password is incorect"});
                }
            } else {
                return Promise.reject({code: 1, errmsg: "username is incorect"});
            }
        }).then((fulfilled: User) => {
            return this.userRepository.saveLoginData({
                date: new Date(),
                expirationDate: new Date(new Date().setDate(new Date().getDate() + 6)),
                user: fulfilled,
            });
        }).then(resolve => {
            return getResult(resolve);
        }, rejected => {
            return getError(rejected);
        });
    }

    public register(user: { username: string; email: string; password: string; passwordConfirm: string }): Promise<{}> {
        if (user.password === user.passwordConfirm) {
            return Promise.resolve(this.userRepository.register({
                email: user.email,
                login: user.username,
                password: user.password,
            })).then(fulfilled => {
                return getResult(fulfilled);
            }, rejected => {
                return getError(rejected);
            });
        } else {
            return Promise.reject(getError({code: status.UNAUTHORIZED, errmsg: "password confirm not equal to password"}));
        }
    }

    public checkAuth(loginData: string) {
        return Promise.resolve(this.userRepository.getLoginData({_id: loginData})).then((fulfilled: LoginData) => {
            if (!isNullOrUndefined(fulfilled) && fulfilled.expirationDate.getTime() > new Date().getTime()) {
                return Promise.resolve(fulfilled.user);
            }
            return Promise.reject(getError({code: status.UNAUTHORIZED, errmsg: "Unathorized access"}));
        }, rejected => {
            return Promise.reject(getError({code: status.UNAUTHORIZED, errmsg: "Unathorized access"}));
        }).then(fullfiled => {
            return this.userRepository.get({_id : fullfiled});
        }).then(fulfiiled => {
            return getResult(fulfiiled);
        });
    }

}

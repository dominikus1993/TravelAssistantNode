import {LoginData, User} from "./model";
import Promise = require("bluebird")
import {IUserRepository} from "./repository";
import {Result, getResult, getError} from "../global/result";
import {encrypt, isNullOrUndefined} from "../global/utils";

export interface IUserService {
    login(user:{ username:string, password:string });
    register(user:{ username:string, password:string, passwordConfirm:string });
    checkAuth(loginData:string);
}

export class UserService implements IUserService {

    constructor(private userRepository:IUserRepository) {

    }

    login(user:{ username:string; password:string }) {
        return Promise.resolve(this.userRepository.get({username: user.username})).then(fulfilled => {
            if (!isNullOrUndefined(fulfilled)) {
                if (fulfilled.password === encrypt(user.password)) {
                    return Promise.resolve(fulfilled);
                }
                else {

                    return Promise.reject({code: 1, errmsg: "password is incorect"});
                }
            }
            else {
                return Promise.reject({code: 1, errmsg: "username is incorect"});
            }
        }).then((fulfilled:User) => {
            return this.userRepository.saveLoginData({
                user: fulfilled,
                date: new Date(),
                expirationDate: new Date(new Date().setDate(new Date().getDate() + 6))
            });
        }).then(resolve => {
            return getResult(resolve);
        }, rejected => {
            return getError(rejected);
        })
    }

    register(user:{ username:string; email:string; password:string; passwordConfirm:string }):Promise<{}> {
        if (user.password === user.passwordConfirm) {
            return Promise.resolve(this.userRepository.register({
                login: user.username,
                email: user.email,
                password: user.password
            })).then(fulfilled => {
                return getResult(fulfilled);
            }, rejected => {
                return getError(rejected);
            });
        }
        else {
            return Promise.reject(getError({code: 1, errmsg: "password confirm not equal to password"}));
        }
    }

    checkAuth(loginData:string) {
        return Promise.resolve(this.userRepository.getLoginData({_id: loginData})).then((fulfilled:LoginData) => {
            if (!isNullOrUndefined(fulfilled) && fulfilled.expirationDate.getTime() > new Date().getTime()) {
                return Promise.resolve(fulfilled.user);
            }
            return Promise.reject(getError({errmsg: "Unathorized access", code: 401}));
        }).then(fullfiled => {
            return this.userRepository.get({_id : fullfiled});
        }).then(fulfiiled => {
            return getResult(fulfiiled);
        });
    }

}

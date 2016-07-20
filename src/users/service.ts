import {LoginData, User} from "./model";
import Promise = require("bluebird")
import {IUserRepository} from "./repository";
import {Result, getResult, getError} from "../global/result";
import {encrypt, isNullOrUndefined} from "../global/utils";

export interface IUserService {
    login(user:{ username:string, password:string });
    register(user:{ username:string, password:string, passwordConfirm:string });
    checkAuth(loginData:any);
}

export class UserService implements IUserService {

    constructor(private userRepository:IUserRepository) {

    }

    login(user:{ username:string; password:string }) {
        return new Promise((resolve:(val:Result<{}>) => void, reject:(error?:any) => void) => {
            this.userRepository.get({username: user.username}).then((fulfilled) => {
                if (!isNullOrUndefined(fulfilled)) {
                    if (fulfilled.password === encrypt(user.password)) {
                        resolve(getResult(fulfilled));
                    }
                    else {
                        reject(getError({code: 1, errmsg: "password is incorect"}))
                    }
                }
                else {
                    reject(getError({code: 1, errmsg: "username is incorect"}))
                }
            });
        }).then((fulfilled:Result<User>) => {
            if (fulfilled.isSuccess) {
                return getResult(this.userRepository.saveLoginData({
                    user: fulfilled.value,
                    date: new Date(),
                    expirationDate: new Date().setDate(new Date().getDate() + 6)
                }));
            }
            return Promise.reject(getError({code: 2, errmsg: "cannot login"}));
        });
    }

    register(user:{ username:string; email:string; password:string; passwordConfirm:string }):Promise<{}> {
        return new Promise((resolve:(val:Result<{}>) => void, reject:(error?:any) => void) => {
            if (user.password === user.passwordConfirm) {
                return this.userRepository.register({
                    login: user.username,
                    email: user.email,
                    password: user.password
                }).then((fulfilled) => {
                    resolve(getResult(true));
                }, onReject => {
                    reject(getError(onReject))
                });
            }
            else {
                reject(getError({code: 1, errmsg: "password confirm not equal to password"}));
            }
        });
    }

    checkAuth(loginData:any) {
        return new Promise((resolve:(val:Result<{}>) => void, reject:(error?:any) => void) => {
            this.userRepository.getLoginData({_id: loginData}).then((fulfilled:LoginData) => {
                if (!isNullOrUndefined(fulfilled)) {
                    resolve(getResult(fulfilled.expirationDate.getTime() > new Date().getTime()));
                }
                else {
                    resolve(getResult(false));
                }
            }, rejected => {
                resolve(getResult(false));
            });
        });
    }

}

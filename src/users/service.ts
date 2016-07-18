import {LoginData} from "./model";
import Promise = require("bluebird")
import {IUserRepository} from "./repository";
import {Result, getResult} from "../global/result";
import {encrypt, isNullOrUndefined} from "../global/utils";

export interface IUserService {
    login(user: { username: string, password: string });
    register(user: { username: string, password: string, passwordConfirm: string });
}

export class UserService implements IUserService {

    constructor(private userRepository: IUserRepository) {

    }

    login(user: { username: string; password: string }){
        return new Promise((resolve: (val: Result<{}>) => void, reject: (error?: any) => void) => {
            this.userRepository.get({username : user.username}).then((fulfilled) => {
                if(!isNullOrUndefined(fulfilled)){
                    console.log(encrypt(user.password));
                    if(fulfilled.password === encrypt(user.password)){
                        resolve(getResult(fulfilled));
                    }
                    else{
                        reject({ code: 1, errmsg: "password is incorect" })
                    }
                }
                else{
                    reject({code : 1, errmsg: "username is incorect"})
                }
            });
        });
    }

    register(user: { username: string; email: string; password: string; passwordConfirm: string }): Promise<{}> {

        return new Promise((resolve: (val: Result<{}>) => void, reject: (error?: any) => void) => {
            if (user.password === user.passwordConfirm) {
                return this.userRepository.register({ login: user.username, email: user.email, password: user.password }).then((fulfilled) => {
                    resolve(getResult(true));
                }, onReject => {
                    reject(onReject)
                });
            }
            else {
                reject({ code: 1, errmsg: "password confirm not equal to password" });
            }
        });
    }

}

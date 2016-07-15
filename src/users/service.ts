
import Result = jasmine.Result;
export interface IUserService{
    login(user : {login : string, password : string}) : Result<boolean>;
    register(user : {login : string, password : string, passwordConfirm : string});
}

export class UserService{

}

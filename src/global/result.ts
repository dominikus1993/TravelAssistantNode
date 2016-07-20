import {isNullOrUndefined} from "./utils";
import {IError} from "./error";

export interface Result<T>{
    isSuccess : boolean;
    isError : boolean;
    value : T;
    message : IError
}

export function getError<T>(error : IError) : Result<T>{
    return {isSuccess : false, value : null, isError : true, message : error};
}

export function getResult<T>(element : T) : Result<T>{
    return {isSuccess : !isNullOrUndefined(element), value : element, isError : false, message : null};
}


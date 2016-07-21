import {IError} from "./error";
import {isNullOrUndefined} from "./utils";

export interface Result<T>{
    isSuccess: boolean;
    isError: boolean;
    value: T;
    message: IError;
}

export function getError<T>(error: IError): Result<T>  {
    return {isError : true, isSuccess : false,  message : error, value : null};
}

export function getResult<T>(element: T): Result<T> {
    return {isError : false, isSuccess : !isNullOrUndefined(element), message : null, value : element};
}


import {isNullOrUndefined} from "./utils";

export interface Result<T>{
    isSuccess: boolean;
    isError: boolean;
    value: T;
    message: string;
}

export function getError<T>(error: Error): Result<T>  {
    return {isError : true, isSuccess : false,  message : JSON.stringify(error), value : null};
}

export function getResult<T>(element: T): Result<T> {
    return {isError : false, isSuccess : !isNullOrUndefined(element), message : null, value : element};
}


import {isNullOrUndefined} from "./utils";

export interface Result<TResult, TError>{
    isSuccess: boolean;
    isError: boolean;
    value: TResult;
    message: TError;
}

export function getError<TResult, TError>(error: TError): Result<TResult, TError> {
    return {isError : true, isSuccess : false,  message : error, value : null};
}

export function getResult<TResult>(element: TResult): Result<TResult, any> {
    return {isError : false, isSuccess : !isNullOrUndefined(element), message : null, value : element};
}

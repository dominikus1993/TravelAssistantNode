import {isNullOrUndefined} from "./utils";

export interface Result<T>{
    isSuccess : boolean;
    value : T;
}

export function getResult<T>(element : T) : Result<T>{
    return {isSuccess : !isNullOrUndefined(element), value : element};
}
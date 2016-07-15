/**
 * Created by dominik.kotecki on 15-07-2016.
 */

export interface Result<T>{
    isSuccess : boolean;
    value : T;
}

export function getResult<T>(element : T) : Result<T>{
    return {isSuccess : (element != undefined && element != null), value : element};
}
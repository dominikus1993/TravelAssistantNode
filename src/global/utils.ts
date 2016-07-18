import * as crypto from "crypto-js"

const secret_key = "123456789";

export function isNullOrUndefined(element : any) : boolean{
    return element == null;
}

export function encrypt(text : string) : string{
    return crypto.MD5(text, secret_key).toString();
}
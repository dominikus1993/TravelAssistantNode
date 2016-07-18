import * as crypto from "crypto-js"

const secret_key = "123456789";

export function isNullOrUndefined(element : any) : boolean{
    return element == null;
}

export function encrypt(text : string){
    return crypto.SHA256(text, secret_key);
}
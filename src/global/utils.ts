import * as crypto from "crypto-js"
import {secret} from "./config";

export function isNullOrUndefined(element : any) : boolean{
    return element == null;
}

export function encrypt(text : string) : string{
    return crypto.MD5(text, secret).toString();
}
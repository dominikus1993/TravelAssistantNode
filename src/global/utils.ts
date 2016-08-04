import {config} from "./config";
import * as crypto from "crypto-js";

export function isNullOrUndefined(element: any): boolean {
    return element == null;
}

export function encrypt(text: string): string {
    return crypto.MD5(text, config.secret).toString();
}

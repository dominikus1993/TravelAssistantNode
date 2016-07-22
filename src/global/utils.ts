/// <reference path="../../typings/index.d.ts" />
import {secret} from "./config";
import * as crypto from "crypto-js";

export function isNullOrUndefined(element: any): boolean {
    return element == null;
}

export function encrypt(text: string): string {
    return crypto.MD5(text, secret).toString();
}

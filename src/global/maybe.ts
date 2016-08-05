import { isNullOrUndefined } from "./utils";

export interface Maybe<T> {
    flatMap<U>(fn: (el: T) => U): Maybe<U>;
    bind<U>(fn: (el: T) => Maybe<U>): Maybe<U>;
}


export class Just<T> implements Maybe<T> {

    constructor(private _value: T) {
    }

    public get value(): T{
        return this._value;
    }

    public bind<U>(fn: (el: T) => Just<U>): Just<U> {
        return fn(this._value);
    }

    public flatMap<U>(fn: (el: T) => U): Just<U> {
        return new Just(fn(this._value));
    }
}

export class None<T> implements Maybe<T> {
    public bind<U>(fn: (el: T) => Just<U>): None<U> {
        return new None();
    }

    public flatMap<U>(fn: (el: T) => U): None<U> {
        return new None();
    }
}

export function isNone<T>(maybe: Maybe<T>): maybe is None<T> {
    return maybe instanceof None;
}

export function isJust<T>(maybe: Maybe<T>): maybe is Just<T> {
    return (maybe as Just<T>).value !== undefined;
}

export function setValue<T>(value: T): Maybe<T> {
    if (isNullOrUndefined(value)) {
        return new None();
    }
    return new Just(value);
}

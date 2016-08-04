import { isNullOrUndefined } from "./utils";

export interface Functor<T> {
    fmap<U>(fn: (el: T) => U): Functor<U>;
}

export interface Monad<T> extends Functor<T> {
    bind<U>(fn: (el: T) => Monad<U>): Monad<U>;
}

export interface Maybe<T> extends Monad<T> {

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

    public fmap<U>(fn: (el: T) => U): Just<U> {
        return new Just(fn(this._value));
    }
}

export class None<T> implements Maybe<T> {
    public bind<U>(fn: (el: T) => Just<U>): None<U> {
        return new None();
    }

    public fmap<U>(fn: (el: T) => U): None<U> {
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

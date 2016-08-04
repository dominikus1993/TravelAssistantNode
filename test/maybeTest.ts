///<reference path="../typings/index.d.ts"/>
import {Just, Maybe, isJust, isNone, setValue} from "../src/global/maybe";

describe("test for maybe monad", () => {
    describe("null", () => {
        const val = setValue(null);

        it("should be None", () => {
            expect(isNone(val)).toBeTruthy();
            expect(isJust(val)).toBeFalsy();
        });
    });

    describe("undefined", () => {
        const val = setValue(undefined);

        it("should be None", () => {
            expect(isNone(val)).toBeTruthy();
            expect(isJust(val)).toBeFalsy();
        });
    });

    describe("string", () => {
        const val = setValue("dominik");

        it("should be Just a string", () => {
            expect(isNone(val)).toBeFalsy();
            expect(isJust(val)).toBeTruthy();
            expect(((val as Just<string>)).value).toEqual("dominik");
        });
    });

    describe("object", () => {
        const val = setValue({ test: "dominik" });

        it("should be Just a string", () => {
            expect(isNone(val)).toBeFalsy();
            expect(isJust(val)).toBeTruthy();
            expect(((val as Just<{ test: string }>)).value.test).toEqual("dominik");
        });
    });

    describe("number", () => {
        const val = setValue(23);

        it("should be Just a string", () => {
            expect(isNone(val)).toBeFalsy();
            expect(isJust(val)).toBeTruthy();
            expect(((val as Just<number>)).value).toEqual(23);
        });
    });


    describe("bind none", () => {
        const val = setValue(null).bind(x => x);

        it("should be still None", () => {
            expect(isNone(val)).toBeTruthy();
            expect(isJust(val)).toBeFalsy();
        });
    });

    describe("bind number to string", () => {
        const val = setValue(23).bind(x => setValue(x.toString()));

        it("should be Just a string", () => {
            expect(isNone(val)).toBeFalsy();
            expect(isJust(val)).toBeTruthy();
            expect(((val as Just<string>)).value).toEqual("23");
        });
    });

    describe("fmap none", () => {
        const val = setValue(null).bind(x => x);

        it("should be still None", () => {
            expect(isNone(val)).toBeTruthy();
            expect(isJust(val)).toBeFalsy();
        });
    });

    describe("fmap number to string", () => {
        const val = setValue(23).fmap(x => x.toString());

        it("should be Just a string", () => {
            expect(isNone(val as Maybe<string>)).toBeFalsy();
            expect(isJust(val as Maybe<string>)).toBeTruthy();
            expect(((val as Just<string>)).value).toEqual("23");
        });
    });
});

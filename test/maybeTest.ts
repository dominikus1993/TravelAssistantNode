///<reference path="../typings/index.d.ts"/>
import {Just, isJust, isNone, setValue} from "../src/global/maybe";

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
        const val = setValue({test: "dominik"});

        it("should be Just a string", () => {
            expect(isNone(val)).toBeFalsy();
            expect(isJust(val)).toBeTruthy();
            expect(((val as Just<{test: string}>)).value.test).toEqual("dominik");
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
});
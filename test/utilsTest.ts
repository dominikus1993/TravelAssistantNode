///<reference path="../typings/index.d.ts"/>
import {getError, getResult} from "../src/global/result";
import {isNullOrUndefined} from "../src/global/utils";

describe("test utils functions", () => {
    describe("test function that recognize if value is null or undefined", () => {
        it("value is null", () => {
            expect(isNullOrUndefined(null)).toBeTruthy();
        });

        it("value is undefined", () => {
            expect(isNullOrUndefined(undefined)).toBeTruthy();
        });

        it("value is not null", () => {
            expect(isNullOrUndefined(2)).toBeFalsy();
        });
    });

    describe("test function that generate result", () => {
        describe("put null to getResult function", () => {
            const testResult = getResult(null);
            it("isSuccess should be false", () => {
                expect(testResult.isSuccess).toBeFalsy();
            });
            it("isError should be false", () => {
                expect(testResult.isError).toBeFalsy();
            });
            it("value should be null", () => {
                expect(testResult.value).toBeNull();
            });
            it("message should be null", () => {
                expect(testResult.message).toBeNull();
            });
        });

        describe("put undefined to getResult function", () => {
            const testResult = getResult(undefined);
            it("isSuccess should be false", () => {
                expect(testResult.isSuccess).toBeFalsy();
            });
            it("isError should be false", () => {
                expect(testResult.isError).toBeFalsy();
            });
            it("value should be undefined", () => {
                expect(testResult.value).toBeUndefined();
            });
            it("message should be null", () => {
                expect(testResult.message).toBeNull();
            });
        });

        describe("put real value to getResult function", () => {
            const testResult = getResult(2);
            it("isSuccess should be true", () => {
                expect(testResult.isSuccess).toBeTruthy();
            });
            it("isError should be false", () => {
                expect(testResult.isError).toBeFalsy();
            });
            it("value should be false", () => {
                expect(testResult.value).toEqual(2);
            });
            it("message should be null", () => {
                expect(testResult.message).toBeNull();
            });
        });

        describe("put error to getError message function", () => {
            const testResult = getError(new Error("Unathorized access"));
            it("isSuccess should be true", () => {
                expect(testResult.isSuccess).toBeFalsy();
            });
            it("isError should be false", () => {
                expect(testResult.isError).toBeTruthy();
            });
            it("value should be null", () => {
                expect(testResult.value).toBeNull();
            });
            it("message should not be null", () => {
                expect(testResult.message).not.toBeNull();

                it("error message should not be null", () => {
                    expect(testResult.message).not.toBeNull();
                });
            });
        });
    });
});

///<reference path="../typings/index.d.ts"/>
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
});

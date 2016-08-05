import { Reservation } from "../src/reservation/model";
import { countBusySlots } from "../src/reservation/service";

describe("counting busy slots tests", () => {
    describe("two in one out", () => {
        const reservations = [{ date: new Date(), travel: "123456", travelType: "IN", user: "dshhfsd" }
            , { date: new Date(), travel: "123456", travelType: "IN", user: "dshhfsd" }
            , { date: new Date(), travel: "123456", travelType: "OUT", user: "dshhfsd" }];

        it("ratio should equal 1", () => {
            const result = countBusySlots(reservations as any);
            expect(result).toEqual(1);
        });
    });

    describe("one in one out", () => {
        const reservations = [{ date: new Date(), travel: "123456", travelType: "IN", user: "dshhfsd" }
            , { date: new Date(), travel: "123456", travelType: "OUT", user: "dshhfsd" }];

        it("ratio should equal 0", () => {
            const result = countBusySlots(reservations as any);
            expect(result).toEqual(0);
        });
    });

    describe("three in zero out", () => {
        const reservations = [{ date: new Date(), travel: "123456", travelType: "IN", user: "dshhfsd" }
            , { date: new Date(), travel: "123456", travelType: "IN", user: "dshhfsd" }
            , { date: new Date(), travel: "123456", travelType: "IN", user: "dshhfsd" }];

        it("ratio should equal 3", () => {
            const result = countBusySlots(reservations as any);
            expect(result).toEqual(3);
        });
    });
});

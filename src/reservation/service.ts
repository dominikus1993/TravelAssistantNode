import {Travel} from "../travel/model";
import {ITravelRepository} from "../travel/repository";
import {Result, getError, getResult} from "../global/result";
import {Reservation} from "./model";
import {IReservationRepository} from "./repository";
import Promise = require("bluebird");
import * as R from "ramda";

export function countBusySlots(reservations: Reservation[]): number {
    if (!R.isEmpty(reservations)){
        const [_in, out] =  reservations.map(x => x.travelType).reduce(([_in, out], x) => {
            if (x === "IN") {
                return [_in + 1, out]
            }
            return [_in, out + 1];
        }, [0, 0]);

        return _in - out;
    }
    return 0;
}

export interface IReservationService {
    reserve(reservation: Reservation): Promise<any>;
    findByTravelId(id: string): Promise<Result<Reservation[], Error>>;
}

export class ReservationService implements IReservationService {

    constructor(private respository: IReservationRepository, private travelRepository: ITravelRepository) {

    }

    public reserve(reservation: Reservation): Promise<Result<any, Error>> {
        const travelPromise = this.travelRepository.findBy({ _id: reservation.travel });
        const reservationPromise = this.respository.findBy({ travel: reservation.travel });

        return Promise.all([travelPromise, reservationPromise])
            .then(([travels, reservations]: [Travel[], Reservation[]]) => {
                if (R.isArrayLike(travels) && R.isArrayLike(reservations) && !R.isEmpty(travels)) {
                    const travel = R.head(travels);
                    if (travel.placeLimit > countBusySlots(reservations)) {
                        return Promise.resolve(this.respository.save(reservation));
                    }
                    return Promise.reject(getError(new Error("Place limit")));
                }
                return Promise.reject(getError(new Error("Travel not exist")));
            }, rejected => {
                return Promise.reject(getError(new Error(rejected)));
            }).then(fulfilled => {
                return Promise.resolve(getResult(fulfilled));
            });
    }

    public findByTravelId(id: string): Promise<Result<Reservation[], Error>> {
        return this.respository.findBy({travel: id}).then((fulfilled: Reservation[]) => {
            return getResult(fulfilled);
        }, rejected => {
            return getError(new Error(rejected));
        });
    }
}

import {Travel} from "../travel/model";
import {ITravelRepository} from "../travel/repository";
import {Result, getError, getResult} from "../global/result";
import {Reservation} from "./model";
import {IReservationRepository} from "./repository";
import Promise = require("bluebird");

export interface IReservationService {
    save(reservation: Reservation): Promise<any>;
}

export class ReservationService implements IReservationService {

    constructor(private respository: IReservationRepository, private travelRepository: ITravelRepository) {

    }

    public save(reservation: Reservation): Promise<Result<any, Error>> {
        const travelPromise = this.travelRepository.findBy({ _id: reservation.travel });
        const reservationPromise = this.respository.findBy({ travel: reservation.travel });

        return Promise.all([travelPromise, reservationPromise])
            .then(([travels, reservations]: [Travel[], Reservation[]]) => {
                if (R.isArrayLike(travels) && R.isArrayLike(reservations) && !R.isEmpty(travels)) {
                    const travel = R.head(travels);
                    if (travel.placeLimit > reservations.length) {
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

}

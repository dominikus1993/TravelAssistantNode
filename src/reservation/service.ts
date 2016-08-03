import {Result, getError, getResult} from "../global/result";
import {ITravelRepository} from "../travel/repository";
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
        return null;
        // return this.respository.save(reservation).then(fulfilled => {
        //     return getResult(fulfilled);
        // }, rejected => {
        //     return getError(new Error(rejected));
        // });
    }

}

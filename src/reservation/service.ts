import Promise = require("bluebird");
import {getError, getResult, Result} from "../global/result";
import {IReservationRepository} from "./repository";
import {Reservation} from "./model";


export interface IReservationService {
    save(reservation: Reservation): Promise<any>;
}

export class ReservationService implements IReservationService {

    constructor(private respository: IReservationRepository) {

    }

    public save(reservation: Reservation): Promise<Result<any, Error>> {
        return this.respository.save(reservation).then(fulfilled => {
            return getResult(fulfilled);
        }, rejected => {
            return getError(new Error(rejected));
        });
    }

};

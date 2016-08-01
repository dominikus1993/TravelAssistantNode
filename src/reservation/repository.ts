import {encrypt} from "../global/utils";
import {Reservation} from "./model";
import * as Promise from "bluebird";
import {Model}  from "mongoose";

export interface IReservationRepository {
    save(data: Reservation): Promise<Reservation>;
}

export class ReservationRepository implements IReservationRepository {

    constructor(private model: Model<Reservation>){

    }

    save(data: Reservation): Promise<Reservation> {
        return new this.model(data).save() as any as Promise<Reservation>;
    }
};

import {Reservation} from "./model";
import * as Promise from "bluebird";
import {Model}  from "mongoose";

export interface IReservationRepository {
    save(data: Reservation): Promise<Reservation>;
    findBy(by: Object): Promise<Reservation[]>;
}

export class ReservationRepository implements IReservationRepository {

    constructor(private model: Model<Reservation>) {

    }

    public save(data: Reservation): Promise<Reservation> {
        return new this.model(data).save() as any as Promise<Reservation>;
    }

    public findBy(by: Object): Promise<Reservation[]> {
        return this.model.find(by).exec() as any as Promise<Reservation[]>;
    }
}
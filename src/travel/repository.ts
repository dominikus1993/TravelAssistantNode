import {Travel} from "./model";
import * as Promise from "bluebird";
import {Model}  from "mongoose";

export interface ITravelRepository {
    findAll(): Promise<Travel[]>;
    findBy(obj: Object): Promise<Travel[]>;
    save(travel: Travel): any;
}

export class TravelRepository implements ITravelRepository {

    constructor(private model: Model<Travel>) {

    }

    public findAll(): Promise<Travel[]> {
        return this.model.find({}).exec() as any as Promise<Travel[]>;
    }

    public findBy(obj: Object): Promise<Travel[]> {
        return this.model.find(obj).exec() as any as Promise<Travel[]>;
    }

    public save(travel: Travel) {
        return new this.model(travel).save();
    }
}

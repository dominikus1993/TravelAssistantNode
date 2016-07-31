import {Travel} from "./model";
import * as Promise from "bluebird";
import {Model}  from "mongoose";

export interface ITravelRepository {
    findAll(): Promise<Travel[]>;
    findBy(obj: Object): Promise<Travel[]>;
    save(travel: Travel): any;
    remove(travelId: string): Promise<{}>;
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

    public remove(travelId: string): Promise<{}> {
        return this.model.remove({_id : travelId}).exec() as any as Promise<{}>;
    }
}

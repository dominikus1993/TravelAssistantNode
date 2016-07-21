/// <reference path="../../typings/index.d.ts" />
import Promise = require("~mongoose~mpromise/index");
import {Travel} from "./model";
import {Model} from "~mongoose/index";

export interface ITravelRepository {
    findAll(): Promise<Travel[]>;
    findBy(obj: Object): Promise<Travel[]>;
    save(travel: Travel): any;
}

export class TravelRepository implements ITravelRepository {

    constructor(private model: Model<Travel>) {

    }

    public findAll(): Promise<Travel[]> {
        return this.model.find({}).exec();
    }

    public findBy(obj: Object): Promise<Travel[]> {
        return this.model.find(obj).exec();
    }

    public save(travel: Travel) {
        return new this.model(travel).save();
    }
}

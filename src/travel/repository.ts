///<reference path="../../typings/index.d.ts"/>
import Promise = require("~mongoose~mpromise/index");
import {Travel} from "./model";
import {Model} from "~mongoose/index";


export interface ITravelRepository{
    findAll() : Promise<Travel[]>;
    findBy(obj : Object) : Promise<Travel[]>;
}

export class TravelRepository implements ITravelRepository{

    constructor(private model: Model<Travel>){

    }

    public findAll() : Promise<Travel[]>{
        return this.model.find({}).exec()
    }

    public findBy(obj : Object) : Promise<Travel[]>{
        return this.model.find(obj).exec();
    }
}
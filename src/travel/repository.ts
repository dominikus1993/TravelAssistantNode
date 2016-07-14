///<reference path="../../typings/index.d.ts"/>
import {Document, Schema, model}  from "mongoose"
import Promise = require("~mongoose~mpromise/index");
import {Travel} from "./model";
import {Model} from "~mongoose/index";


export interface ITravelRepository{
    findAll() : Promise<Travel[]>
}

export class TravelRepository implements ITravelRepository{

    constructor(private model: Model<Travel>){

    }

    public findAll() : Promise<Travel[]>{
        return this.model.find({}).exec()
    }
}
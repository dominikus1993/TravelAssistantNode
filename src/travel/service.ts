import Promise = require("~mongoose~mpromise/index");
import {Travel} from "./model";
import {Model} from "~mongoose/index";
import {ITravelRepository} from "./repository";

export interface ITravelService{

}

export class TravelService{
    constructor(private repository: ITravelRepository){

    }

    public findAll() : Promise<Travel[]>{
        return this.repository.findAll();
    }

    public findBy(obj : Object) : Promise<Travel[]>{
        return this.model.find(obj).exec();
    }
}
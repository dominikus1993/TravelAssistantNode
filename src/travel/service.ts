import PromiseM = require("~mongoose~mpromise/index");
import Promise = require("bluebird");
import {Travel} from "./model";
import {Model} from "~mongoose/index";
import {ITravelRepository} from "./repository";
import {Result, getResult} from "../global/result";

export interface ITravelService{
    findAll() : Promise<Result<Travel[]>>;
    findBy(obj : Object) : Promise<Result<Travel[]>>;
}

export class TravelService{
    constructor(private repository: ITravelRepository){

    }

    public findAll() : Promise<Result<Travel[]>>{
        return new Promise((resolve : (val : Result<Travel[]>) => void) => {
            this.repository.findAll().then((res) => {
                resolve(getResult(res))
            });
        });
    }

    public findBy(obj : Object) : Promise<Result<Travel[]>>{
        return new Promise((resolve : (val : Result<Travel[]>) => void) => {
            this.repository.findBy(obj).then((res) => {
                resolve(getResult(res))
            });
        });
    }
}
///<reference path="../../typings/index.d.ts"/>
import {TravelService} from "./service";
import {TravelRepository} from "./repository";
import {travelModel} from "./model";
import Promise = require("bluebird");
import {User} from "../users/model";

const service = new TravelService(new TravelRepository(travelModel));

export function all(req, res, next){
    service.findAll().then((result) => {
        res.status(200).json(result).end();
    }).catch(error => {
        res.status(400).json(error).end();
    });
}

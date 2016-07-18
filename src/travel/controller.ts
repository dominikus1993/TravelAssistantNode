///<reference path="../../typings/index.d.ts"/>
import {TravelService} from "./service";
import {TravelRepository} from "./repository";
import {travelModel} from "./model";
import Promise = require("bluebird");

const service = new TravelService(new TravelRepository(travelModel));

export function all(req, res, next){
    service.findAll().then((result) => {
        res.status(result.isSuccess ? 200 : 500).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
}

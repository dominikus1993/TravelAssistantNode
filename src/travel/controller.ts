///<reference path="../../typings/index.d.ts"/>
import {Router} from 'express';
import * as expressservestaticcore from "express-serve-static-core"
import {TravelService} from "./service";
import {TravelRepository} from "./repository";
import {travelModel} from "./model";
import Promise = require("bluebird");

const travel = Router();
const service = new TravelService(new TravelRepository(travelModel));

travel.get("/all", (req, res, next) => {
    service.findAll().then((result) => {
       res.status(result.isSuccess ? 200 : 500).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
});

export default travel;
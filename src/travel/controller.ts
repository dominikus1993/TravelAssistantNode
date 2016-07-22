import * as status  from "../global/constants";
import {Result} from "../global/result";
import {User} from "../users/model";
import {Travel, travelModel} from "./model";
import {TravelRepository} from "./repository";
import {TravelService} from "./service";

const service = new TravelService(new TravelRepository(travelModel));

export function all(req, res, next) {
    service.findAll().then((result) => {
        res.status(status.OK).json(result).end();
    }).catch(error => {
        res.status(status.NOT_FOUND).json(error).end();
    });
}

export function create(req, res, next) {
    const user: User = req.user || {};
    const travel: Travel = req.body;
    travel.owner = user;
    service.save(travel).then((fullfilled: Result<Travel>) => {
        res.status(status.CREATED).json(fullfilled).end();
    }, rejected => {
        res.status(status.NOT_FOUND).json(rejected).end();
    }).catch(error => {
        res.status(status.NOT_FOUND).json(error).end();
    });
}

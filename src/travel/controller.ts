import {travelModel} from "./model";
import {TravelRepository} from "./repository";
import {TravelService} from "./service";

const service = new TravelService(new TravelRepository(travelModel));

export function all(req, res, next) {
    service.findAll().then((result) => {
        res.status(200).json(result).end();
    }).catch(error => {
        res.status(400).json(error).end();
    });
}

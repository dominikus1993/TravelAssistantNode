import {Result, getError, getResult} from "../global/result";
import {Travel} from "./model";
import {ITravelRepository} from "./repository";
import * as Promise from "bluebird";

export interface ITravelService {
    findAll(): Promise<Result<Travel[], Error>>;
    findBy(obj: Object): Promise<Result<Travel[], Error>>;
    save(travel: Travel): any;
}

export class TravelService implements ITravelService {

    constructor(private repository: ITravelRepository) {

    }

    public findAll(): Promise<Result<Travel[], Error>> {
        return Promise.resolve(this.repository.findAll()).then((res) => {
            return getResult(res);
        });
    }

    public findBy(obj: Object): Promise<Result<Travel[], Error>> {
        return Promise.resolve(this.repository.findBy(obj)).then((res) => {
            return getResult(res);
        });
    }

    public save(travel: Travel): any {
        return Promise.resolve(this.repository.save(travel)).then(fullfiled => {
            return getResult(fullfiled);
        }, rejected => {
            return getError(rejected);
        });
    }
}

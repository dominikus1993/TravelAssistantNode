import Promise = require("bluebird");
import {Travel} from "./model";
import {ITravelRepository} from "./repository";
import {Result, getResult} from "../global/result";

export interface ITravelService {
    findAll(): Promise<Result<Travel[]>>;
    findBy(obj: Object): Promise<Result<Travel[]>>;
    save(travel: Travel): any;
}

export class TravelService implements ITravelService {

    constructor(private repository: ITravelRepository) {

    }

    public findAll(): Promise<Result<Travel[]>> {
        return Promise.resolve(this.repository.findAll()).then((res) => {
            return getResult(res);
        });
    }

    public findBy(obj: Object): Promise<Result<Travel[]>> {
        return Promise.resolve(this.repository.findBy(obj)).then((res) => {
            return getResult(res);
        });
    }

    public save(travel: Travel): any {
        return Promise.resolve(this.repository.save(travel));
    }
}

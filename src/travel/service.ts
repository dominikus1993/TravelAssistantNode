import {Result, getError, getResult} from "../global/result";
import {User} from "../users/model";
import {Travel} from "./model";
import {ITravelRepository} from "./repository";
import * as Promise from "bluebird";
import * as R from "ramda";

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

    public remove(travel: Travel, user: User): Promise<Result<boolean, Error>> {
        return Promise.resolve(this.repository.findBy({_id: travel._id})).then((fullfiled: Travel[]) => {
            if (!R.isEmpty(fullfiled)) {
                const travelToRm = R.head(fullfiled);
                if (travelToRm.ownerId === (user._id as any)) {
                    return Promise.resolve(travelToRm);
                } else {
                    return Promise.reject(getError("Unathorized access"));
                }
            } else {
                return Promise.reject(getError(new Error("Can't find travel")));
            }
        }).then((fullfiled: Travel) => {
            return this.repository.remove({_id: fullfiled._id});
        }).then((fullfiled: any) => {
            return Promise.resolve(getResult(fullfiled));
        });
    }
}

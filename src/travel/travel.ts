///<reference path="../../typings/index.d.ts"/>

export module TravelAssistant.Travel.Models{
    import * as mongoose from "mongoose"
    import User = TravelAssistant.Users.Models.User;

    export interface Travel extends mongoose.Document {
        from : string;
        to : string;
        date : Date;
        owner : User;
        passengers : Reservation[];
        placeLimit : number;
    }

    export interface Reservation extends mongoose.Document{
        user : User;
        date : Date;
        type : ReservationType;
    }

    export enum ReservationType{
        In,
        Out
    }
}
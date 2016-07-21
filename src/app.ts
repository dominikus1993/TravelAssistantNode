/// <reference path="../typings/index.d.ts" />
import {Request, Response} from "express";
import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose"
import Promise = require("bluebird");
import router from "./global/router";
import {mongoDbUrl} from "./global/config";
mongoose.Promise = Promise as any;
mongoose.connect(mongoDbUrl);


var app = express();

//noinspection TypeScriptValidateTypes
app.use(logger("dev" as any) as any);
//noinspection TypeScriptValidateTypes
app.use(bodyParser.json());
//noinspection TypeScriptValidateTypes
app.use(bodyParser.urlencoded({ extended: true }));
//noinspection TypeScriptValidateTypes
app.use(cookieParser());
//noinspection TypeScriptValidateTypes
app.use("/api", router);
//noinspection TypeScriptValidateTypes
app.use((req: Request, res: Response, next: Function) => {
    var err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

//noinspection TypeScriptValidateTypes
if (app.get("env") === "development") {
    //noinspection TypeScriptValidateTypes
    app.use(function(err: any, req: Request, res: Response, next: Function) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

//noinspection TypeScriptValidateTypes
app.use(function(err: any, req: Request, res: Response, next: Function) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
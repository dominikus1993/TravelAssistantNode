import Promise = require("bluebird");
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import {Request, Response} from "express";
import * as express from "express";
import * as mongoose from "mongoose";
import * as logger from "morgan";
import * as path from "path";
import {mongoDbUrl} from "./global/config";
import {getError} from "./global/result";
import router from "./global/router";

mongoose.Promise = Promise as any;
mongoose.connect(mongoDbUrl);

const app = express();

// noinspection TypeScriptValidateTypes
app.use(logger("dev" as any) as any);
// noinspection TypeScriptValidateTypes
app.use(bodyParser.json());
// noinspection TypeScriptValidateTypes
app.use(bodyParser.urlencoded({ extended: true }));
// noinspection TypeScriptValidateTypes
app.use(cookieParser());
// noinspection TypeScriptValidateTypes
app.use("/api", router);
// noinspection TypeScriptValidateTypes
app.use((req: Request, res: Response, next: Function) => {
    let err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

// noinspection TypeScriptValidateTypes
if (app.get("env") === "development") {
    // noinspection TypeScriptValidateTypes
    app.use(function(err: any, req: Request, res: Response, next: Function) {
        res.status(err.status || 500);
        res.json(getError(err));
    });
}

// noinspection TypeScriptValidateTypes
app.use(function(err: any, req: Request, res: Response, next: Function) {
    res.status(err.status || 500);
    res.json(getError(err));
});

module.exports = app;

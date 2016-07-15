/// <reference path="../typings/index.d.ts" />
import {Request, Response} from "express";
import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import travel from "./travel/controller"
import * as mongoose from "mongoose"
import Promise = require("bluebird");

mongoose.Promise = Promise as any;
mongoose.connect("mongodb://localhost/travelAssistant");


var app = express();

app.use(logger("dev" as any));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use("/api/travel", travel);


app.use((req: Request, res: Response, next: Function) => {
    var err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});


if (app.get("env") === "development") {
    app.use(function(err: any, req: Request, res: Response, next: Function) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: Request, res: Response, next: Function) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});


module.exports = app;
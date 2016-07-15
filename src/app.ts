/// <reference path="../typings/index.d.ts" />
import {Request, Response} from "express";
import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import travel = require("./travel/controller")

var app = express();

app.use(logger(<any>"dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

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
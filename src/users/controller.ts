/**
 * Created by domin on 15.07.2016.
 */
///<reference path="../../typings/index.d.ts"/>
import {Router} from 'express';
import * as expressservestaticcore from "express-serve-static-core"
import * as mongoose from "mongoose"
import Promise = require("bluebird");
import {UserService} from "./service";
import {UserReposiitory} from "./repository";
import {userModel, loginDataModel} from "./model";

const user = Router();

const service = new UserService(new UserReposiitory(userModel, loginDataModel));

export default user;


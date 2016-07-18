///<reference path="../../typings/index.d.ts"/>
import * as expressservestaticcore from "express-serve-static-core"
import {all} from "../travel/controller"
import {register} from  "../users/controller"
import {Router} from "express";

const router = Router();

router.get("/travel/all", all);

router.post("/user/register", register);

export default router;


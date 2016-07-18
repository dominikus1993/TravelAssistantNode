///<reference path="../../typings/index.d.ts"/>
import * as expressservestaticcore from "express-serve-static-core"
import {all} from "../travel/controller"
import {register, login} from  "../users/controller"
import {Router} from "express";

const router = Router();

router.get("/travel/all", all);

//Auth
router.post("/user/register", register);

router.post("/user/login", login);

export default router;


///<reference path="../../typings/index.d.ts"/>
import * as expressservestaticcore from "express-serve-static-core"
import {all} from "../travel/controller"
import {register, login, checkAuth} from  "../users/controller"
import {Router} from "express";

const router = Router();

router.get("/travel/all", all);

//Auth
router.post("/user/register", register);

router.post("/user/login", login);

router.post("/user/check", checkAuth);

export default router;

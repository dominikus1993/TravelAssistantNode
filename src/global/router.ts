import {all} from "../travel/controller";
import {checkAuth, login, register} from  "../users/controller";
import {Router} from "express";
import * as expressservestaticcore from "express-serve-static-core";

const router = Router();

router.get("/travel/all", [checkAuth, all]);

// Auth
router.post("/user/register", register);

router.post("/user/login", login);

export default router;

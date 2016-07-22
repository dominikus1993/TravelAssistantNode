import {all, create} from "../travel/controller";
import {checkAuth, login, register} from  "../users/controller";
import {Router} from "express";

const router = Router();

router.get("/travel/all", [checkAuth, all]);
router.post("/travel/create", [checkAuth, create]);

// Auth
router.post("/user/register", register);

router.post("/user/login", login);

export default router;

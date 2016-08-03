import {all, create} from "../travel/controller";
import {checkAuth, login, register} from  "../users/controller";
import {Router} from "express";

const router = Router();

router.get("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin" , "*" );
    next(); // http://expressjs.com/guide.html#passing-route control
});

router.get("/travel/all", all);
router.post("/travel/create", [checkAuth, create]);

// Auth
router.post("/user/register", register);

router.post("/user/login", login);

export default router;

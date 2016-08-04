import {all, create} from "../travel/controller";
import {checkAuth, login, register} from  "../users/controller";
import {Router} from "express";

const router = Router();

router.get("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true")
    next(); // http://expressjs.com/guide.html#passing-route control
});

router.get("/travel/all", all);
router.post("/travel/create", [checkAuth, create]);

// Auth
router.post("/user/register", register);

router.post("/user/login", login);

export default router;

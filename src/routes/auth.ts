import { Router } from "express";
import { checkJwt } from "../middlewares/jwt";
import AuthController from "../controller/AuthController";

const router = Router();

//login
router.post('/login',AuthController.login);

//Change Passowrd
router.post('/change-password',[checkJwt],AuthController.changePassword);





export default router;

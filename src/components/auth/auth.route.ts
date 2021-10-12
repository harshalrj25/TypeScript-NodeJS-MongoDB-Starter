import { Response, Request, NextFunction, Router } from "express";
const router = Router();
import * as authController from "./auth.controller";

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signout", authController.signOut);

export let routes = router;

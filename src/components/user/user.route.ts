"use strict";
import { Router } from "express";
const router = Router();
import * as userController from "./user.controller";

router.get("/profile", userController.getProfileData);
export let routes = router;

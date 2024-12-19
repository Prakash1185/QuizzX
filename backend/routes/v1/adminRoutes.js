import { Router } from "express";
import { adminLogin ,adminRegister } from "../../controllers/v1/adminController.js";
import { adminRegisterValidator } from './../../validation/v1/adminValidator.js';

const adminRouter = Router();

// route to register admin
// adminRouter.post("/register", adminRegisterValidator,adminRegister);

// route to login admin
adminRouter.post("/login", adminLogin);



export default adminRouter;
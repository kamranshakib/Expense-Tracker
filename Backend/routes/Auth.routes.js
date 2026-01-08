import experss from "express"
const Router = experss.Router();
import * as authController from "../controller/auth.controller.js"
import { protect } from "../middleware/Auth.middleware.js";

Router.get("/login",authController.loginUser)
Router.post("/register",authController.registerUser)
Router.get("/getUser",protect,authController.userInfo)

 
export default Router
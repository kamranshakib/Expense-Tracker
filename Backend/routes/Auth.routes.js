import experss from "express"
const Router = experss.Router();
import * as authController from "../controller/auth.controller.js"

Router.get("/login",authController.loginUser)
Router.post("/register",authController.registerUser)
Router.get("/getUser",authController.userInfo)


export default Router
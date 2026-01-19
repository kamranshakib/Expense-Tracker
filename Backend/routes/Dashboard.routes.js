import express from "express"
import {getDashboardData} from "../controller/dashboard.controller.js"
import { protect } from "../middleware/Auth.middleware.js"


const Router = express.Router()
Router.get("/",protect, getDashboardData)

export default Router;
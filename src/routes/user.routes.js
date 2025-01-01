import {Router} from "express"; // Router, express k through hi ayega
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(   // post() is a middleware here
    upload.fields([
         {
            name: "avatar",  // frontend field should also be named as "avatar", communication required b/w frontend and backend engg
            maxCount: 1  // how much file to be accepted?
         },
         {
            name: "coverImage",
            maxCount: 1
         } 
    ]),
    registerUser
)
// router.route("/login").post(login)

export default router

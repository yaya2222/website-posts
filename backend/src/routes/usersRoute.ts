import * as UsersController from "../controllers/usersController"
import expres from "express"

const router = expres.Router()

router.get("/",UsersController.getAuthenticatedUser)

router.post("/signup",UsersController.signUp)

router.post("/login",UsersController.login)

router.post("/logout",UsersController.logout)

export default router
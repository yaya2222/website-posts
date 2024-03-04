import app from "./app"
import env from "./ulit/validateEnv"
import mongoose from "mongoose"

const port = env.PORT


mongoose.connect(env.MONGO_URL).then(
    () => {
        console.log("Mongoose connected")
        app.listen(port!, () => console.log(`Server is runnig on port: ${port}`))
    }
    )
    .catch((e)=>console.error(e))

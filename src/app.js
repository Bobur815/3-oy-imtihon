import express from "express"
import { connectDB } from "./config/database.js"
import path from "path"
import fileUpload from "express-fileupload"
import ErrorHandler from "./middleware/ErrorHandler.js"
import routes from "./routers/index.js"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 3000

app.use(fileUpload());
app.use(express.json())
app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));


routes.forEach(({ url, funk }) => {
    app.use(`/api${url}`, funk);
});

app.use(ErrorHandler)

await connectDB();
app.listen(PORT, () => console.log(`Server is running on ${PORT} PORT...`))


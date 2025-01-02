import express from "express";
import router from "./Routes/v1/index.js";
import 'dotenv/config';
import cors from "cors"


const app = express()
const PORT = 3000
// Allow all origins
app.use(cors());


app.use(express.json())


app.use("/api/v1", router)





app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})
import express, { urlencoded } from "express";
import nodemon from "nodemon";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";  
import connectdb from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js";


dotenv.config({});

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}))
const corsoption = {
    origin:'http://localhost:5173',
    credentials: true
}

app.use(cors(corsoption));
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.listen(PORT,()=>{
    connectdb();
    console.log(`server running on port ${PORT}`);
})
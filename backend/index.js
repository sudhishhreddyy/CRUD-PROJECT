import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoute from "./routes/employee.js";  // ✅ Fixed path

dotenv.config();
const app = express();
const PORT = 3000;

const corOptions = {
    origin: "*"
};

app.use(cors(corOptions));
app.use(bodyParser.json());

app.use("/api/employee", employeeRoute);

app.use(function(req,res){
    res.status(404).json({error:"Not found!"});
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({error: message});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

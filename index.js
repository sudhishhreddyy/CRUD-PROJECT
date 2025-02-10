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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

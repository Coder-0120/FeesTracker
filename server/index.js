const express=require("express");
const app=express();
const dotenv=require("dotenv");
const connectDB=require("./config/db");
dotenv.config();
const cors = require('cors');
const StudentRoute = require("./routes/StudentRoute");
const AdminRoute = require("./routes/AdminRoute");
const AlertRoute = require("./routes/AlertRoute");
const Verifytoken = require("./middlewares/Verifytoken");

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
connectDB();

app.get("/",(req,res)=>{
    console.log("Server is running");
    res.send("Hello World");
})
app.use("/api/student",StudentRoute);
app.use("/api/admin",AdminRoute);
app.use('/api/alerts', AlertRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

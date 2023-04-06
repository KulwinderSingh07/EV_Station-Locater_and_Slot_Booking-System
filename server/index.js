const express=require("express");

const app=express();
const cookieparser=require("cookie-parser")

const cors=require("cors");

const bodyparser=require("body-parser");

require("dotenv").config();
app.use(bodyparser.urlencoded({ extended: true }));
const PORT=process.env.PORT
require("./Connnection/db_connection")
app.use(cors());
app.use(cookieparser());
app.use(express.json())

app.use("/user",require("./Routes/login_and_signup"))
// app.use("/product",require("./Routes/product"))
// app.use("/cart",require("./Routes/cart"))
// app.use("/order",require("./Routes/order"))
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
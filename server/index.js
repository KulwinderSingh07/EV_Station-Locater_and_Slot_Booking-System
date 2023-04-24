const express=require("express");

const app=express();
const cookieparser=require("cookie-parser")

const cors=require("cors");

const bodyparser=require("body-parser");

require("dotenv").config();
app.use(cors());
app.use(express.json())
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
const PORT=process.env.PORT
app.use(express.urlencoded({extended:false}))
require("./Connnection/db_connection")

app.use("/user",require("./Routes/login_and_signup"))
app.use("/station",require("./Routes/Station_routes"))
app.use("/stripe",require("./Routes/stripe"))
// app.use("/product",require("./Routes/product"))
// app.use("/cart",require("./Routes/cart"))
// app.use("/order",require("./Routes/order"))
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
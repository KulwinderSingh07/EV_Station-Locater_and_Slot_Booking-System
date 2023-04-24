const express=require("express");
const {Stripe } = require("stripe");
const router=express.Router();
require("dotenv").config()
const stripe=Stripe(process.env.STRIPE_KEY)
router.post("/create-checkout-session", async (req, res) => {
    try{
    const data=req.body.slots
    // console.log(data)
    const session = await stripe.checkout.sessions.create({
      line_items:[
        {
            price_data:{
                currency:'INR',
                product_data:{
                    name:'Slot'
                },
                unit_amount:(data.price*100)
            },
            quantity:1,
        }
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    // res.redirect(303, session.url);
    if(session.url!=`${process.env.CLIENT_URL}/checkout-success`){
        // console.log(session.url)
        res.send({
            url:session.url,
            payed:false
        })
    }else{
    res.send({ url: session.url ,
        payed:true
    });
}
}catch(err){
    console.log(err.message)
    res.send({
        message:err.message
    })
}
  });
  
module.exports=router
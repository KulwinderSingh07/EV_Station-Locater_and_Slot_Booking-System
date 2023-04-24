import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert"
const PaymnetConfirmation = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        swal({
            title: "Booked",
            text: "Payment Successfull",
            icon: "success",
        })
        navigate("/Map")
    },[])
    return ( 
        <></>
     );
}
 
export default PaymnetConfirmation;
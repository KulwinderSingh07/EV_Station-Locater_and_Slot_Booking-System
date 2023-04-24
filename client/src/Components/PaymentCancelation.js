import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert"

const PaymentCancelation = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        swal({
            title: "OOPS!",
            text: "Error in Payment",
            icon: "error",
        })
        navigate("/Map")
    },[])
    return ( 
<></>
     );
}
 
export default PaymentCancelation;
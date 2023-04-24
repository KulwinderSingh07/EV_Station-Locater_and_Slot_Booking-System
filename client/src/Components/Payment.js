import axios from "axios";
import REQUEST_URL from "../Utils";
// import { useSelector } from "react-redux";
// import { url } from "../slices/api";
import { useNavigate } from "react-router-dom";
import GetCookie from "../Hooks/getCookie";
import swal from "sweetalert";

const PayButton = ({ slots,stationData }) => {
    console.log(slots)
    const navigate=useNavigate();
//   const user = useSelector((state) => state.auth);

const stationId=stationData._id
const slot_start_timing=slots.slot_start_timing
const updateslot=async()=>{
     console.log(stationId)
                const slotbookdata=await axios.patch(`http://localhost:3001/station/bookslot/${stationId}`,{
                    slot_start_timing,
                    Req_token:GetCookie()
                })
                console.log(slotbookdata)
                if(slotbookdata){
                    handleCheckout();
                }
}
const removeslot=async()=>{
    const slotbookdata=await axios.patch(`http://localhost:3001/station/removeslot/${stationId}`,{
        slot_start_timing
    })
    console.log(slotbookdata)
    if(slotbookdata.data.BookingRemoved==true){
        swal({
            title: "Booking Removed",
            text: "The booked slot has been removed",
            icon: "success",
        }).then(()=>{
            window.location.reload(false);
        })
    }
}
  const handleCheckout = () => {
    axios
      .post(`${REQUEST_URL}/stripe/create-checkout-session`, {
        slots,
      })
      .then(async (response) => {
            window.location.href=response.data.url
      })
      .catch((err) => console.log(err.message));
  };    

  return (
    <>
      <button classname={slots.booked?"Booked":"Book"} onClick={() => updateslot()}>{slots.booked?"Booked":"Book"}</button>
      <button onClick={()=>removeslot()}>Remove</button>
    </>
  );
};

export default PayButton;
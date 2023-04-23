import axios from "axios";
import REQUEST_URL from "../Utils";
// import { useSelector } from "react-redux";
// import { url } from "../slices/api";
import { useNavigate } from "react-router-dom";

const PayButton = ({ slots }) => {
    console.log(slots)
//   const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${REQUEST_URL}/stripe/create-checkout-session`, {
        slots,
      })
      .then((response) => {
        if (response.data.url) {
            console.log(response.data)
            window.location.href=response.data.url
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Pay Book</button>
    </>
  );
};

export default PayButton;
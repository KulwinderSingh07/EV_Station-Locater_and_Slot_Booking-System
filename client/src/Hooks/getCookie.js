import Cookie from "js-cookie"
const GetCookie = () => {
    // console.log(value)
    return ( 
        Cookie.get("loged")
     );
}
 
export default GetCookie;  
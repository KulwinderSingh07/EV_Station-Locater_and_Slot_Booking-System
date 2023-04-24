import Cookie from "js-cookie"
const SetCookie = ({value}) => {
    console.log(value)
    return ( 
        Cookie.set("loged",value)
     );
}
 
export default SetCookie;  
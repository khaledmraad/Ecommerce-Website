import logo from '../../logo.svg'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Header(props) {

  const navigate = useNavigate();

  function logMeOut() {

    axios({
      method: "POST",
      url:"http://localhost:5000/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  

    navigate('/');
  
  }

    return(
        <header className="App-header">
            <h1>this is a header </h1>  
            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}

export default Header;
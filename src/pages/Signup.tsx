
import Nav from "../components/Nav.js";
import { GiRobotAntennas } from "react-icons/gi";
import { useNavigate} from "react-router";
import { useState, useEffect , useRef} from 'react'
import axios from "axios";
export default function Signup(){
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const api = "http://167.99.83.1:5000";
  const navigate = useNavigate();
  function submit() {
      console.log(username)
      console.log(password)
      if (username === null || username.match(/^ *$/) !== null || password === null || password.match(/^ *$/) !== null){
        return;
      } 
    axios.post(api + '/api/signup', {
      username: username,
      password: password,
      email: email
    }).then(
      res => {
        if (res.status == 200) {
          alert('registration succeeded')
          navigate("/login")
        } else if (res.status== 500){
          alert("Username exists")
        }else {
          alert("an error has occured, please try again")
        }
      }
    ).catch(function (error) {
      alert('Please change the credentials you entered as it might be already taken')
    })
  }
  useEffect(() => {
    if (localStorage.getItem("token") != undefined) {
      navigate("/browse")
    }
  })
   


  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
    return(
        <div className="container">
             <br/>
           <Nav/>
           <br/>
           <center><h1>Welcome to Cartoonizer <GiRobotAntennas /></h1>
           <h4>Take a picture using our App and see how it becomes cartoonized using our advanced AI model!</h4>
           <br/>
           </center>
           <div className='container third-color'>
            <h2>Sign Up</h2>
            <h5>Sign Up now and get the chance to cartoonize your photos using our costomized web and mobile app</h5>
            <br/>
            <div className='row'>
      <div className='column'>
        <label>Username</label>
      <input placeholder='Username' onChange={handleUsername} />
      </div>
      <div className='column'>
        <label>Email</label>
      <input placeholder='Email' onChange={handleEmail} />
      </div>
    </div>
    <label>Password</label>
    <input placeholder='Password' type="password" onChange={handlePassword} />
    <br/>
    <br/>
  
           <button className='button button-black' onClick={submit} >Sign up</button>
           </div>
           <br/>
           <div className='container'>
            <div className='row'>
              <div className='column'>
                Address:<br/> Penglais Road,<br/> Aberystwyth,<br/> United Kingdom,<br/> SY23 3LH
              </div>
              <div className='column'>
                This a progressive web application<br/> that runs on ios and android<br/> as well as the web
              </div>
              <div className='column'>
                By signing up you agree to our terms and conditions
              </div>
            </div>
           </div>
           </div>

    )
}
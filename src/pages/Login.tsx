import Nav from "../components/Nav.js";
import { GiRobotAntennas } from "react-icons/gi";
import { useNavigate} from "react-router";
import { useState, useEffect , useRef} from 'react'
import axios from "axios";

export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const api = "http://167.99.83.1:5000";
    const navigate = useNavigate();

    const submit = () => {
        if (username === null || username.match(/^ *$/) !== null || password === null || password.match(/^ *$/) !== null){
            return;
          } 
        axios.post(api + "/api/login", {
            username: username,
            password: password
        }
        ).then(
            res => {
  
  
                if (res.status == 200 || res.status==201 || res.status==201) {
                    localStorage.setItem("userId",  res.data["userId"])
                    localStorage.setItem("token", res.data["token"])
                    navigate("/camera")
                } else {
  
                    alert("try logging in again, an error has occured")
                }
            }
        ).catch(
            function (error) {
                alert("internal server error")
            }
        )
    }
    useEffect(() => {
        if (localStorage.getItem("token") != undefined) {
            navigate("/browse")
        }
    })
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className="container">
            <br />
            <Nav />
            <br />
            <center><h1>Welcome to Cartoonizer <GiRobotAntennas /></h1>
                <h4>Take a picture using our App and see how it becomes cartoonized using our advanced AI model!</h4>
                <br />
            </center>
            <div className='container third-color'>
                <h2>Login</h2>
                <h5>Login now and get the chance to cartoonize your photos using our costomized web and mobile app</h5>
                <br />

                <label>Username</label>
                <input placeholder='Username' onChange={handleUsername}/>


                <label>Password</label>
                <input placeholder='Password' type="password" onChange={handlePassword}/>
                <br />
                <br />

                <button className='button button-black' onClick={submit} >Login</button>
            </div>
            <br />
            <div className='container'>
                <div className='row'>
                    <div className='column'>
                        Address:<br /> Penglais Road,<br /> Aberystwyth,<br /> United Kingdom,<br /> SY23 3LH   <br />
                    </div>

                    <div className='column'>
                        This a progressive web application that runs on ios and android as well as the web<br />
                    </div>
                    <div className='column'>
                        By signing up you agree to our terms and conditions<br />
                    </div>
                </div>
            </div>
        </div>
    )
}
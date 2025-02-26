
import { FaRobot } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useState, useEffect , useRef} from 'react'
export default function Nav() {
    const navigate = useNavigate()
    const [logged, setlogged] = useState(false)
  
    useEffect(() => {
      if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
          setlogged(false)
      } else {
          setlogged(true)
      }
  })
  const logout = () => {
      localStorage.clear()
      navigate("/")
  }
    return (
        <div className="container">
            <div className="row">
                <div className="column">
                    <h4 className="float-left">Catoonizer <FaRobot /></h4>
                </div>
                <div className="column">
                    <div className="box">
                        <div className="one">
                        <a onClick={()=>{navigate("/browse")}}> Browse</a>
                        </div>
                        <div className="one">
                        <a onClick={()=>{navigate("/camera")}}>Camera</a>
                        </div>
                        <div className="one">
                        <a onClick={()=>{navigate("/upload")}}>Upload</a>
                        </div>
                    </div>
                    
                </div>
                <div className="column">
                {logged == false ? <><div className="column"><button className="button button-light float-right" onClick={() => {navigate("/")}}>Signup</button>&nbsp;<button className="button button-black button-clear float-right" onClick={() => { navigate("/login")} }>Login </button></div></> : <div className="column"><button className="button button-light float-right" onClick={logout}>logout</button></div>}

                </div>
            </div>
        </div>
    )
}
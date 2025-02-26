import Nav from "../components/Nav.js"
import { useState, useEffect } from 'react'
import { useNavigate} from "react-router";
import { GiRobotAntennas } from "react-icons/gi";
import axios from "axios";
import FileSaver from "file-saver"
export default function Browse(){
    const api = "http://167.99.83.1:5000";

    const navigate = useNavigate()
    const [data, setData] = useState([
    ])
    const [res, setRes] = useState(data)
    const [checker, setChecker]= useState(false)
    const del = (id) =>{
        axios.post(
            api + "/api/photo/delete",{
                "id": id
            },   {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }}
        ).then(res =>{
            if (res.status == 200){
             setChecker(false)
            }
        })
    }
    const download = (id, name)=>{

         axios.post(
            api + "/api/photo/download", {
                "name": name,
                "id": id,
              
            }, 
            
            {responseType: 'arraybuffer',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then(  (res) =>{
            if (res.status== 200 || res.status == 201){
        
                var data =  res.data;
                var file = new Blob([data])
                FileSaver.saveAs(file, name)
             
            }
                   
            
        })
    }
 
      useEffect(() => {
        if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
            navigate("/login")
        } else {
            if (checker == false) {
                axios.get(api + "/api/photo/find", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(
                    response => {
                        if (response.status == 200 || response.status == 201) {
                            console.log(response.data.photos)
                            setRes(response.data.photos)
                            setData(response.data.photos)
                            console.log(data)
                            setChecker(true)
                        } else {
                            localStorage.clear()
                            alert("An error has occured, please try to refresh the page")
                        }
                    }
                )
            }
        }
    })
    const handleChange = (e) => {

        if (e.target.value == "") {
            setRes(data)
        } else {
            setRes(data.filter(item => item.name.includes(e.target.value)))
        }

    }
    return (
        <>
        <div className="container">
            <br/>
            <br/>
            <Nav />
            <br/>
            <div className='container '>
     <center><h2>Welcome to Cartoonizer <GiRobotAntennas /></h2>
                   <h4>Take a picture using our App and see how it becomes cartoonized using our advanced AI model!</h4>
                   <br />
               </center>
       </div>
    
       <div className="container third-color">
        <h2>Browse saved documents</h2>
        <input placeholder="Search for a document" onChange={handleChange}/>
        <div className="cards">
            
                  {res.length == 0? <h4>No Image created ...</h4>:res.map(item => (
                    <article className="card">
                    <header>
                    <div className="content">
                   <center> <h5>{item.name}</h5></center>
                   <center> <small>{item.type}</small></center>                    </div>
                    </header>
                
                    <center> <small>{item.id}</small></center>
                    <center><small >to: {item.date}</small></center>
                    <footer>
                        <div className="box">
                            <div className="one">
                                <button className="button button-light" onClick={()=>{download(item.id, item.name)}}>Download</button>
                            </div>
                            <div className="one">
                                <button className="button button-light float-right" onClick={()=>{del(item.id)}} > Delete</button>
                            </div>
                        </div>
                    </footer>
                </article>
                ))
            }
           <br/>
           <br/>
           
        </div>
        <br/>

       </div>
        </div>
       
        </>
    )
}
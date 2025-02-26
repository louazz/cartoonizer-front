import Nav from "../components/Nav"
import { GiRobotAntennas } from "react-icons/gi";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate} from "react-router";
import fileDownload from 'js-file-download';
import axios from "axios";
export default function Upload(){
  
    const navigate = useNavigate();
    const api = "http://167.99.83.1:5000";

    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [download, setDownload]= useState(null)
 
    const handleUpload = async (e) => {
        var splitted = e.target.files[0].name.split(".")
        console.log(splitted[splitted.length - 1])
        if (splitted[splitted.length - 1] !== "png" && splitted[splitted.length - 1] !== "jpeg"&& splitted[splitted.length - 1] !== "jpg") {
            alert("Please upload a ong or jpeg ²files")
            return;
        }

        const file = e.target.files[0];
        const filename = file.name.replace(/ /g, '_');
        setName(filename)


        const formData = new FormData();
        formData.append('file', file, filename);


    

        await axios
            .post(
                api + "/api/photo",
                formData,
                {
                    responseType: "arraybuffer",
                   
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`

                    },
                }
            )
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    const file = new Blob([response.data])
                    var fileUrl = URL.createObjectURL(file);
                    setImage(fileUrl)
                    setDownload(response.data)
                }
            })
            
    };
    const Download = ()=>{
        fileDownload(download, name);

    }
     useEffect(() => {
            if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
                navigate("/login")
            } })
    return(
        <>
        <div className="container">
        <br/>
            <Nav />
        
            <br/>
            <br/>
            <div className="container second-color">
               {image == null?<h4>The uploaded photo will be displayed here  <GiRobotAntennas /></h4>: <><br/><img src={image} className="img1"/><button className="button button-black button-clear" onClick={Download}>download</button></>}
            </div>
            <br/>
            <div className="container third-color">
                <h1>Upload JPEG, JPG or PNG images</h1>
                <h4>Our algorithm will generate the optimal cartoon image from your photo</h4>
                <br/>
                <center>
                    <input type="file" onChange={handleUpload}/> 
                </center>
                <br/>
            </div>
        </div>
        </>
    )
}
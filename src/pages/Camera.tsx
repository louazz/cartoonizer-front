import {Camera} from "react-camera-pro";
import React, { useState, useRef, useEffect } from "react";
import Nav from "../components/Nav";
import { useNavigate} from "react-router";
import fileDownload from 'js-file-download';
import axios from "axios";


export default function Cam(){
    const camera = useRef(null);
    const [image, setImage] = useState(null);
    const [cartoonized, setCartoonized]= useState(null)
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const navigate = useNavigate();
    const api = "http://167.99.83.1:5000";
    useEffect(() => {
        if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
            navigate("/login")
        } })
    const picture = ()=>{
        const photo = camera.current.takePhoto();
        console.log(photo)
        setImage(photo)
    }
    useEffect(() => {
        if (localStorage.getItem("token") == undefined) {
            navigate("/")
        }
    })
    function convertBase64ToBlob(base64Image) {
        const parts = base64Image.split(';base64,');
      
       
        const imageType = parts[0].split(':')[1];
      
   
        const decodedData = window.atob(parts[1]);
      
        const uInt8Array = new Uint8Array(decodedData.length);
      
        for (let i = 0; i < decodedData.length; ++i) {
          uInt8Array[i] = decodedData.charCodeAt(i);
        }
      
        return new Blob([uInt8Array], { type: imageType });
      }
    const handleUpload = async () => {

        const file = convertBase64ToBlob(image);
       

        const formData = new FormData();
        formData.append('file', file, "capture.png");
     
    

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
                    setCartoonized(fileUrl)
                }
            })
            
    };
    const Download = ()=>{
        fileDownload(cartoonized, file);

    }

    const swap = ()=>{
        setCartoonized(null)
        setImage(null)
        camera.current.switchCamera();
    }
    return(
        <div className="container">
        <br/>
        <Nav />
        <div className="container cam">
            {image==null? <Camera ref={camera}  numberOfCamerasCallback={setNumberOfCameras}/> : cartoonized==null?<><img className="img1" src={image}/><button className="button button-black button-clear" onClick={handleUpload}>Cartoonnize</button></>:<img className="img1" src={cartoonized}/>}
        

        </div>
        <center>
        
            <div className="container">
                <br/>
            <div className="box ">
                <div className="one">
                <button className='button button-light float-left' onClick={picture}>Take picture</button>

                </div>
                <div className="one">
                    <button className="button button-light float-right" onClick={swap}>Switch camera</button>
                </div>
            </div>
            </div>

        </center>
        </div>
    )
}

import './assets/milligram.css'
import './assets/App_original.css'
import './assets/normalize.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login.jsx"
import Cam from "./pages/Camera.jsx"
import Upload from "./pages/Upload.jsx"
import Signup from "./pages/Signup.jsx"
import Browse from "./pages/Browse.jsx"

function App() {

  return (
    <>
 <BrowserRouter>
        <Routes>
          <Route index element={<Signup/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path="camera" element={<Cam/>}/>
          <Route path="browse" element={<Browse/>}/>
          <Route path="upload" element={<Upload/>}/>

        </Routes>
     </BrowserRouter>
   </>
  )
}

export default App

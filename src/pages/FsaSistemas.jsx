import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const FsaSistemas = () => {
  async function SavePhoto(inp) 
{
  console.log("hi")
    let user = { name:'john', age:34 };
    let formData = new FormData();
    let photo = inp.files[0];      
         
    formData.append("photo", photo);
    formData.append("user", JSON.stringify(user)); 
    
    const ctrl = new AbortController()    // timeout
    setTimeout(() => ctrl.abort(), 5000);
    
    try {
       let r = await fetch('/upload/image', 
         {method: "POST", body: formData, signal: ctrl.signal}); 
       console.log('HTTP response code:',r.status); 
    } catch(e) {
       console.log('Huston we have problem...:', e);
    }
    
}
  return (
    <div>
        <input id="image-file" type="file" onchange={SavePhoto()} />
    </div>
  )
}

export default FsaSistemas
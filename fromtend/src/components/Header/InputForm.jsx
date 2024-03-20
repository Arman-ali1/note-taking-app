import React, { useState,useEffect } from "react";
// import axios from 'axios';
import io from 'socket.io-client'
import PORT from "../../dbport/dbport.jsx";

const InputFormcss = {
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
  position: "static",

  text: {
    fontSize: "0.75rem",
    color: " #818CF8",
    fontWeight: "700",
    position: "relative",
    top: "0.5rem",
    margin: "0 0 0 7px",
    padding: " 0 3px",
    background: "#e8e8e8",
    width: "fit-content",
    
  },
  input: {
    fontSize: " 0.75rem",
    border: "2px #818CF8 solid",
    // text:"#000000",
    color:"black",
    borderRadius: "5px",
    // background: "#e8e8e8",
    background: " #818CF8",
    padding: "20px",
    margin: "10px",
    minWidth: "55vw",
  },
  textarea: {
    fontSize: " 0.75rem",
    border: "2px #818CF8 solid",
    borderRadius: "5px",
    // background: "#e8e8e8",
    background: " #818CF8",
    padding: "10px 20px",
    color:"black",
    margin: "10px",
    text:"#000000",
    minHeight: "300px",
    minWidth: "55vw",
  },
  button: {
    "--color": "#0077ff",
    fontFamily: "inherit",
    display: "inline-block",
    width: "6em",
    height: " 2.6em",
    lineHeight: "2.5em",
    overflow: "hidden",
    cursor: "pointer",
    margin: "20px",
    fontSize: "17px",
    " zIndex": "1",
    color: "var(--color)",
    border: "2px solid var(--color)",
    borderRadius: "6px",
    position: "relative",
  },
  container: {
    margin: "5px",
    color: "#0077ff",
    border: "2px solid #0077ff",
    borderRadius: "6px",
  },
};

const socket=io.connect(`http://localhost:${PORT}`);
function InputForm() {
  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const[Chatt,setChatt]=useState([])

  const handleSubmit = async () => {

    socket.emit("send_message", {author,title,content});
      const temp={
        author:author,
        title:title,
        content:content
      }
      console.log(temp);
  };

 
  // useEffect(()=>{
    // socket.emit("all-message",{});
  // },[])

  return (
    <div style={InputFormcss.container}>
      <h2>New Note...</h2>
      <div style={InputFormcss}>
        <label htmlFor="input" style={InputFormcss.text} className="text">
          Author
        </label>
        <input
          style={InputFormcss.input}
          type="text"
          placeholder="Write here..."
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div style={InputFormcss}>
        <label htmlFor="input" style={InputFormcss.text} className="text">
          Title
        </label>
        <input
          
          style={InputFormcss.input}
          type="text"
          placeholder="Write here..."
          name="title"
          
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div style={InputFormcss}>
        <label htmlFor="input" style={InputFormcss.text} className="text">
          Content
        </label>

        <textarea placeholder="Write here..."
        onChange={(e)=>(setContent(e.target.value))}
         style={InputFormcss.textarea} />
        <button style={InputFormcss.button}
        
         onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default InputForm;

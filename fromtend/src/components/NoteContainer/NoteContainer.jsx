import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import  io  from "socket.io-client";
import PORT from "../../dbport/dbport.jsx";
// import axios from 'axios';
const socket=io.connect(`http://localhost:${PORT}`);

const text= {
  fontSize: "0.75rem",
  color: " #818CF8",
  fontWeight: "700",
  position: "relative",
  top: "0.5rem",
  margin: "0 0 0 7px",
  padding: " 0 3px",
  background: "#e8e8e8",
  width: "fit-content",
}

// const notearr = [
//   {_id:"1", title: "Shivam", content: "note taking app" },
//   {_id:"2", title: "Arman", content: "Book taking app" },
// ];

function NoteContainer() {
  const [notes, setNotes] = useState([]);
  const[Chatt,setChatt]=useState([])
  //  setNotes(notearr)



  //css
  const containercss = {
    "display" : "flex",
    "flexDirection":"row",
    "flexFlow": "row wrap",
    "padding":"20px",
    "margin":"5px",
    "color": "#0077ff",
    "border": "2px solid #0077ff",
    "borderRadius": "6px",
    boxSizing: "border-box",
    minWidth: "55vw",
    minHeight: "700px",
    background: "#fffff",
    
    
  };

  useEffect(() => {
    console.log("useE start");
    socket.on("receive_message",(data)=>{
      // setMessageReceive(data.message)

      setChatt(data)
      setNotes(data)
      // console.log(data.author);
      console.log(notes);
      
    })
    console.log("end useE");
  }, [socket])
  useEffect(()=>{
    socket.emit("all-message",{});
  } ,[])

  return (
    <div>
      <label htmlFor="input" style={text} className="text">
          Chat-Container
        </label>
      <div >
        {notes.map((note) => (
          <div key={note._id}>
            <Note  {...note} />
            
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default NoteContainer;

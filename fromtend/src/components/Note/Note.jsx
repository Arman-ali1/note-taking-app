import React, { useState } from "react";
import deleteimg from "../../assets/delete.svg"
import editing from "../../assets/edit.svg"
import check from "../../assets/check.svg"
// import axios from 'axios';
import io from 'socket.io-client'
import PORT from "../../dbport/dbport.jsx";


const socket=io.connect(`https://note-taking-app-d3fb.onrender.com`);
const notecss = {
  "boxSizing": " border-box",
  "minWidth": "300px",
  "minHeight": "300px",
  background: "rgba(217, 217, 217, 0.58)",
  border: "2px solid white",
  "boxShadow": "12px 17px 51px #00000",
  "backdropFilter": " blur(6px)",
  "borderRadius": "17px",
  "textAlign": "center",
  "cursor": "pointer",
  "transition": " all 0.5s",
  "display": "flex",
  "alignItems": "center",
  "justifyContent": "center",
  " userSelect": "none",
  " fontWeight": "bolder",
  "color": "white",
  "margin": "10px",
  "padding": "20px",
};

const txtarea={
  "border": "2px solid #0077ff",
  "borderRadius": "6px",
  "readOnly" :"true"
}
const editTxtarea={
  "border": "2px solid red",
  "borderRadius": "6px",
}

function Note({_id,author,title ,content}) {
 
  const noteId = _id;
  const [id,setId] = useState(noteId);
  const [noteAuthor,setNoteAuthor] = useState(author);
  const [noteTitle,setNoteTitle] = useState(title);
  const [contentText,setContentText] = useState(content);
  const [update,setUpdate] = useState(true);

  const changeIcon= ()=>{
    setUpdate((update)=>!update)
  }
  const handleDelete =async (id)=>{
    socket.emit("delete_chat", {id});
      const temp={
        author:noteAuthor,
        title:noteTitle,
        content:contentText
      }
      const navigate=useNavigate();
      console.log(temp);
  }

  const handleUpdate= async ()=>{
    console.log(contentText);
    socket.emit("update_chat", {id,contentText});
      const temp={
        id:id,
        author:contentText,
      }
      console.log(temp);
    
}


  return (
    <>
      <div >
        <div style={notecss} className="shadow-xl shadow-slate-400 " >
          <div className="shadow-xl  shadow-neutral-950" >
            <h3 style={{color:"blue", "fontSize":"30px"}} className="title">{title}</h3>
            <textarea
            style={update?txtarea:editTxtarea}
            rows={15}
            cols={35}
            placeholder="typing..."
            value={contentText}
            readOnly={update}
            onChange={(e)=>{
              setContentText(e.target.value)
            }}
            maxLength={150}
             />
          </div>
        </div>
          <div style={{"display" :"flex","justifyContent": "space-between","minWidth": "300px","cursor":"pointer", "padding":"3px 10px"}}>
            <img src={deleteimg} onClick={()=>handleDelete(_id)}  alt="delete" className="bg-white pr-2 pl-2 p-1 rounded-lg"/>
            {update?
            (<img className="bg-white pr-2 pl-2 p-1 rounded-lg" src={editing} onClick={()=>{
              changeIcon()
            }} alt="edit" /> )
            :
            (<img className="bg-white pr-2 pl-2 p-1 rounded-lg" src={check} onClick={()=>{
              handleUpdate()
              changeIcon()
            }} alt="save" /> )
            }
          </div>
      </div>
    </>
  );
}

export default Note;

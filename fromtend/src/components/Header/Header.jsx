import React, { useState } from 'react'




import InputForm from './InputForm'



function Header() {
  
  const navItems = [
    {
      name: 'Create Note',
    }, 
    
    
  ]

  const [showform,setShowform] = useState(false);
  const AddNote = ()=>{
    setShowform((showform)=>!showform)
    
  }
  
 //css
  const buttoncss = {
    button :{
        "--color": "#0077ff",
        "fontFamily": "inherit",
        "display": "inline-block",
        "width": "10em",
        "height":" 2.8em",
        "lineHeight": "2.5em",
        "overflow": "hidden",
        "cursor": "pointer",
        "margin": "20px",
        "fontSize": "17px",
       " zIndex": "1",
        "color": "var(--color)",
        "border": "2px solid var(--color)",
        "borderRadius": "6px",
        "position": "relative",
      },
      list:{
        listStyle:"none"
      }
  } 

  return (
    <header >
    
     <nav>
     
        <ul style={buttoncss.list}>
        
            {
                navItems.map((item)=>(
                    <li key={item}>
                        <button onClick={AddNote} style={buttoncss.button}>{item.name}</button>
                    </li>
                ))
            }
        </ul>
     </nav>
      {showform?<InputForm />:""}
    </header>
  )
}

export default Header

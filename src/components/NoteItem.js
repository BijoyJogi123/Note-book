import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
    
<div class="p-10">  

<div class="max-w-sm rounded overflow-hidden shadow-lg">
  
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{note.title}</div>
    <p class="text-gray-700 text-base">
    {note.description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  <i  onClick={()=>{deleteNote(note._id)}} className="fa-solid fa-trash-can px-6" ></i>
  <i onClick={()=>{updateNote(note)}} className="fa-regular fa-pen-to-square px-6"></i>
  </div>
</div>
</div>


    )
}

export default Noteitem

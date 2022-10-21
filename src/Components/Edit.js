import React from "react";
import { useState, useCallback } from "react";
import {FaTimes} from "react-icons/fa";

const Edit = ({item, onDelete, onUpdate, onStockChange, onLocationChange}) =>{
// Hook
// Parameter is the boolean, with default "false" value
  const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);
    
    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
  }

  const [edit, setEdit] = useToggle();

  return(
    !edit ?
          <tr key={item.id} >
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.location}</td>
            <td style={item.stock === 0 || item.stock <= 5 ? { color: "red"}: {color: "black"}} >{item.stock}</td>
            <td>
              <button onClick={()=>{setEdit()}} className='btn btn-dark text-nowrap'>Edit</button>
              <button onClick={()=>{onDelete(item.id)}} className="btn btn-danger text-nowrap">Delete</button>
            </td>
          </tr> :
          <tr key={item.id}> 
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td><input type="text" defaultValue={item.location} onChange={onLocationChange}/></td>
          <td style={item.stock === 0 || item.stock <= 5 ? { color: "red"}: {color: "black"}}><input type="number" defaultValue={item.stock} onChange={onStockChange}/></td>
          <td>
            <button onClick={()=>{onUpdate(item.id); setEdit();window.location.reload(false);}} className="btn btn-success text-nowrap">Update</button>
            <button onClick={()=>{onDelete(item.id)}} className="btn btn-danger text-nowrap">Delete</button>
            <button  onClick={()=>{setEdit()}} className='btn btn-dark text-nowrap'><FaTimes /></button>
          </td>
          </tr>
  )
}

export default Edit;

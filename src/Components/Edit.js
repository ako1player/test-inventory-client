import React from "react";
import { useState, useCallback } from "react";
import {FaTimes} from "react-icons/fa";
import { BiTrash } from "react-icons/bi";

const Edit = ({item, onDelete, onUpdate, onStockChange}) =>{
// // Hook
// // Parameter is the boolean, with default "false" value
//   const useToggle = (initialState = false) => {
//     // Initialize the state
//     const [state, setState] = useState(initialState);
    
//     // Define and memorize toggler function in case we pass down the component,
//     // This function change the boolean value to it's opposite value
//     const toggle = useCallback(() => setState(state => !state), []);
    
//     return [state, toggle]
//   }

  const [edit, setEdit] = useState(false);

  return(
    !edit ?
          // <tr key={item.id} style={item.stock === 0 || item.stock <= 5 ? {borderColor:"red"}: {borderColor: "black"}} >
          //   <td>{item.name}</td>
          //   <td>{item.description}</td>
          //   <td>{item.location}</td>
          //   <td>{item.stock}</td>
          //   <td>
          //     <button onClick={()=>{setEdit(true)}} className='btn btn-dark text-nowrap'>Edit</button>
          //     <button onClick={()=>{onDelete(item.id)}} className="btn btn-danger"><BiTrash /></button>
          //   </td>
          // </tr> :
          // <tr key={item.id} style={item.stock === 0 || item.stock <= 5 ? {borderColor:"red"}: {borderColor: "black"}}> 
          // <td>{item.name}</td>
          // <td>{item.description}</td>
          // <td>{item.location}</td>
          // <td><input type="number" defaultValue={item.stock} onChange={onStockChange}/></td>
          // <td>
          //   <button onClick={()=>{onUpdate(item.id); setEdit();}} className="btn btn-success text-nowrap">Update</button>
          //   <button onClick={()=>{onDelete(item.id)}} className="btn btn-danger"><BiTrash /></button>
          //   <button  onClick={()=>{setEdit()}} className='btn btn-dark text-nowrap'><FaTimes /></button>
          // </td>
          // </tr>
          <li className="px-3 py-3 flex items-start">
          <div className="flex-grow">
            <div className="flex items-center">
              <span className="flex-none font-medium text-2xl text-blue-500">{item.name}</span>
              <span className="flex-grow text-right"><button onClick={()=>{setEdit(true)}} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">Edit</button></span>
            </div>
          <div className="flex items-start"><b className="font-bold text-blue-500">Location:</b> {item.location}</div>
          <div className="flex items-start"  style={item.stock === 0 || item.stock <= 5 ? {color:"red"}: {color: "black"}}><b className="font-bold text-blue-500">Stock:</b> {item.stock}</div>
          <div className="flex items-start"><b className="font-bold text-blue-500">Description:</b> {item.description}</div>
          </div>
        </li>
        :
        <li className="px-3 py-3 flex items-start">
          <button type="button" onClick={ ()=> onDelete(item.id)}
            className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BiTrash /></button>
          <div className="flex-grow">
          <div className="flex items-center">
            <span className="flex-none font-medium text-2xl text-blue-500">{item.name}</span>
            <span className="flex-grow text-right">
            <button onClick={()=>{onUpdate(item.id); setEdit();}} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">Update</button>
              <button onClick={()=>{setEdit()}} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"><FaTimes /></button></span>
          </div>
          <div className="flex items-start"><b className="font-bold text-blue-500">Location:</b> {item.location}</div>
          <div className="flex items-start"  style={item.stock === 0 || item.stock <= 5 ? {color:"red"}: {color: "black"}}><b className="font-bold text-blue-500">Stock:</b><input type="number" defaultValue={item.stock} onChange={onStockChange} className="max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/></div>
          <div className="flex items-start"><b className="font-bold text-blue-500">Description:</b> {item.description}</div>
        </div>
        </li>
  )
}

export default Edit;

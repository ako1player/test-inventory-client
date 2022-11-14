/* 
NOTES
  Add alert for delete button - Done
/*
HOW TO START THE PROGRAM
-------------------------
Open up the terminal
make sure you are in the inventory-version2 folder
once in the directory type in "npm start" which should start the program.
May need to have nodejs installed on computer
*/
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.js'
import { useState, useEffect, useCallback} from "react";
import Axios from 'axios';
import Edit from './Components/Edit';
import Search from './Components/Search';
// import DropdownButton from './Components/Dropdown';
import {BsPlus, BsFillMoonStarsFill} from "react-icons/bs";
import {MdOutlineInventory} from "react-icons/md";

//App is what renders what shows on the browser
function App() {

  //What the database will store
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState(0);
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  //for updated items (still needs to be worked on)
  //const [newName, setNewName] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [newLocation, setNewLocation] = useState("");

  //array of all items added to the database. name,desc, stock, location
  const [itemList, setItemList] = useState([]);

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  Axios.defaults.withCredentials = true;
     const register = () =>{
       Axios.post('https://inventory-test-zukowski.herokuapp.com/register', {username: usernameReg, password: passwordReg}).then((response)=>{
       console.log(response);
     })
     };

     const login = () =>{
      Axios.post('https://inventory-test-zukowski.herokuapp.com/login', {username: username, password: password}).then((response)=>{
        if(!response.data.auth){
          setLoginStatus(false);
        } else {
          localStorage.setItem("token", response.data.token)
          setLoginStatus(true);
        }
      })
    };

  //adds item to database
  const addItem = (e) =>{
    if(name.trim().length === 0 || desc.trim().length === 0 || location.trim().length === 0){
      alert("Name/Description/Location is required");
      e.preventDefault();
    }
    else {
    Axios.post('https://inventory-test-zukowski.herokuapp.com/create', {
      name: name,
      desc: desc,
      stock: stock,
      location: location
    }).then(() =>{
        setItemList([{ //displayes items once added to the database. rerenders the page
          name: name,
          description: desc,
          stock: stock,
          location: location,
        }, ...itemList,]);
    });
    setName("");
    setDesc("");
    setLocation("");
    setStock(0);
    setEdit();
  }
  };

  //filters items when using seach bar
  const filterItems = itemList.filter(
    item =>{
      return(
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  );

  //displays inventory once browser is launched after npm start  
  useEffect(() =>{
    Axios.get('https://inventory-test-zukowski.herokuapp.com/inventory').then((response) =>{
      setItemList(response.data);
    });
  },[]);

  const sortByDesc = () =>{
    Axios.get('https://inventory-test-zukowski.herokuapp.com/inventoryDesc').then((response) =>{
      setItemList(response.data);
  })
}

const sortByAsc = () =>{
    Axios.get('https://inventory-test-zukowski.herokuapp.com/inventoryAsc').then((response) =>{
      setItemList(response.data);
  })
}

  //deletes item from inventory using ID from the database
  const deleteItem = (id) =>{
    Axios.delete(`https://inventory-test-zukowski.herokuapp.com/delete/${id}`).then((response) =>{
        setItemList(itemList.filter((val) =>{
            return val.id !== id
        }))
    });
}

//supposed to update item. Still needs work.
const updateItem = (id) =>{
  if(stock === newStock){
    setStock(stock);
  } else {
    Axios.put('https://inventory-test-zukowski.herokuapp.com/update/', { stock: newStock, id: id}).then((response) =>{
      setItemList(itemList.map((val) =>{
        //this just rerenders page once updated
        return val.id === id ? 
          {
          id: val.id, name: val.name, description: val.description, stock: newStock, location: val.location
          } 
          : 
        val;
      }))
    });
    setNewStock(0);
  }
}


//shows pop up to confirm if user wants to delete item or not from inventory
const cnfmDelete = (id) =>{
  if(window.confirm("Are you sure you want to delete this item?")){
    deleteItem(id);
  }
}

const handleChange = (e) => {
  setNewStock(e.currentTarget.value);
}

// const handleChangeName = (e) => {
//   setNewName(e.currentTarget.value);
// } 

// const handleChangeLocation = (e) => {
//   setNewLocation(e.currentTarget.value);
// } 

//for cookie allowing user to stay logged in
useEffect(() => {
  Axios.get("https://inventory-test-zukowski.herokuapp.com/login").then((response) =>{
    if(response.data.loggedIn === true){
      setLoginStatus(response.data.user[0].username);
    }
  })
}, []);

// Hook
// Parameter is the boolean, with default "false" value
// const useToggle = (initialState = false) => {
//   // Initialize the state
//   const [state, setState] = useState(initialState);
  
//   // Define and memorize toggler function in case we pass down the component,
//   // This function change the boolean value to it's opposite value
//   const toggle = useCallback(() => setState(state => !state), []);
  
//   return [state, toggle]
// }

const [edit, setEdit] = useState(false);

  //Displays the table for the inventory. Using bootstrap css
  return (
    <div className={darkMode ? 'dark dark:mx-auto font-medium bg-gray-900' : " mx-auto font-medium"}>
      {/* <h1>Registration</h1>
            <label>Username</label>
            <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}}/>
            <label>Password</label>
            <input type="password" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
            <button onClick={register}>Register</button>
      {!loginStatus ?
      <div>
      <h1>Login</h1>
      <label>Username</label>
      <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
      <label>Password</label>
      <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={login}>Login</button>
      <h1>{loginStatus}</h1>
    </div> */}
    
    {/* <div>
      {!edit ?
      <div className='text-center pt-3 mb-5'>
        <button onClick={()=> setEdit()} className="btn btn-dark">Create Item</button>
      </div>
      :
      <form className='text-center'>
        <div className='row mb-3'>
          <label>Item Name:</label>
          <div className='col-sm'>
          <input type="text" onChange={(event)=>{setName(event.target.value)}}/>
          </div>
        </div>
        <div className='row mb-3'>
          <label>Description:</label>
          <div className='col-sm'>
          <input type="text" onChange={(event)=>{setDesc(event.target.value)}}/>
          </div>
        </div>
        <div className='row mb-3'>
          <label>Location:</label>
          <div className='col-sm'>
          <input type="text" onChange={(event)=>{setLocation(event.target.value)}}/>
          </div>
        </div>
        <div className='row mb-3'>
          <label>Stock:</label>
          <div className='col-sm'>
          <input type="number" min="0" onChange={(event)=>{setStock(event.target.value)}}/>
          </div>
        </div>
        <div>
        <button onClick={addItem} className="btn btn-dark mb-2">Add Item</button>
        </div>
        <button onClick={()=>setEdit()} className="btn btn-dark mb-2">Cancel</button>
      </form>
      }
      <div className="items position-relative text-center">
        <div className='float-sm-start mx-2'>
          <Search query={query} onQueryChange={myQuery => setQuery(myQuery)}/>
        </div>
        <div className='float-sm-end mx-2'>
        <DropdownButton sortByAsc={()=>sortByAsc()} sortByDesc={()=>sortByDesc()}/>
        </div>
        <table className="table table-bordered">
          <thead className='table-dark sticky-top'>
          <tr>
            <th scope='col' className='col-sm-1'>Item</th>
            <th scope='col' className='col-sm-3'>Description</th>
            <th scope='col' className='col-sm-2'>Location</th>
            <th scope='col' className='col-sm-1'>On Hand</th>
            <th scope='col' className='col-sm-1'></th>
          </tr>
          </thead>
          <tbody>
        {filterItems.map((val, key) =>(//gets the items from the itemList useState array and displays name,description, location, and stock
         <Edit key={val.id} item={val} onDelete={itemDel => cnfmDelete(val.id)} onUpdate={itemUpdate => updateItem(val.id)} onStockChange={handleChange} />
        ))}
          </tbody>
        </table>
      </div>
      </div> */}
  <div>
    <div className="flex items-center">
        <div className="flex"><h1 className="text-5xl mb-3 dark:text-white"><MdOutlineInventory className="inline-block text-blue-400"/>Inventory</h1></div>
        <div className="flex-none"><BsFillMoonStarsFill onClick={()=> setDarkMode(!darkMode)} className='cursor-pointer text-2xl dark:text-yellow-200'/></div>
      </div>
      <button onClick={()=> setEdit(!edit)} className={`bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md ${edit ? 'rounded-t-md' : 'rounded-md'}`}>
    <div><BsPlus className="inline-block align-text-top"/> Create Item</div></button>
{edit && 

<div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4 dark:border-gray-600">
<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white">
    Item Name
  </label>
  <div className="mt-1 sm:mt-0 sm:col-span-2">
    <input type="text" name="name" onChange={(event)=>{setName(event.target.value)}}
      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
  </div>
</div>

<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-white">
    Location
  </label>
  <div className="mt-1 sm:mt-0 sm:col-span-2">
    <input type="text" name="location" onChange={(event) => {setLocation(event.target.value)}}
      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
  </div>
</div>

<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2  dark:text-white">
    Stock
  </label>
  <div className="mt-1 sm:mt-0 sm:col-span-2">
    <input type="number" min="0"  onChange={(event)=>{setStock(event.target.value)}}
      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
  </div>
</div>
<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2  dark:text-white">
    Part Number
  </label>
  <div className="mt-1 sm:mt-0 sm:col-span-2">
    <textarea name="description" rows="3" onChange={(event)=>{setDesc(event.target.value)}}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Part Number"></textarea>
  </div>
</div>


<div className="pt-5">
  <div className="flex justify-end">
    <button type="submit" onClick={addItem} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
      Submit
    </button>
  </div>
</div>
</div>
      // <form className='text-center pt-3 mb-3'>
      //   <div className='row mb-3'>
      //     <label>Item Name:</label>
      //     <div className='col-sm'>
      //     <input type="text" onChange={(event)=>{setName(event.target.value)}}/>
      //     </div>
      //   </div>
      //   <div className='row mb-3'>
      //     <label>Description:</label>
      //     <div className='col-sm'>
      //     <input type="text" onChange={(event)=>{setDesc(event.target.value)}}/>
      //     </div>
      //   </div>
      //   <div className='row mb-3'>
      //     <label>Location:</label>
      //     <div className='col-sm'>
      //     <input type="text" onChange={(event)=>{setLocation(event.target.value)}}/>
      //     </div>
      //   </div>
      //   <div className='row mb-3'>
      //     <label>Stock:</label>
      //     <div className='col-sm'>
      //     <input type="number" min="0" onChange={(event)=>{setStock(event.target.value)}}/>
      //     </div>
      //   </div>
      //   <div>
      //   <button onClick={addItem} className="btn btn-dark mb-2">Add Item</button>
      //   </div>
      //     <button onClick={()=>{setEdit()}} className="btn btn-dark mb-2">Cancel</button>
      // </form>
      }
      <Search query={query} onQueryChange={myQuery => setQuery(myQuery)} sortByAsc={()=>sortByAsc()} sortByDesc={()=>sortByDesc()}/>
      <div className="items position-relative text-center">
        {/* <DropdownButton sortByAsc={()=>sortByAsc()} sortByDesc={()=>sortByDesc()}/> */}
        {/* <table className="table table-bordered caption-top">
          <caption>Inventory</caption>
          <thead className='table-dark sticky-top'>
          <tr>
            <th scope='col' className='col-sm-1 '>Item</th>
            <th scope='col' className='col-sm-3'>Description</th>
            <th scope='col' className='col-sm-2'>Location</th>
            <th scope='col' className='col-sm-1'>On Hand</th>
            <th scope='col' className='col-sm-1'>Actions</th>
          </tr>
          </thead>
          <tbody>
        {filterItems.map((val, key) =>(//gets the items from the itemList useState array and displays name,description, location, and stock
         <Edit key={val.id} item={val} onDelete={itemDel => cnfmDelete(val.id)} onUpdate={itemUpdate => updateItem(val.id)} onStockChange={handleChange} />
        ))}
          </tbody>
        </table> */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-600">
        {filterItems.map((val, key) =>(//gets the items from the itemList useState array and displays name,description, location, and stock
         <Edit key={val.id} item={val} onDelete={itemDel => cnfmDelete(val.id)} onUpdate={itemUpdate => updateItem(val.id)} onStockChange={handleChange} />
        ))}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default App;


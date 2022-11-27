import {AiOutlineSearch} from "react-icons/ai";
import { BiCaretDown } from "react-icons/bi";
import { useState } from "react";

const DropDown = ({toggle, sortByDesc, sortByAsc, sortByNew, sortByOld}) =>{
  if(!toggle){
    return null;
  }
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-900 dark:ring-gray-500">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div onClick={sortByAsc}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer dark:text-white dark:hover:bg-gray-500"
          role="menuitem">Low to High Stock</div>
        <div onClick={sortByDesc}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer dark:text-white dark:hover:bg-gray-500"
          role="menuitem">High to Low Stock</div>
          <div onClick={sortByNew}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer dark:text-white dark:hover:bg-gray-500"
          role="menuitem">Newest</div>
          <div onClick={sortByOld}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer dark:text-white dark:hover:bg-gray-500"
          role="menuitem">Oldest</div>
      </div>
    </div>
  )
}

const Search = ({query, onQueryChange, sortByAsc, sortByDesc, sortByNew, sortByOld}) =>{
    const [toggleSort, setToggleSort] = useState(false);

    return(
        <div className="py-5">
        <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <AiOutlineSearch className="dark:text-white"/>
          <label htmlFor="query" className="sr-only" />
        </div>
        <input type="text" name="query" id="query" value={query} onChange={(event => {onQueryChange(event.target.value)})}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:bg-gray-900 dark:border-gray-600" placeholder="Search" />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <div>
            <button onClick={()=>setToggleSort(!toggleSort)} 
                className="justify-center px-4 py-2 bg-blue-400 rounded border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" type="button" aria-haspopup="true" aria-expanded="true">
                Filter <BiCaretDown className="ml-2" />
            </button>
            <DropDown toggle={toggleSort}
            sortByAsc={sortByAsc}
            sortByDesc = {sortByDesc}
            sortByNew = {sortByNew}
            sortByOld = {sortByOld} />
            </div>
          </div>
        </div>
        </div>
    );
}

export default Search;
function DropdownButton({sortByDesc, sortByAsc}) {
    return (
      <div className="dropup">
    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Filter
    </button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a className="dropdown-item" onClick={sortByAsc}>Low to High Stock</a></li>
      <li><a className="dropdown-item" onClick={sortByDesc}>High to Low Stock</a></li>
    </ul>
  </div>
    );
  }
  
  export default DropdownButton;
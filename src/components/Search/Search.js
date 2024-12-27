import React  from "react";
import './Search_module.css';
import SearchImg from "../../assets/search/searchbar.png"
const SearchBar = (props) =>{
const onClickSearch= (e)=>{
    if(props.In==1){
        props.setsearch(e.target.value)
    }
  if(props.In==2){
    props.Search(e.target.value)
 }

}
 
return(
    <div className="Searchbar">
        <form className="form_Style" onSubmit={(e)=>e.preventDefault()}>
            <input className="Search_Input"
            type="text"
            placeholder="Search "
            onChange={onClickSearch}
        />
        <button className="Searchbutton" ><img src={SearchImg}/></button>
    </form>
    </div>
)};

export default SearchBar;

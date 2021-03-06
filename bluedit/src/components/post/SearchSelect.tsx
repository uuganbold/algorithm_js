import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, FormFeedback } from "reactstrap";
import { FunctionComponent, useState, ChangeEvent } from "react";

type Props={
    initialQuery:string,
    handleQueryChange:(q:string)=>void,
    handleSelect:(choice:string)=>void,
    choices:{key:string,name:string, value:any}[],
    placeholder:string,
    inValidText:string,
    invalid:boolean
}
const SearchSelect:FunctionComponent<Props>=({initialQuery, handleQueryChange,choices, handleSelect,placeholder,inValidText, invalid})=>{

    const [isOpen, setIsOpen]=useState(false);
    const [query,setQuery]=useState(initialQuery);

    const toggle = () => setIsOpen(prevState => !prevState);
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value); 
        handleQueryChange(e.target.value)
    }  

    const handleDropdownSelect=(query:string,value:any)=>{
        setQuery(query);
        handleSelect(value);
    }
    return (
        <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle tag='span' data-toggle="dropdown"
                        aria-expanded={isOpen}>
                 <Input value={query} onChange={handleChange} placeholder={placeholder} invalid={invalid}></Input>
                <FormFeedback>{inValidText}</FormFeedback>
            </DropdownToggle>
            {choices.length>0&&(
                <DropdownMenu>
                {
                    choices.map(ch=>(
                    <DropdownItem key={ch.key} onClick={()=>handleDropdownSelect(ch.name,ch.value)}>{ch.name}</DropdownItem>
                    ))
                }
                 </DropdownMenu>
            )}
            
      </Dropdown>
    )
}

export default SearchSelect;
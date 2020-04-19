import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Form, Input, DropdownMenu, DropdownItem, Collapse, NavbarToggler } from "reactstrap"

import { useState, ChangeEvent, FormEvent } from "react";
import LoginMenu from "./LoginMenu";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import styles from './Header.module.css'
import Router  from "next/router";

const Header=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [search,setSearch] = useState('');

    const toggle = () => setIsOpen(!isOpen);

    const handleSearch=(e:FormEvent)=>{
        e.preventDefault();
        Router.push(`/search?q=${search}`,'/search');
    }
    const handleQueryChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }
    return (
        <Navbar tag='header' expand="md" dark={true} className={styles.navbar} >
            <HeaderLogo/>
            <NavbarToggler onClick={toggle}/>
            <Collapse navbar isOpen={isOpen}>           
                <HeaderMenu/>
                <Form inline className='ml-5' onSubmit={handleSearch}>
                    <Input type='search' placeholder='Search' onChange={handleQueryChange} value={search}/>
                </Form>
                <Nav navbar className='ml-md-auto'>
                    <LoginMenu/>                
                </Nav>
            </Collapse>
        </Navbar>

        
    )
};

export default Header;
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Form, Input, DropdownMenu, DropdownItem, Collapse, NavbarToggler } from "reactstrap"

import { useState } from "react";
import LoginMenu from "./LoginMenu";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import styles from './Header.module.css'

const Header=()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar tag='header' expand="md" dark={true} className={styles.navbar} >
            <HeaderLogo/>
            <NavbarToggler onClick={toggle}/>
            <Collapse navbar isOpen={isOpen}>           
                <HeaderMenu/>
                <Form inline className='ml-5'>
                    <Input type='search' placeholder='Search'/>
                </Form>
                <Nav navbar className='ml-md-auto'>
                    <LoginMenu/>                
                </Nav>
            </Collapse>
        </Navbar>

        
    )
};

export default Header;
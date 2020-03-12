import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Form, Input, DropdownMenu, DropdownItem, Collapse, NavbarToggler } from "reactstrap"

import { useState } from "react";
import LoginMenu from "./LoginMenu";
import HeaderLogo from "./HeaderLogo";
import Link from "next/link";
const Header=()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar tag='header' expand="md" dark={true} className={'bd-navbar'} >
            <HeaderLogo/>
            <NavbarToggler onClick={toggle}/>
            <Collapse navbar isOpen={isOpen}>           
                    <Nav navbar>
                        <NavItem>
                            <Link href='/' passHref>
                                <NavLink href='/'>Home</NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href='/subbluedits' passHref>
                                 <NavLink href='/'>Groups</NavLink>
                            </Link>
                        </NavItem>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav caret >
                                Sort By
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem >Recent</DropdownItem>
                                <DropdownItem>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
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
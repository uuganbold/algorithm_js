import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Form, Input, DropdownMenu, DropdownItem, Collapse, NavbarToggler } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import LoginMenu from "./LoginMenu";
const Header=()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar tag='header' expand="md" dark={true} className={'bd-navbar'}>
            <NavbarBrand className={'mr-0 mr-md-2'} href='/' aria-label='Bluedit'>
                <FontAwesomeIcon icon={fa.faRedditAlien}/>
            </NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse navbar isOpen={isOpen}>           
                    <Nav navbar>
                        <NavItem>
                            <NavLink active>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Groups</NavLink>
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
                <Form inline className='ml-md-auto'>
                    <Input type='search' placeholder='Search'/>
                </Form>
                <Nav navbar>
                    <LoginMenu/>                
                </Nav>
            </Collapse>
            
        </Navbar>
        
    )
};

export default Header;
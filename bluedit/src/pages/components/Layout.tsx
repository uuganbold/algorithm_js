import React, { useState } from 'react';
import {
    FormGroup,
    Collapse,
    Navbar,
    Input,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedditAlien, faReddit, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faSearch, faArrowDown, faCode, faCommentAlt, faAtom } from '@fortawesome/free-solid-svg-icons'


library.add(faRedditAlien, faReddit, faAndroid, faSearch)

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={{ backgroundColor: '#4FB7F8' }} light expand="md" className="sticky-top-custom">
                <NavbarBrand href="/index" style={{ color: '#FFFFFF' }}> <FontAwesomeIcon icon={['fab', 'reddit-alien']} /> BlueDit</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={true} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/users/new" style={{ color: '#FFFFFF' }}> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/users" style={{ color: '#FFFFFF' }}>Groups</NavLink>
                        </NavItem>


                        <UncontrolledDropdown>
                            <DropdownToggle nav caret style={{ color: '#FFFFFF' }} >
                                Sort By
                       </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Top
                        </DropdownItem>
                                <DropdownItem>
                                    Best
                        </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                        </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    <FormGroup className="form-inline my-2 my-lg-0" style={{ marginRight: 30 + 'em' }}>
                        
                        <NavbarText style={{ color: '#FFFFFF', marginRight: 5 }}> <FontAwesomeIcon icon="search" /></NavbarText>
                        <Input
                            type="search"
                            name="search"
                            
                            placeholder="Search"
                            style={{ width : 300 }}
                            />
                    </FormGroup>

                   

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={{ color: '#FFFFFF' }}>
                                <FontAwesomeIcon icon={['fab', 'android']}/> rayyanshaji
                       </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Profile
                        </DropdownItem>
                            <DropdownItem>
                                Settings
                        </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Logout
                        </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            </div>   
    );
}

export default Layout;
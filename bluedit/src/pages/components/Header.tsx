import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Form, Input, DropdownMenu, DropdownItem } from "reactstrap"
import classnames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header=()=>{
    return (
        <Navbar tag='header' expand={true} dark={true} className={classnames('flex-column','flex-md-row','bd-navbar')}>
            <NavbarBrand className={classnames('mr-0','mr-md-2')} href='/' aria-label='Bluedit'>
                <FontAwesomeIcon icon={['fab','reddit-alien']}/>
            </NavbarBrand>
            <div className='navbar-nav-scroll'>
                <Nav navbar className={classnames('bd-navbar-nav','flex-row')}>
                    <NavItem>
                        <NavLink active>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active>Groups</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav isNavbar>
                        <DropdownToggle nav caret className={'mr-md-2'}>
                            Sort By
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem >Recent</DropdownItem>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </div>
            <Form inline className={classnames('my-2','my-lg-0')}>
                <Input className={'mr-sm-2'} type='search' placeholder='Search'/>
            </Form>
            <Nav navbar className={classnames('flex-row','ml-md-auto', 'd-none', 'd-md-flex')}>
                    <UncontrolledDropdown nav isNavbar>
                        <DropdownToggle nav caret className={classnames('p-2','mr-md-2')}>
                            Uuganbold
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem >Recent</DropdownItem>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
            </Nav>
        </Navbar>
        
    )
};

export default Header;
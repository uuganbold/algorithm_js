import { Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FunctionComponent, useContext } from "react";
import Link from "next/link";
const HeaderMenu:FunctionComponent=()=>{
    return (
        <Nav navbar>
            <NavItem>
                <Link href='/' passHref>
                    <NavLink href='/' active>Home</NavLink>
                </Link>
            </NavItem>
            <NavItem>
                <Link href='/subbluedits' passHref>
                    <NavLink href='/subbluedits' >Subbluedits</NavLink>
                </Link>
            </NavItem>
          {<UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                    Sort By
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem >Best</DropdownItem>
                    <DropdownItem>Top</DropdownItem>
                    <DropdownItem>Recent</DropdownItem>
                    <DropdownItem>Old</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown> }
        </Nav>
    )
}

export default HeaderMenu;
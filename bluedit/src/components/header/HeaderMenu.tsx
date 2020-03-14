import { Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FunctionComponent } from "react";
import Link from "next/link";
import styles from './HeaderMenu.module.css'
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
            <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                    Sort By
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem >Recent</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    )
}

export default HeaderMenu;
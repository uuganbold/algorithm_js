import { Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FunctionComponent, useContext } from "react";
import Link from "next/link";
import SortContext from "../context/SortContext";
const HeaderMenu:FunctionComponent=()=>{
    const {setSortBy}=useContext(SortContext);
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
          {setSortBy&&<UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                    Sort By
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={()=>setSortBy('best')}>Best</DropdownItem>
                    <DropdownItem onClick={()=>setSortBy('top')}>Top</DropdownItem>
                    <DropdownItem onClick={()=>setSortBy('new')}>Recent</DropdownItem>
                    <DropdownItem onClick={()=>setSortBy('old')}>Old</DropdownItem>
                    <DropdownItem onClick={()=>setSortBy('comment')}>Comment</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown> }
        </Nav>
    )
}

export default HeaderMenu;
import React, { ReactNode, FunctionComponent } from "react";
import { NavbarBrand, NavLink} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import * as fa from "@fortawesome/free-brands-svg-icons"

const styles={
        fontSize: '200%',
        cursor:'pointer',
}
const HeaderLogo:FunctionComponent=()=>{
    return (
        <NavbarBrand className='mr-0 mr-md-2' aria-label='Bluedit' onClick={()=>{Router.push('/')}} style={styles}>
                <FontAwesomeIcon icon={fa.faRedditAlien}/>
        </NavbarBrand>
    )
}

export default HeaderLogo;
import React, { ReactNode } from "react";
import { NavbarBrand, NavLink} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import * as fa from "@fortawesome/free-brands-svg-icons"


const HeaderLogo=()=>{

    const style={
        cursor:'pointer'
    }
    return (
        <NavbarBrand className={'mr-0 mr-md-2'} aria-label='Bluedit' onClick={()=>{Router.push('/')}} style={style}>
                <FontAwesomeIcon icon={fa.faRedditAlien}/>
        </NavbarBrand>
    )
}
export default HeaderLogo;
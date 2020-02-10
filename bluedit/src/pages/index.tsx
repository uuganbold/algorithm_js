import React, { useState } from 'react';
import Layout from './components/Layout'

import {
    Button,
    Collapse,
    Navbar,
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

    
const Home = () => {

        return (
    <div>
                <Layout>  </Layout>
            <p className="text-info">Welcome to BlueDit!</p>
            <Button>Hello world!</Button>
        
            </div>
        );
     }
        
/*Home.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}*/
 
export default Home;
    

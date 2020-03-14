import { FunctionComponent, useContext, Fragment } from "react"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import UserContext from "../context/UserContext";
import Link from "next/link";
import Router from "next/router";

type Props={}
const LoginMenu:FunctionComponent<Props>=()=>{
    const { user, profile, signOut , signIn} = useContext(UserContext);

    const handleProfile=()=>{
        Router.push(`/u/[username]`,`/u/${profile.username}`,)
    }

    if(user){
        return (
            <Fragment>
                <UncontrolledDropdown nav >
                    <DropdownToggle nav caret>
                        {user.displayName}
                    </DropdownToggle>
                    <DropdownMenu>
                        {profile&&(<DropdownItem onClick={handleProfile}>My Profile</DropdownItem>)}
                        <DropdownItem onClick={signOut}>Log out</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Fragment>          
        )
    }else{
        return (
            <Button color='primary' onClick={signIn}>Login</Button>
        )
    }


}

export default LoginMenu;
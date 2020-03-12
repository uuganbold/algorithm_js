import { FunctionComponent, useContext, Fragment } from "react"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import UserContext from "./UserContext";
import Link from "next/link";

type Props={}
const LoginMenu:FunctionComponent<Props>=()=>{
    const { user, profile, signOut , signIn} = useContext(UserContext);

    if(user){
        return (
            <Fragment>
                <UncontrolledDropdown nav >
                    <DropdownToggle nav caret>
                        {user.displayName}
                    </DropdownToggle>
                    <DropdownMenu>
                        {profile&&(<DropdownItem><Link href="/users/[username]"  as={`/users/${profile.username}`}><a>My Profile</a></Link></DropdownItem>)}
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
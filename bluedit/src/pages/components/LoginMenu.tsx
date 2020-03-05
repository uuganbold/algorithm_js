import { FunctionComponent } from "react"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

type Props={}
const LoginMenu:FunctionComponent<Props>=()=>{

    return (
        <UncontrolledDropdown nav >
            <DropdownToggle nav caret>
                Uuganbold
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem >SignIn</DropdownItem>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default LoginMenu;
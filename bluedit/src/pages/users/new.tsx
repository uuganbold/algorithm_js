import { NextPage, NextPageContext } from "next";
import {ChangeEvent, useState} from "react";
import User from "../../business/entities/User";
import { useRouter } from 'next/router';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Home from "..";
import Layout from "../components/Layout";


/**
 * This page shows a form to create new user
 */
const UserCreate:NextPage<{}>=({})=>{

    //Next.js Router to surf between the pages.
    //for more information: https://nextjs.org/docs/api-reference/next/router
    const router = useRouter()

    /**
     * I have some React Controlled Components.
     * https://reactjs.org/docs/forms.html
     */
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError]=useState('');

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'confirmPass':
                setConfirmPass(e.target.value);
                break;
            case 'bio':
                setBio(e.target.value);
                break;
        }
    }

    const validateForm=():boolean=>{
        //TODO here client side validation should be implemented
        return true;
    }

    //
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> => {
        e.preventDefault();
    
        //if validation success, send data to api.
        if(validateForm()){

            //data to be sent.
            const user:User={username:username,email:email,password:password, bio:bio};
            //TODO for the sake of good design, all network access should be put in different layer.
            fetch(`http://localhost:3000/api/users/${username}`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(user)
                }).then(async (response)=>{
                    //if everything is successful, it will go to user information page.
                    if(response.ok)
                        router.push(`/users/${username}`)
                    else {
                        //if api responded error message, translate the error
                        throw new Error((await response.json()).error);
                    }
                }).catch(err=>{
                    //show error message
                    setError(err.message);
                })


            }
            
        }
    
        //Components to be showed
    return (
       
        <div>
            <Layout />
           
           <Form onSubmit={handleSubmit}>
                
                    <legend>New User</legend>
                    {/* Error message should be showed here */}
                <div style={{ color: "red" }}>{error}</div>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Username">Username</Label>
                    <Input type="text" name="username" placeholder="Enter username" 
                            value={username} onChange={handleChange}
                    /> <br />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Email">Email</Label> <br/>
                    <Input type="email" name="email" placeholder="Enter your email" value={email} onChange={handleChange} />

                    </FormGroup>
                <br />
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Password">Password </Label> 
                    <Input type="password" name="password" placeholder="Enter your password" value={password} onChange={handleChange} />
                </FormGroup>
                    <br />
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label> Confirm password:</Label>
                    <Input type="password" name="confirmPass" placeholder="Confirm your password" value={confirmPass} onChange={handleChange} />
                </FormGroup><br />

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label> Short Bio :</Label>
                    <Input type="textarea" name="bio" placeholder="Enter a short bio.." value={bio} onChange={handleChange} />
                </FormGroup><br />


                    <Button color="primary" type="submit" value="submit">Register</Button>
                    
             
                </Form>
            </div>
        
            
    )
}

 export default UserCreate;
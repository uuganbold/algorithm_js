import { NextPage, NextPageContext } from "next";
import {ChangeEvent, useState, useContext, useEffect} from "react";
import User from "../../business/entities/User";
import Router from 'next/router';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Layout from "../../components/Layout";
import UserContext from "../../components/UserContext";


/**
 * This page shows a form to create new user
 */
const UserCreate:NextPage<{}>=({})=>{

    /**
     * I have some React Controlled Components.
     * https://reactjs.org/docs/forms.html
     */
    const [username,setUsername]=useState('');
    const [bio, setBio] = useState('');
    const {user,token,setErrors}=useContext(UserContext);

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value);
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

            //@ts-ignore
            const profile:User={username:username, bio:bio, photoURL:user.photoURL};
            //TODO for the sake of good design, all network access should be put in different layer.
            fetch(`http://localhost:3000/api/users/${username}`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body:JSON.stringify(profile)
                }).then(async (response)=>{
                    //if everything is successful, it will go to user information page.
                    if(response.ok)
                        Router.push('/users/[username]',`/users/${username}`)
                    else {
                        //if api responded error message, translate the error
                        throw new Error((await response.json()).error);
                    }
                }).catch(err=>{
                    //show error message
                    setErrors(err.message);
                })


            }
            
        }
    
    return (
       
        <Layout> 
           {
               user!=null&&token!=null&&(
                <Form onSubmit={handleSubmit}>
                
                        <legend>New User</legend>
                        {/* Error message should be showed here */}
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Username">Username</Label>
                        <Input type="text" name="username" placeholder="Enter username" 
                                value={username} onChange={handleChange}
                        /> <br />
                    </FormGroup>
                    
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label> Short Bio :</Label>
                        <Input type="textarea" name="bio" placeholder="Enter a short bio.." value={bio} onChange={handleChange} />
                    </FormGroup><br />
                    <Button color="primary" type="submit" value="submit">Register</Button>                    
                
                    </Form> 
               )
           }        
           
            </Layout>
        
            
    )
}

 export default UserCreate;
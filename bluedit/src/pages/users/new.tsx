import { NextPage, NextPageContext } from "next";
import {ChangeEvent, useState} from "react";
import User from "../../business/entities/User";
import { useRouter } from 'next/router'

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
    const [confirmPass,setConfirmPass]=useState('');
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
            const user:User={username:username,email:email,password:password};
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
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>New User</legend>
                    {/* Error message should be showed here */}
                    <div style={{color:"red"}}>{error}</div>
                    Username:<br/>
                    <input type="text" name="username" placeholder="Enter username" 
                            value={username} onChange={handleChange}
                            /><br/>
                    Email:<br/>
                    <input type="email" name="email" placeholder="Enter your email" value={email} onChange={handleChange}/><br/>
                    Password:<br/>
                    <input type="password" name="password" placeholder="Enter your password" value={password} onChange={handleChange}/><br/>
                    Confirm password:<br/>
                    <input type="password" name="confirmPass" placeholder="Confirm your password" value={confirmPass} onChange={handleChange}/><br/>
                    <input type="submit" value="Submit"/>
                </fieldset>
            </form>
        </div>
    )
}

 export default UserCreate;
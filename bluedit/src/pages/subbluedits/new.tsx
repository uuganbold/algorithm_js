import Layout from "../../components/Layout";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, ChangeEvent, useContext } from "react";
import UserContext from "../../components/UserContext";
import Subbluedit from "../../business/entities/Subbluedit";
import Router from "next/router";

const NewSubdits=()=>{

    const [name,setName]=useState('');
    const {token,setErrors}=useContext(UserContext);
    
    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
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
            const subdit:Subbluedit={name:name};
            //TODO for the sake of good design, all network access should be put in different layer.
            fetch(`http://localhost:3000/api/subbluedits`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body:JSON.stringify(subdit)
                }).then(async (response)=>{
                    //if everything is successful, it will go to user information page.
                    if(response.ok)
                        Router.push('/subbluedits/[name]',`/subbluedits/${name}`)
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


    return(
        <Layout>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                <Label for="name">Name</Label>
                        <Input type="text" name="name" placeholder="Enter name" 
                                value={name} onChange={handleChange}
                        />
                </FormGroup>
                <Button color="primary" type="submit" value="submit">Add</Button> 
            </Form>
        </Layout>
    )
}

export default NewSubdits;
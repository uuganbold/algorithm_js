import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { useState, FunctionComponent, useEffect } from 'react';
import UserContext from '../components/context/UserContext';
import { AppProps, AppContext } from 'next/app'
import firebase from  'firebase/app';
import clientCredentials from '../firebase/client'
import "firebase/auth";
import Router from 'next/router';
// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }:AppProps) {

  const [logInUser,setLogInUser]=useState();
  const [loginToken, setLoginToken]=useState();
  const [loginProfile, setLoginProfile]=useState();
  const [errors,setErrors]=useState();

  const handleLogin=async (user:firebase.User)=>{
      user.getIdToken().then((token)=>{
        setLogInUser(user);
        setLoginToken(JSON.stringify(token));

        fetch('/api/auth/profile?uid='+user.uid,{
          headers:{
            'Content-Type': 'application/json',
            Authorization: JSON.stringify(token)
          }
        }).then(async (res)=>{
             const response=(await res.json());
             if(!response.status){
                Router.push('/u/new');
             }else{
                setLoginProfile(response.profile)
             }
        }).catch(err=>{
            setErrors(err.message);
        });
        
      }).catch(err=>{
        setErrors(err.message);
    });
  }

  const handleLogout=()=>{
     setLogInUser(null);
     setLoginToken(null);
  }

  useEffect(()=>{
      firebase.initializeApp(clientCredentials);
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          await handleLogin(user);
        } else {
          handleLogout();
        }
      });
  },[]);

  const signIn = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  };

  const signOut = () => {
    firebase.auth().signOut()
  };

  const contextValue={
      user:logInUser,
      profile:loginProfile,
      token:loginToken,
      errors:errors,
      setErrors:setErrors,
      signIn:signIn,
      signOut:signOut,
  }

  return (
      <UserContext.Provider value={contextValue}>
        <Component {...pageProps} />
      </UserContext.Provider>
  )
}

MyApp.getInitialProps = async ({Component, ctx}:AppContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
 }

export default MyApp;
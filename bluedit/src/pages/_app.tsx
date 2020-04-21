import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { useState, FunctionComponent, useEffect } from 'react';
import UserContext from '../components/context/UserContext';
import { AppProps, AppContext } from 'next/app'
import firebase from  'firebase/app';
import clientCredentials from '../firebase/client'
import "firebase/auth";
import Router from 'next/router';
import SocketContext from '../components/context/SocketContext';
import io from 'socket.io-client'
// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }:AppProps) {

  const [logInUser,setLogInUser]=useState(null);
  const [loginToken, setLoginToken]=useState(null);
  const [loginProfile, setLoginProfile]=useState(null);
  const [errors,setErrors]=useState(null);
  const [socket,setSocket]=useState(null);

  const handleLogin=async (user:firebase.User)=>{
      user.getIdToken().then((token)=>{
        setLoginToken(JSON.stringify(token));
        setLogInUser(user);
       

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
      setSocket(io())
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
    <SocketContext.Provider value={{socket}}>
        <UserContext.Provider value={contextValue}>
          <Component {...pageProps} />
        </UserContext.Provider>
    </SocketContext.Provider>   
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
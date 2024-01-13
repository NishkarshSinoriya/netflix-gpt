import React, { useState, useRef } from "react";
import Header from "./Header";
import {checkValidData} from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = ( ) =>{

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () =>{
        // Validate the form Data
        let message = checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return null;

        // Sign in / Sign Up user
        if(!isSignInForm){
            createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // updating user info
                    updateProfile(user, {
                        displayName:name.current.value, 
                        photoURL:USER_AVATAR
                      }).then(() => {
                        // Profile updated!
                        const {uid, email, password,displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid : uid, email:email, password :password, displayName: displayName, photoURL: photoURL}));
                      }).catch((error) => {
                        setErrorMessage(error.message);
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });
        }
        else{
            signInWithEmailAndPassword(auth,email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });
        }
         
    }

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    }
    return (<>
        <Header/>
        <div className="absolute">  
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                    alt='background'/>
        </div>
        <form onSubmit={(e) =>e.preventDefault()}className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm? "Sign In" : "Sign Up"}</h1>
                { !isSignInForm && <input className="p-4 my-4 w-full bg-gray-700 rounded-lg" ref={name} type="text" placeholder="Full Name" />}
                <input className="p-4 my-4 w-full bg-gray-700 rounded-lg" ref={email} type="text" placeholder="Email Address" />
                <input className="p-4 my-4 w-full bg-gray-700 rounded-lg" ref={password} type="password" placeholder="Password" />
                <p className="text-red-500 text-xs">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg"
                    onClick = {handleButtonClick}
                >{isSignInForm? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm? "New to Netflix? Sign Up Now" : "Already registered? Login now"}</p>
        </form>
        
         </>
      );
}

export default Login;


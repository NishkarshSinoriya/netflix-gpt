import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, password,displayName, photoURL}= user;
          dispatch(addUser({uid : uid, email:email, password :password, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
        } else {
            dispatch(removeUser());
            navigate("/");
        }
      });

      // unsubscribe when component unmounts...
      return () => unsubscribe();
  },[]);

  return (
    <div className='absolute w-screen px-20 py-4 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img src= {LOGO}
            alt= "logo"
        />
    {user && ( 
        <div className='flex'>
              <img  className="w-12 h-12" alt="user-avatar" src={user?.photoURL}/>
              <button onClick={handleSignOut} className="text-white">(Sign out)</button>
        </div>
    )}
    </div>
  )
}

export default Header;
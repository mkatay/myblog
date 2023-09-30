import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword,
  sendSignInLinkToEmail,deleteUser,sendPasswordResetEmail,updateProfile,sendEmailVerification} from 'firebase/auth';
import { auth } from '../utility/firebaseApp';
import { useNavigate } from 'react-router-dom';

const photoURL='https://firebasestorage.googleapis.com/v0/b/myblog-7535b.appspot.com/o/uploads%2Favatar.svg?alt=media&token=3b7ea8f7-f87e-414b-9615-8b870172a5e1'


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg,setMsg]=useState(null)
  const navigate=useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('user status changed:',user);
      
    });

    return () => unsubscribe();
  }, []);
console.log(msg);

  const logoutUser=async ()=>{
    await signOut(auth)   
    setMsg(null)
    navigate('/')
  }
  const loginUser=async (email,password)=>{
    try{
      await signInWithEmailAndPassword(auth,email,password)
      setMsg({...msg,signin:null})
      //await auth.currentUser.verifiedEmail ? setMsg({...msg,signin:null}) : setMsg({...msg,signin:'nem történt meg az email cím visszaigazolása!'})
     }catch(err){
        setMsg({...msg,signin:err.message})
        console.log(err.message)
       }
  }

 /*a SignUp.jsx meghívja a signUpUser() után a sendEmailLink()-et: */
  const sendEmailLink = async (email) => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        // this is the URL that we will redirect back to after clicking on the link in mailbox
        url: 'http://localhost:5173/signin',
        handleCodeInApp: true,//the email verification link or password reset link should be handled by your application
      });
      localStorage.setItem('email', email);
      setMsg({...msg,signup:'We have sent you an email with a link to sign in'});
    } catch (err) {
      setMsg({...msg,err:err.message})
      console.error(err.message);
    }
  };

   const signup =async (email, password,displayName) => {
    try{
      await createUserWithEmailAndPassword(auth, email, password,displayName);
      await updateProfile(auth.currentUser, {displayName,photoURL})
      sendEmailLink(email)
      //setMsg({...msg,signup:'We have sent you an email with a link to sign in!'})
      logoutUser()
    }catch(err){
      console.log(err.message)
      setMsg({...msg,signup:err.message})
    }
  };

     
  const resetPassword =async (email) => {
    try{
      await sendPasswordResetEmail(auth, email);
      console.log('A jelszóvisszaállítási email elküldve.');
      setMsg({...msg,resetPw:'A jelszóvisszaállítási email elküldve.'})
    }catch(err){
      console.log(err.message)
      setMsg({...msg,resetPw:null})

    }
  }
  const deleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      console.log('Felhasználói fiók törölve.');
    } catch (error) {
      console.error('Hiba történt a fiók törlésekor:', error);
    }
  };
  /*const updateUserName=async ()=>{
         await updateDisplayName("KAM");
  }*/
    return (
    <UserContext.Provider value={{ user,msg,setMsg,logoutUser,loginUser,resetPassword,
                                    sendEmailLink,deleteAccount,signup}}>
                                     
      {children}
    </UserContext.Provider>
  );
};

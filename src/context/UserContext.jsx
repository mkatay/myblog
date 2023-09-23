import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword,
  sendSignInLinkToEmail,deleteUser,sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../utility/firebaseApp';
import { useNavigate } from 'react-router-dom';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg,setMsg]=useState(null)
  const navigate=useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('user status changed');
    });

    return () => unsubscribe();
  }, []);


  const logoutUser=async ()=>{
    await signOut(auth)   
    setMsg(null)
    navigate('/')
  }
  const loginUser=async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password)
       setMsg({...msg,signin:null})
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
      //setMsg('We have sent you an email with a link to sign in');
    } catch (err) {
      setMsg({...msg,err:err.message})
      console.error(err.message);
    }
  };

   const signUpUser =async (email, password) => {
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      setMsg({...msg,signup:'We have sent you an email with a link to sign in!'})
    }catch(err){
      console.log(err.message)
      setMsg({...msg,signup:err.message})
    }
  };
 
  const resetPassword =async (email) => {
    try{
      await sendPasswordResetEmail(auth, email);
      console.log('A jelszóvisszaállítási email elküldve.');
      setMsg({...msg,resetPw:'A jelszóvisszaállítási email elküldve.',errResetPw:null})
    }catch(err){
      console.log(err.message)
      setMsg({...msg,resetPw:null,errResetPw:err.message})

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
    <UserContext.Provider value={{ user,msg,setMsg,logoutUser,loginUser,signUpUser,resetPassword,
                                    sendEmailLink,deleteAccount}}>
      {children}
    </UserContext.Provider>
  );
};

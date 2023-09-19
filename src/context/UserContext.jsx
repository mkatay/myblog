import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword,
  sendSignInLinkToEmail,deleteUser,sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../utility/firebaseApp';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg,setMsg]=useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('user status changed');
    });

    return () => unsubscribe();
  }, []);

  const logoutUser=async ()=>{
    await signOut(auth)    
  }
  const loginUser=async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password)
       setMsg({...msg,errSignIn:null})
     }catch(err){
        setMsg({...msg,errSignIn:err.message})
        console.log(err.message)
       }
  }
 
  const sendEmailLink = async (email) => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        // this is the URL that we will redirect back to after clicking on the link in mailbox
        url: 'http://localhost:5173/signin',
        handleCodeInApp: true,
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
      setMsg({...msg,errSignUp:null})
    }catch(err){
      console.log(err.message)
      setMsg({...msg,errSignUp:err.message})
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
    return (
    <UserContext.Provider value={{ user,msg,setMsg,logoutUser,loginUser,signUpUser,resetPassword,
                                    sendEmailLink,deleteAccount}}>
      {children}
    </UserContext.Provider>
  );
};

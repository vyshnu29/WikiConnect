/* eslint-disable react/prop-types */
import React, { useContext, useState,  } from "react"
import { auth, firestore } from "../db/index"
import { useSnackbar } from "./SnackBarContext"
// import { errorMsg } from "../shared/components/Alerts"


const AuthContext = React.createContext()

const useAuthContext = () => useContext(AuthContext);

 const AuthProvider = (props) =>  {
  const [currentUser, setCurrentUser] = useState('')
  const [userDetails, setUserDetails] = useState()
  const [isLoggedIn, setisLoggedIn] = useState('')
  const [loading, setLoading] = useState(true)
  const { showSnackbar } = useSnackbar();

  const state = {
    currentUser,
    loading,
    showSnackbar,
    userDetails,
    isLoggedIn
  }
  const stateSetters = {
    setCurrentUser,
    setLoading,
    setisLoggedIn,
    setUserDetails
  }

  async function signup(payload) {
    // eslint-disable-next-line no-useless-catch
    try {
      const existingUser = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
      const userRef = firestore.collection('USERS').doc(existingUser.user.uid);
      const snapshot = await userRef.get();
      if (!snapshot.exists) {
        await userRef.set({
          email: existingUser.user.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          role: 'user',
          createdAt: new Date(),
          uId: existingUser.user.uid
        });
      }
      showSnackbar('Signup successful!', 'success');
      return existingUser;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showSnackbar('That email address is already in use!', 'error');
      }
      if (error.code === 'auth/invalid-email') {
        showSnackbar('That email address is invalid!', 'error');
      }
      if (error.code === 'auth/weak-password') {
        showSnackbar('Password should be at least 6 characters!', 'error');
      }
      if (error.code === 'auth/operation-not-allowed') {
        showSnackbar('Signup is not enabled!', 'error');
      }
      
     //my custom snackbar
      throw error;
    }
    
  }

  function login(email, password) {
   
    return  auth.signInWithEmailAndPassword(email, password).
      then((user) => {
        if (user) {
          setCurrentUser(user);
          setisLoggedIn(true);
          showSnackbar('Login successful!', 'success');
        }
      }).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          showSnackbar('User not found!', 'error');
        }
        if (error.code === 'auth/wrong-password') {
          showSnackbar('Wrong password!', 'error');
        }
        if (error.code === 'auth/invalid-email') {
          showSnackbar('Invalid email!', 'error');
        }
        if (error.code === 'auth/user-disabled') {
          showSnackbar('User disabled!', 'error');
        }
        if (error.code === 'auth/too-many-requests') {
          showSnackbar('Too many requests!', 'error');
        }
      })
  }

  function getUserDetails() {
    const userRef = firestore.collection('USERS').doc(currentUser.uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        setUserDetails(doc.data());
        console.log('sdffd',userDetails)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }





  const services = {
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    getUserDetails,
    updatePassword
  }
  return (
    <AuthContext.Provider value={{ state, stateSetters, services }}>
       {props.children}
    </AuthContext.Provider>
  )
}

const AuthContextProvider = (props) => <div key={Date.now()} ><AuthProvider>{props.children}</AuthProvider></div>


export { AuthContextProvider, useAuthContext }
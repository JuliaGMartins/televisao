import { auth, db, firebase } from "./firebase";
import {  signInWithEmailAndPassword,
          createUserWithEmailAndPassword
} from "firebase/auth";
import { collection, getDocs, updateDoc, doc,  query, where} from 'firebase/firestore';

export const loginAuth = async (email, password) => {
  try{
    await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    return getUser();
  } catch (error){
    if(error.code === "auth/user-not-found"){
      return "User does not exist.";
    }
    if(error.code === "auth/wrong-password"){
      return "Wrong password.";
    }
    if(error.code === "auth/invalid-email"){
      return "Invalid email.";
    }
    return error.message;
  }
}

const getUser = async () => {
  let users = [];
  let user = auth.currentUser;
  let uid = user.uid;
  let usersRef = collection(db, "Users");
  let acceptedQuery = query(usersRef, where("id", "==", uid));
  
  let querySnapshot = await getDocs(acceptedQuery);
  querySnapshot.forEach(u => {
    return users.push({'data': u.data()}); 
  });
}

const createUser = async (email, password, firstName, lastName, navigation) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        firstName,
        lastName,
      };
    })
    .catch((error) => {
      console.log(error)
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 5000);
    });
};

export default { loginAuth, createUser };
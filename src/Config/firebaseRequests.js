import { auth, db, firebase } from "./firebase";
import { signInWithEmailAndPassword
} from "firebase/auth";
import { collection, getDocs, updateDoc, addDoc, doc,  query, where} from 'firebase/firestore';

// add user to database
export const addUser = async (firstName, lastName, email) => {
  await addDoc(collection(db, 'Users'), {
  name: firstName + ' ' + lastName,
  email: email,
}).then((response) => {
  console.log(response);
}).catch((error) => { console.log(error) });
}

// get ApprovedEmails emails from database
export const getApprovedEmails = async () => {
  let emails = [];
  let emailsRef = collection(db, "ApprovedEmails");
  let querySnapshot = await getDocs(emailsRef);
  querySnapshot.forEach(e => {
    emails.push(e.data().email);
  });
  return emails;
}

// get users from database
export const getUsers = async () => { 
  let users = [];
  let usersRef = collection(db, "Users");
  let querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach(u => {
    users.push(u.data());
  });
  return users;
}

// get requests from database
export const getRequests = async () => {
  let requests = [];
  let requestsRef = collection(db, "Request");
  let querySnapshot = await getDocs(requestsRef);
  querySnapshot.forEach(r => {
    requests.push(r.data());
  });
  return requests;
}

// get exams from database
export const getExams = async () => {
  let exams = [];
  let examsRef = collection(db, "Exams");
  let querySnapshot = await getDocs(examsRef);
  querySnapshot.forEach(e => {
    exams.push(e.data());
  });
  return exams;
}

// get Examiners from database
export const getExaminers = async () => {
  let examiners = [];
  let examinersRef = collection(db, "Examiners");
  let querySnapshot = await getDocs(examinersRef);
  querySnapshot.forEach(e => {
    examiners.push(e.data());
  });
  return examiners;
}

//get Ophthalmologists from database
export const getOphthalmologists = async () => {
  let ophthalmologists = [];
  let ophthalmologistsRef = collection(db, "Ophthalmologists");
  let querySnapshot = await getDocs(ophthalmologistsRef);
  querySnapshot.forEach(o => {
    ophthalmologists.push(o.data());
  });
  return ophthalmologists;
}

// get Patients from database
export const getPatients = async () => {
  let patients = [];
  let patientsRef = collection(db, "Patients");
  let querySnapshot = await getDocs(patientsRef);
  querySnapshot.forEach(p => {
    patients.push(p.data());
  });
  return patients;
}

// get Requesters from database
export const getRequesters = async () => {
  let requesters = [];
  let requestersRef = collection(db, "Requesters");
  let querySnapshot = await getDocs(requestersRef);
  querySnapshot.forEach(r => {
    requesters.push(r.data());
  });
  return requesters;
}
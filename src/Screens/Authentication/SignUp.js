import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../../Style.js';
import { firebase, auth, db } from '../../Config/firebase.js';
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { createUser } from 'firebase/auth';
import { getApprovedEmails, getUsers, addUser } from '../../Config/firebaseRequests.js';

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // remove back button from header
  const onSignupPress = async () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    // check if email already exists in Users collection
    let users = await getUsers();
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        alert("Email already registered");
        return;
      }
    }

    // check if email is approved
    let approvedEmails = await getApprovedEmails();
    if (!approvedEmails.includes(email)) {
      alert("Email not approved");
      return;
    }

    // add user to database (Users collection)
    await addUser(firstName, lastName, email);

    // create user in firebase authentication
    createUser({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User created successfully!");
        navigation.navigate('ExaminerHome', { user: user });
      })
      .catch((error) => {
        console.log(error);
        setEmailError(true);
        setTimeout(() => {
          setEmailError(false);
        }, 5000);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign up for Tele-visão</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        autoCompleteType="password"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        autoCompleteType="password"
      />
      {passwordMatchError && (password != '') && (
        <Text style={styles.error}>Passwords don't match</Text>
      )}
      {emailError && (email != '') && (
        <Text style={styles.error}>This email doesn't have permition to sign up or it's already registered</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSignupPress()}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.secondaryButtonText}>Already have an account? <Text style={styles.secondaryButtonTextHighlight}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

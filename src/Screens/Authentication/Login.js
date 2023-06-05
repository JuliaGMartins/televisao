import React, { useState, useLayoutEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { firebase, auth, db } from '../../Config/firebase.js';
import styles from '../../../Style.js';
import { signInWithEmailAndPassword
} from "firebase/auth";
import { collection, getDocs, updateDoc, doc,  query, where} from 'firebase/firestore';
import { loginAuth } from '../../Config/firebaseAuth.js';

export default function Login({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // remove back button from header
  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);


  // login firebase function
  const onLogin = async () => {
    let user = await loginAuth(email, password); 
    if (typeof user === "string") {
      alert(user);
    } else {
      navigation.navigate('ExaminerHome', { user: user });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>  
        <Text style={styles.title}>Log in to Tele-visão</Text>
      </View>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => onLogin()}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.secondaryButtonText}>Don't have and account? <Text style={styles.secondaryButtonTextHighlight}>Sign up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
// Home page examiner, where examiner can see all the request exams he need to do
// and the exams he already did

import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import { firebase, auth, db } from '../../Config/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import styles from '../../../Style.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

export default function ExaminerHome({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [examsDone, setExamsDone] = useState([]);
  const [examsDoneImages, setExamsDoneImages] = useState([]);
  const [examsImages, setExamsImages] = useState([]);
  const [examsDoneImagesURL, setExamsDoneImagesURL] = useState([]);
  const [examsImagesURL, setExamsImagesURL] = useState([]);

  // remove back button from header
  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);
  

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  }
  );

  useEffect(() => {
    getExams();
    getExamsDone();
  }
  , []);

  const getExams = async () => {
    const examsRef = collection(db, 'Exams');
    const examsSnapshot = await getDocs(examsRef);
    const examsList = examsSnapshot.docs.map((doc) => doc.data());
    setExams(examsList);
    getExamsImages(examsList);
  }

  const getExamsDone = async () => {
    const examsRef = collection(db, 'ExamsDone');
    const examsSnapshot = await getDocs(examsRef);
    const examsList = examsSnapshot.docs.map((doc) => doc.data());
    setExamsDone(examsList);
    getExamsDoneImages(examsList);
  }

  const getExamsImages = async (examsList) => {
    const storage = getStorage();
    const examsImagesURL = [];
    for (let i = 0; i < examsList.length; i++) {
      const imageRef = storage.refFromURL(examsList[i].image);
      const url = await getDownloadURL(imageRef);
      examsImagesURL.push(url);
    }
    setExamsImagesURL(examsImagesURL);
  }

  const getExamsDoneImages = async (examsList) => {
    const storage = getStorage();
    const examsDoneImagesURL = [];
    for (let i = 0; i < examsList.length; i++) {
      const imageRef = storage.refFromURL(examsList[i].image);
      const url = await getDownloadURL(imageRef);
      examsDoneImagesURL.push(url);
    }
    setExamsDoneImagesURL(examsDoneImagesURL);
  }

  const logout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error.message);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ExaminerExam', { exam: item })}
        >
          <Text style={styles.buttonText}>Do exam</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItemDone = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ExaminerExamDone', { exam: item })}
        >
          <Text style={styles.buttonText}>See exam</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => logout()}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Exams to do</Text>
      <FlatList
        data={exams}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text style={styles.title}>Exams done</Text>
      <FlatList
        data={examsDone}
        renderItem={renderItemDone}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

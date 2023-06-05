import React, { useEffect } from "react";
import { View, Animated, Easing, StyleSheet, Text } from "react-native";
import Style from "../../Style.js";
import { auth } from "../Config/firebase.js";

const HomeScreen = ({ navigation }) => {
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      loop: true,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      console.log(auth.currentUser)
      navigation.navigate("Login");
    });
  }, []);

  const circleSize = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [130, 135, 130],
  });

  const eyeSize = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [50, 60, 50]
  });

  const pupilSize = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [75, 80, 75]
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerDirection}>
        <Animated.View
          style={[
            styles.circle,
            { width: circleSize, height: circleSize },
          ]}
        />
        <Animated.View
          style={[
            styles.innerCircle, ,
            { width: pupilSize, height: pupilSize },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.eye,
            { width: eyeSize, height: eyeSize },
          ]}
        >
        </Animated.View>
        <Text style={styles.titleEye}>Welcome to the Eye Exam App!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA94C",
  },
  containerDirection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 200,
  },
  circle: {
    position: "absolute",
    margin: "auto",
    width: 300,
    height: 300,
    borderRadius: 0,
    borderBottomEndRadius: 100,
    borderTopStartRadius: 100,
    backgroundColor: "white",
    borderColor: "#0F0F0F",
    transform: [{ rotate: "45deg" }]
  },
  innerCircle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FFA94C",
    overflow: "hidden"
  },
  eye: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "#007AFF",
  },
  titleEye: {
    position: "relative",
    top: 150,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
});

export default HomeScreen;

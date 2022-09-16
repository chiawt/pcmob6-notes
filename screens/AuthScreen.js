import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { API, API_LOGIN, API_SIGNUP, HOME_STACK } from "../constants";

if (
  Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AuthScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  function resetTextInputs() {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  async function signUp() {
    setLoading(true);
    if (password != confirmPassword) {
      setErrorText("Your password dont match.");
    } else {
      try {
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });
        if (response.data.Error) {
          setLoading(false);
          setErrorText(response.data.Error);
        } else {
          login();
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response);
        setErrorText(error.response.data.description);
      } finally {
        setLoading(false);
        LayoutAnimation.spring();
      }
    }
  }

  async function login() {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      await AsyncStorage.setItem("token", response.data.access_token);
      resetTextInputs();
      navigation.navigate(HOME_STACK);
    } catch (error) {
      console.log(error.response);
      setErrorText(error.response.data.description);
    } finally {
      setLoading(false);
      LayoutAnimation.spring();
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLoginScreen ? "Login to your account" : "Sign up new account"}
      </Text>

      <TouchableOpacity style={styles.iconbutton}>
          <FontAwesome name={"user-circle-o"} size={120} color={"white"}/>
        </TouchableOpacity>

      <TextInput
        style={styles.inputView}
        placeholder="Enter your email address"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />

      <TextInput
        style={styles.inputView}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(pw) => setPassword(pw)}
      />

      {!isLoginScreen && (
        <TextInput
          style={styles.inputView}
          placeholder="Password Confirm"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(pw) => setConfirmPassword(pw)}
        />
      )}

      <TouchableOpacity
        style={loading ? styles.buttonLoading : styles.button}
        onPress={async () => {
          LayoutAnimation.spring();
          setErrorText("");
          isLoginScreen ? await login() : await signUp();
        }}
      >
        {loading ? (
          <ActivityIndicator style={styles.buttonText} />
        ) : (
          <Text style={styles.buttonText}>
            {isLoginScreen ? "Login" : "Sign up"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setIsLoginScreen(!isLoginScreen);
          setErrorText("");
        }}
      >
        <Text style={styles.switchText}>
          {isLoginScreen ? "No account? Sign up" : "Have account? Log In"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  switchText: {
    fontSize: 20,
    marginTop: 20,
    color: "gray",
  },
  iconbutton: {
    alignItems: "center",
    padding: 20
  },
  errorText: {
    marginTop: 20,
    fontSize: 15,
    color: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
    marginBottom: 10,
  },
  inputView: {
    backgroundColor: "#F1F0F5",
    borderRadius: 5,
    marginBottom: 30,
    padding: 20,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: "80%",
  },
  buttonLoading: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "20%",
    marginHorizontal: "40%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "black",
  },
});

import LoginForm from "@/components/forms/loginForm";
import RegisterForm from "@/components/forms/registerForm";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { register } from "@/redux/slice/registerSlice";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/hooks/useRedux";
import { storage } from "@/common/storage";
import Toast from "react-native-toast-message";
import { login } from "@/redux/slice/loginSlice";
import tokenHandlers from "@/utils/tokenHandlers";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const registered = useAppSelector((state) => state.register);
  const { isLoggedIn } = useAppSelector((state) => state.login);
  const { accessToken } = tokenHandlers.getTokens();

  useEffect(() => {
    if (!registered || !registered.email || showRegister === false) return;

    const storedUsers = storage.getString("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.some(
      (user: any) => user.email === registered.email
    );

    if (!userExists) {
      const updatedUsers = [...users, registered];
      storage.set("users", JSON.stringify(updatedUsers));
      Toast.show({
        type: "success",
        text1: "Successfull",
        text2: "User registered Successfully",
      });
    } else {
      Toast.show({
        type: "info",
        text1: "User Exists",
        text2: "User already exists",
      });
    }
  }, [registered]);

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      router.replace("/(authenticated)/(tabs)");
    }
  }, [isLoggedIn]);

  const goToRegister = () => {
    setShowRegister(true);
  };

  const goToLogin = () => {
    setShowRegister((prev) => !prev);
  };

  const onPressLogin = (data) => {
    const storedUsers = storage.getString("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.find((user: any) => user.email === data.email);

    console.log("userExists", userExists, users);

    if (userExists && userExists.password === data.password) {
      dispatch(login(data));
    } else {
      Toast.show({
        type: "info",
        text1: "Invalid Credentials",
        text2: "Please enter valid credentials",
      });
    }
  };

  const onPressRegister = (data: Record<string, string>) => {
    dispatch(register(data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Machine Test</Text>
      </View>
      {showRegister ? (
        <RegisterForm onRegister={onPressRegister} toLogin={goToLogin} />
      ) : (
        <LoginForm onLogin={onPressLogin} ToRegister={goToRegister} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D3D29",
  },
  header: {
    flex: 0.6,
    backgroundColor: "#1D3D29",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Login;

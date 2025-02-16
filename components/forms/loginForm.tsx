import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { zodForLogin } from "./schema";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface loginProp {
  onLogin: (data: any) => void;
  ToRegister: () => void;
}

export default function LoginForm({ onLogin, ToRegister }: loginProp) {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(zodForLogin),
  });

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 0.4,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#f5f5f5",
      }}
      keyboardShouldPersistTaps={"handled"}
      bottomOffset={insets.bottom + 100}
      contentContainerStyle={styles.formContainer}
    >
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 15,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#666"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password && <Text>This is required.</Text>}
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.rememberMe}>
          <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onLogin)}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={[styles.forgotPassword, { textAlign: "center" }]}>
        Don't have an account?{" "}
        <Text onPress={ToRegister} style={{ color: "#1D3D29" }}>
          Register
        </Text>
      </Text>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 4,
    marginRight: 5,
  },
  rememberText: {
    fontSize: 14,
    color: "#666",
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#587D50", // Greenish button
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 0.4,
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
});

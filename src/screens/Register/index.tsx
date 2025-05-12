import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../hooks/theme";
import { MaterialIcons } from "@expo/vector-icons";

const Register = () => {
  const { register } = useAuth();
  const { navigate } = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister() {
    if (!name || !email || !password) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    try {
      await register(name, email, password);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao criar conta.");
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    formContainer: {
      backgroundColor: theme.cardBackground,
      borderRadius: 15,
      padding: 30,
      width: "85%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8,
      gap: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.text,
      opacity: 0.8,
    },
    inputContainer: {
      width: "100%",
      gap: 8,
    },
    label: {
      fontSize: 16,
      color: theme.text,
      fontWeight: "500",
    },
    textInput: {
      backgroundColor: theme.inputBackground,
      padding: 14,
      borderRadius: 10,
      borderColor: theme.inputBorder,
      borderWidth: 1,
      fontSize: 16,
      color: theme.text,
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      borderColor: theme.inputBorder,
      borderWidth: 1,
      paddingHorizontal: 10,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 14,
      fontSize: 16,
      color: theme.text,
    },
    button: {
      width: "100%",
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.button,
      marginTop: 10,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: "600",
    },
    secondaryButton: {
      backgroundColor: theme.button,
    },
    errorText: {
      color: "red",
      marginTop: -10,
    }
  });
  return (
    <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Bem-vindo ao TaskManager</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setName}
            value={name}
            placeholder="Digite seu nome aqui"
            placeholderTextColor={theme.placeholder}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            placeholder="Digite seu email aqui"
            placeholderTextColor={theme.placeholder}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={setPassword}
              value={password}
              placeholder="Digite sua senha aqui"
              placeholderTextColor={theme.placeholder}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color={theme.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigate("Login")}
        >
          <Text style={styles.buttonText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Register;

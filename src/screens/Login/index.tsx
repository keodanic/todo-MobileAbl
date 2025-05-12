import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Alert, 
  TouchableOpacity 
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../hooks/theme";
import { themes } from "../../colors/theme";

const Login = () => {
  const { login } = useAuth();
  const { navigate } = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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
      borderColor:theme.inputBorder,
      borderWidth: 1,
      fontSize: 16,
      color: theme.text,
    },
    button: {
      width: "80%",
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.button,
      marginTop: 5,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  async function handleLogin() {
    try {
      await login(user, password);
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Não foi possível fazer login");
    }
  }

  return (
    <LinearGradient colors={[theme.primary,theme.secondary]} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuário:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setUser}
            value={user}
            placeholder="Digite seu email aqui"
            placeholderTextColor={theme.placeholder}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="Digite sua senha aqui"
            placeholderTextColor={theme.placeholder}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button]}
          onPress={() => navigate("Register")}
        >
          <Text style={styles.buttonText}>Não tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Login;
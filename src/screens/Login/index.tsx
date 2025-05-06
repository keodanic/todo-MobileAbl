import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const { login } = useAuth();
  const { navigate } = useNavigation<NavigationProp<any>>();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await login(user, password);
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Não foi possível fazer login");
    }
  }

  return (
    <LinearGradient colors={["#b9b9b9", "#252525"]} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuário:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setUser}
            value={user}
            placeholder="Digite seu email aqui"
            placeholderTextColor="#a0a0a0"
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
            placeholderTextColor="#a0a0a0"
            secureTextEntry
          />
        </View>

        <Button title="Entrar" color="#b9b9b9" onPress={handleLogin} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "#ffffff",
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
    color: "#333",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default Login;

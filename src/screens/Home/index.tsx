import { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useAuth } from "../../hooks/auth";
import { AntDesign,MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/theme";

const HomePage = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [tasks, setTasks] = useState<any[]>([]);
  const { user, PostTask, getTasks, DeleteTask, logout, editTask } =
    useAuth();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      await PostTask(title);
      setTitle("");
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro de logout");
    }
  };

  const handleEditTask = async (id: string) => {
    try {
      await editTask(id);
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao marcar tarefa como concluída:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await DeleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const styles = StyleSheet.create({
     container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
    formContainer: {
      backgroundColor: theme.cardBackground,
      borderRadius: 20,
      padding: 20,
      width: "100%",
      maxWidth: 500,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 10,
      flex: 1,
      marginTop: 30,
    },
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 2,
      letterSpacing: 0.5,
    },
    inputContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 25,
    },
    input: {
      flex: 1,
      backgroundColor: theme.inputBackground,
      padding: 14,
      borderRadius: 10,
      borderColor: theme.inputBorder,
      borderWidth: 1,
      fontSize: 16,
      color: theme.text,
    },
    addButton: {
      backgroundColor: theme.button,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    addButtonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: "600",
    },
    taskList: {
      width: "100%",
    },
    taskCard: {
      backgroundColor: theme.cardBackground,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      borderColor: theme.inputBorder,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    taskText: {
      fontSize: 16,
      color: theme.text,
      flex: 1,
    },
    taskCompleted: {
      textDecorationLine: "line-through",
      color: theme.placeholder,
    },
    actions: {
      flexDirection: "row",
      gap: 10,
    },
    actionButton: {
      padding: 6,
    },
    emptyText: {
      fontSize: 16,
      color: theme.placeholder,
      textAlign: "center",
      marginTop: 20,
    },
    themeToggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 25,
    },
  });

  return (
    <LinearGradient 
      colors={[theme.primary, theme.secondary]} 
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Minhas Tarefas</Text>
          <View style={styles.themeToggleContainer}>
            <TouchableOpacity onPress={toggleTheme}>
              <MaterialIcons 
                name={isDark ? "wb-sunny" : "nights-stay"} 
                size={24} 
                color={theme.text} 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <AntDesign name="logout" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            style={styles.input}
            onChangeText={setTitle}
            placeholder="Digite sua tarefa"
            placeholderTextColor={theme.placeholder}
            autoCapitalize="sentences"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddTask(title)}
          >
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.taskList}>
          {tasks.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma tarefa adicionada</Text>
          ) : (
            tasks.map((item: any, index) => (
              <View key={index} style={styles.taskCard}>
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.taskCompleted,
                  ]}
                >
                  {item.title}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => handleEditTask(item.id)}
                    style={styles.actionButton}
                  >
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      color={item.completed ? "#2ecc71" : theme.text}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteTask(item.id)}
                    style={styles.actionButton}
                  >
                    <AntDesign name="delete" size={20} color="#e63946" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default HomePage;
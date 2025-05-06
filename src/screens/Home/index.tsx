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
import { AuthContext } from "../../context/authcontext";

const HomePage = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://192.168.3.236:3333/task");
      const taskTitles = response.data.map((t: any) => t.title);
      setTasks(taskTitles);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };


  const handleAddTask = async () => {
    if (!task.trim()) return;

    try {
      await axios.post("http://192.168.3.236:3333/task", { title: task });
      setTasks((prev) => [...prev, task]);
      setTask("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Erro ao criar tarefa");
    }
  };

  return (
    <LinearGradient colors={["#b9b9b9", "#252525"]} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={task}
            style={styles.input}
            onChangeText={setTask}
            placeholder="Digite sua tarefa"
            placeholderTextColor="#a0a0a0"
            autoCapitalize="sentences"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.taskList}>
          {tasks.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma tarefa adicionada</Text>
          ) : (
            tasks.map((item, index) => (
              <View key={index} style={styles.taskCard}>
                <Text style={styles.taskText}>{item}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#252525",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  taskList: {
    width: "100%",
  },
  taskCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomePage;
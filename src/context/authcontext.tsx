import axios from 'axios'
import { api } from '../services/api'
import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string
  token: string
}

type AuthContextProps = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  getTasks: () => Promise<any[]>
  DeleteTask: (id: string) => Promise<any>
  editTask: (id: string) => Promise<any>
  register: (name: string, email: string, password: string) => Promise<void>
  PutTask: (id: string, title: string) => Promise<any>
  PostTask: (title: string) => Promise<any>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

   useEffect(() => {
    async function getStorageData() {
      const userStorage = await AsyncStorage.getItem('@token1234$%');
      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
    }
    getStorageData();
  }, []);

  async function login(email: string, password: string) {
    try {
      const response = await api.post('session', {
        email,
        password,
      })
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('@token1234$%', JSON.stringify(response.data));
        setUser(response.data);
      } else {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error: any) {
      if (error.response) {
         if (error.response.status === 401 || error.response.status === 400) {
          throw new Error('Credenciais inválidas. Verifique seu email e senha.');
        } else {
          throw new Error('Falha na conexão. Tente novamente mais tarde.');
        }
      }
  }
}
  async function register(name:string,email: string, password: string) {
    try {
      const response = await api.post('users', {
        name,
        email,
        password
      })
      await login(email,password)
    } catch (error) {
      console.error("Erro no cadastro:", error)
      alert("Cadastro deu errado, pouraaaa")
    }
  }

  async function logout() {
    await AsyncStorage.removeItem('@token1234$%');
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  async function getTasks() {
    if (!user?.token) {
      console.log('Usuário ou token não encontrados');
      return;
    }
    try {
      const response = await api.get('tasks',{ headers: { Authorization: `Bearer ${user?.token}` } })
      return response.data
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error)
      alert("Deu errado, poura")
    }
  }

  async function PostTask(title:string) {
    if (!user?.token) {
      console.log('Usuário ou token não encontrados');
      return;
    }
      try {
        const response = api.post("tasks", { title },
          { headers: { Authorization: `Bearer ${user?.token}` } });
          return response
      }
      catch(error: any){
        throw new Error(error)
      }
    }
    async function editTask(id:string) {
      if(!user?.token){
        console.log("usuarios ou token não encontrados")
        return;
      }
      try{
        const response = api.patch(`tasks/${id}/edit`,
          []
          ,
          { headers: { Authorization: `Bearer ${user?.token}`} })
        return response
      }
      catch{
        alert("errou")
      }
    }
  async function PutTask(id:string,title:string) {
    if (!user?.token) {
      console.log('Usuário ou token não encontrados');
      return;
    }
    try {
      const response = await api.put(`tasks/${id}`, {title},
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      return response
    }
    catch{
      alert("ERRO DEIXA DE SER BURRO")
    }
  }
  async function  DeleteTask(id:string) {
    if (!user?.token) {
      console.log('Usuário ou token não encontrados');
      return;
    }
    try {
      const response = await api.delete(`tasks/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      return response
    }
    catch {
      alert("burro errrouuuuu")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getTasks,register,PutTask,DeleteTask,PostTask,editTask}}>
      {children}
    </AuthContext.Provider>
  )
}

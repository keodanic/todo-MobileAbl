import axios from 'axios'
import { api } from '../services/api'
import React, {
  createContext,
  useState,
  PropsWithChildren
} from 'react'

type User = {
  email: string
  token: string
}

type AuthContextProps = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  getTasks: () => Promise<void>
  DeleteTask: (id:string) => Promise<any>
  register: (name:string,email: string, password: string) => Promise<void>
  PutTask: (id:string,title: string) => Promise<any>
  PostTask:(title: string) => Promise<any>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  async function login(email: string, password: string) {
    try {
      const response = await api.post('session', {
        email,
        password,
      })

      const token = response.data.token

      const userData: User = {
        email,
        token,
      }

      setUser(userData)

    
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      console.log("Logado com sucesso:", userData)
    } catch (error) {
      console.error("Erro no login:", error)
      alert("Login deu errado, pouraaaa")
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
      console.log("Tarefas:", response.data)
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
        alert("errou otaro")
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
      const response = await api.delete(`task/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      return response
    }
    catch {
      alert("burro errrouuuuu")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getTasks,register,PutTask,DeleteTask,PostTask}}>
      {children}
    </AuthContext.Provider>
  )
}

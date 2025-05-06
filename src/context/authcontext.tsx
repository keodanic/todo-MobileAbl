import axios from 'axios'
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
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  async function login(email: string, password: string) {
    try {
      const response = await axios.post('http://localhost:3333/session', {
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

  async function logout() {
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  async function getTasks() {
    try {
      const response = await axios.get('http://localhost:3333/tasks')
      console.log("Tarefas:", response.data)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error)
      alert("Deu errado, poura")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getTasks }}>
      {children}
    </AuthContext.Provider>
  )
}

import axios from 'axios'
import { api } from '../services/api'
import React, { createContext, useState, PropsWithChildren, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  email: string
  token: string
  name:string
}

type AuthContextProps = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getStorageData() {
      const userStorage = await AsyncStorage.getItem('@token1234$%')
      if (userStorage) setUser(JSON.parse(userStorage))
    }
    getStorageData()
  }, [])

  async function login(email: string, password: string) {
    try {
      const response = await api.post('session', { email, password })

      if (response.data && response.data.token) {
        await AsyncStorage.setItem('@token1234$%', JSON.stringify(response.data))
        setUser(response.data)
      } else {
        throw new Error('Resposta inválida do servidor')
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status
        if (status === 400 || status === 401) {
          throw new Error('Credenciais inválidas. Verifique seu email e senha.')
        } else if (status >= 500 && status <= 599) {
          throw new Error('Servidor indisponível. Tente novamente mais tarde.')
        } else {
          throw new Error('Erro inesperado. Tente novamente.')
        }
      } else {
        throw new Error('Falha na conexão. Verifique sua internet e tente novamente.')
      }
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const response = await api.post('users', { name, email, password })
      await login(email, password)
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status
        if (status === 409) {
          throw new Error('Usuário já existente. Tente outro email.')
        } else if (status >= 500 && status <= 599) {
          throw new Error('Servidor indisponível. Tente novamente mais tarde.')
        } else {
          throw new Error('Erro inesperado no cadastro.')
        }
      } else if (error.request) {
        throw new Error('Falha na conexão. Verifique sua internet e tente novamente.')
      } else {
        throw new Error('Erro desconhecido ao tentar cadastrar.')
      }
    }
  }

  function logout() {
    AsyncStorage.removeItem('@token1234$%')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

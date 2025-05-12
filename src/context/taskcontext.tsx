import React, { createContext, PropsWithChildren, useContext } from 'react'
import { api } from '../services/api'
import { useAuth } from '../hooks/auth'

type TaskContextProps = {
  getTasks: () => Promise<any[]>
  PostTask: (title: string) => Promise<any>
  PutTask: (id: string, title: string) => Promise<any>
  DeleteTask: (id: string) => Promise<any>
  editTask: (id: string) => Promise<any>
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps)

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()
  
  async function getTasks() {
    if (!user?.token) return []
    try {
      const response = await api.get('tasks', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
      alert('Erro ao carregar tarefas.')
      return []
    }
  }

  async function PostTask(title: string) {
    if (!user?.token) return
    try {
      const response = await api.post(
        'tasks',
        { title },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function PutTask(id: string, title: string) {
    if (!user?.token) return
    try {
      const response = await api.put(
        `tasks/${id}`,
        { title },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      return response
    } catch {
      alert('Erro ao atualizar tarefa.')
    }
  }

  async function DeleteTask(id: string) {
    if (!user?.token) return
    try {
      const response = await api.delete(`tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      return response
    } catch {
      alert('Erro ao excluir tarefa.')
    }
  }

  async function editTask(id: string) {
    if (!user?.token) return
    try {
      const response = await api.patch(`tasks/${id}/edit`, [], {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      return response
    } catch {
      alert('Erro ao editar tarefa.')
    }
  }

  return (
    <TaskContext.Provider
      value={{ getTasks, PostTask, PutTask, DeleteTask, editTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

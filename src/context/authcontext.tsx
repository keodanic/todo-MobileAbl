import axios from 'axios';
import React, {createContext,useEffect,useState,PropsWithChildren} from 'react'


type User = {
  accessToken:string ,
  username:string,
  password:string,
}

type AuthContextProps = {
  user:User | null;
  login:(email:string,password:string) => Promise<void>;
  logout: () => void;
  getTasks:() => void;

}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user,setUser] = useState<User | null>(null);

  async function login(email:string,password:string){
    try{
      const response = await axios.post('https://localhost:3000',{email,password});
      setUser(response.data);
      console.log(user)
      return response.data
    }
    catch {
      return alert("login deu errado pouraaaaa")
    }
  }
  async function logout() {
    setUser(null)
  }
  async function getTasks() {
    try{
      const response = await axios.get('https://localhost:3000')
      console.log(response.data)
      return response.data.title
    }
    catch{
      return alert('deu errado poura')
    }
    
  }
  return(
    <AuthContext.Provider value={{user,login,logout,getTasks}}>
      {children}
    </AuthContext.Provider>


  )
  
}
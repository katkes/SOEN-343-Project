import React, { useState } from "react"
import { Main } from "../layouts/Main"
import { authService } from "../services/backend/auth";
import { useNavigate } from "react-router";
import { FrontEndRoutes } from "./routes";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();
    
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hey there")
    const isLoggedIn = await authService.login({ email, password })
    if (isLoggedIn) {
      navigate(FrontEndRoutes.Dashboard)
    } else {
      setErrMsg("Invalid credentials");
    }
  }
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => (
    setEmail(e.target.value)
  )
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => (
    setPassword(e.target.value)
  )
  return (
    <Main>
      <form onSubmit={onSubmit}>
        <input value={email} type="text" placeholder="email" onChange={onChangeEmail}/>
        <br/>
        <input value={password} type="password" onChange={onChangePassword}/>
        <br/>
        <button type="submit" >Login</button>
        <br/>
        <p>{errMsg}</p>
      </form>
    </Main>
  )
}
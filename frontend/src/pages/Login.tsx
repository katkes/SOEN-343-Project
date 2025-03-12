import React from "react"
import { Main } from "../layouts/Main"

export const Login: React.FC = () => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    }

    return (
        <Main>
            <input type="text" placeholder="username"/>
            <br/>
            <input type="password" />
            <br/>
            <button onSubmit={onSubmit}>Login</button>
        </Main>
    )
}
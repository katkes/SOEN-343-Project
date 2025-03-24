import React from "react";
import { Main } from "../layouts/Main";
import { Link } from "react-router";
import { FrontEndRoutes } from "./routes";

export const Home: React.FC = () => {
  return (
    <Main>
      <h1>Home Page</h1>
      <p><Link to={FrontEndRoutes.Login}>Login</Link></p>
      <p><Link to={FrontEndRoutes.SignUp}>SignUp</Link></p>
    </Main>
  );
}
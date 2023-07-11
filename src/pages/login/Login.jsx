import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@mui/material"

export default function Login() {
  const email=useRef();
  const password=useRef();
  const {user,isFetching,error,dispatch} =useContext(AuthContext);
  
  const handleClick=(e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">ConnectHub</h3>
            <span className="loginDesc">Chatting made effortless, conversations made memorable.</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Email" type="email" required className="loginInput" ref={email}></input>
                <input placeholder="Password" type="password" required minLength={6} className="loginInput" ref={password}></input>
                <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress/>: "Login"}</button>
                <span className="loginForgot">Forget Password?</span>
                <button className="loginRegisterButton">{isFetching ? <CircularProgress/>: "Create a New Account"}</button>
            </form>
        </div>
      </div>
    </div>
  )
}

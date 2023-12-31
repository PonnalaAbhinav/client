import { useRef } from "react"
import "./register.css"
import axios from "axios";
import {useHistory, useNavigate} from "react-router-dom"

export default function Register() {
  const username=useRef();
  const email=useRef();
  const password=useRef();
  const passwordAgain=useRef();
  const navigate=useNavigate()

  const handleClick= async (e)=>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    }else{
      const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
      }
      try{
        await axios.post("/authentication/register",user);
        navigate("/login")
      }catch(err){
        console.log(err);
      }
      
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">ConnectHub</h3>
            <span className="loginDesc">Chatting made effortless, conversations made memorable.</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Username" required ref={username} className="loginInput"></input>
                <input placeholder="Email" required ref={email} className="loginInput" type="email"></input>
                <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength={6}></input>
                <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password"></input>
                <button className="loginButton" >Sign Up</button>
                <button className="loginRegisterButton">Login into Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}

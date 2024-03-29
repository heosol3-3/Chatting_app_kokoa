import React, { useState, useEffect } from 'react'
import {authService} from '../fbase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { FaComment, FaGithub, FaGoogle } from 'react-icons/fa';

import "../styles/auth.scss"

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true); // true 회원가입, false 로그인
  const [error, setError] = useState('');

  const onChange = (e) => {
    const {target:{name, value}} = e;
    if(name ==='email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value)
    }
  } 

  const onSubmit = async (e) => {
    e.preventDefault();

    try{
      let data;
      if(newAccount){
        //회원가입
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch(error) {
      console.log('error->', error);
      switch(error.code) {
        case "auth/wrong-password":
          setError("Wrong Password !");
          break;
        case "auth/user-not-found":
          setError("Wrong Email ! Please try again !");
          break;
        case "auth/email-already-in-use":
          setError("The email is already in use !");
          break;
        case "auth/weak-password":
          setError("The password must be at least 6 characters long.")
          break;
        // 그 외의 에러일 경우
        default:
          setError("Error! Please try again !");
          break;
      }
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev)

  const onSocialClick = async (e) => {

    let provider
    const {target:{name}} = e
    if(name === "google"){
      provider = new GoogleAuthProvider();

    }else if(name === "github"){
      provider = new GithubAuthProvider();

    }
    const data = await signInWithPopup(authService, provider)
    console.log('data ->',data)
  }

  useEffect(() => {
    if(error !== ""){
      setTimeout(() => {
        setError("");
      }, 3000); // 3초 후에 error 값을 빈 문자열로 변경
    }
  }, [error]);


  return (
    <>
      <div className='container'>
        <div className='title_container'>
          <span className='titleBg'><FaComment /><span className='titleContent'>Kokoatalk</span></span>

          <form className='login_form' onSubmit={onSubmit}>
            {error && <div className="error_msg">{error}</div>}
            <input className='input_email' name="email" type="email" placeholder = "Email" autoComplete='off' required value={email} onChange={onChange} />
            <input className='input_password' name="password" type="password" placeholder = "Password" required value={password} onChange={onChange}/>
            <div className="input_submit_container">
              <input className='input_submit' type="submit" value = {newAccount ? "Create Account" : "Log In"}/>
            </div>
          </form>
          <span className='toggleAccount' onClick={toggleAccount}>
            {newAccount ? "Toggle to Sign In" : " Toggle to Create Account" }
          </span>
          <div>
            <button name="google" onClick={onSocialClick}>Continue with Google<FaGoogle /></button>
            <button name="github" onClick={onSocialClick}>Continue with GitHub<FaGithub /></button>
          </div>
        </div>
        
      </div>
    </>
  )
  
}

export default Auth

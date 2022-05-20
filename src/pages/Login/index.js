import React, { useState, useRef } from 'react'

import Avatar from '../../assets/images/avatar.jpeg'
import UserIcon from '../../assets/images/user.webp'
import KeyIcon from '../../assets/images/key.png'
import { authentificate } from '../../services/User'

import './styles.css'

function Login(props) {
  const [isPending, setIsPending] = useState(false)
  const form = useRef(null)

  const handleAuthentification = (event) => {
    event.preventDefault()
    setIsPending(true)

    const formData = new FormData(form.current)
    authentificate(formData)
  }

  return (
    <div>
      <div id="container" className="Container .d-flex vh-100 w-100">
        <div id="wrapper" className="d-flex align-items-center justify-content-center h-100">
          <div id="card" className="d-flex flex-column align-items-center justify-content-center p-4 rounded text-center">
            <img className="rounded-circle" width="75px" height="75px" src={Avatar} id="avatar" alt="avatar" />
            <h1 className="title mt-3 mb-3">User Log in</h1>
            <form ref={form} className="form d-flex flex-column align-items-center justify-content-center" id="form">
              <div className="inputWithIcon w-100 mb-3">
                <input id="email" type="text" name="email" placeholder="User ID" className="border-0 p-3 rounded" />
                <img src={UserIcon} className="icon" width="20px" height="20px" alt="avatar" />
              </div>
              <div className="inputWithIcon w-100 mb-3">
                <input id="password" type="password" name="password" placeholder="Password" className="border-0 p-3 rounded" />
                <img src={KeyIcon} className="icon" width="20px" height="20px" alt="avatar" />
              </div>
              <button id="submit" onClick={handleAuthentification} className="d-flex align-items-center justify-content-center mb-3 border-0 rounded">
                {isPending ? (
                  <svg id="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45"/>
                  </svg>
                ) : (
                  <p id="buttonText" className="mb-0 text-white">LOGIN</p>
                )}
              </button>
            </form>
            <p className="mb-0">Forgot <a className="text-decoration-none" href="/forgetPassword.html">Password</a>?</p>
            <p className="mb-0">Don't have an account ? <a className="text-decoration-none" href="/pages/register/index.html">Click here</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

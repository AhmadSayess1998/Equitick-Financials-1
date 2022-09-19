import React, { useState, useEffect } from "react";
import "./login.css";
import Logo from "../images/logo.jpeg"
import AOS from "aos";
import "aos/dist/aos.css";
import {useLogin} from '../hooks/useLogin'



function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }


  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="login">
      <div className="first-section">
        <img
          data-aos="fade-right"
          data-aos-duration="1500"
          src={Logo}
          alt=""
        />
        <h1 data-aos="fade-right" data-aos-duration="1500">
        Equitick Financials
        </h1>
        <h5 data-aos="fade-right" data-aos-duration="1500">
        Equitick is a market leader in building 
        </h5>
        <h5 data-aos="fade-right" data-aos-duration="1500">
        brokerage houses from scratch
        </h5>
      </div>
      <div className="second-section">
        {/* <img
          data-aos="fade-down"
          data-aos-duration="1500"
          src={Logo}
          alt=""
        /> */}
        <div data-aos="fade-left" data-aos-duration="1500">
          <h1>Sign in to Equitick Financials</h1>
        
        </div>
        <form onSubmit={handleSubmit}>
          <input
            data-aos="fade-left"
            data-aos-duration="1500"
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            name="email"
            placeholder="Enter Your Email"
          />
          <input
            data-aos="fade-left"
            data-aos-duration="1500"
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            name="password"
            placeholder="Enter Your Password"
          />
          <button
            data-aos="fade-left"
            data-aos-duration="1500"
            type="submit"
            name="login"
          >
            LOGIN
          </button>
          {/* {error && <div className="error">{error}</div>} */}
        </form>
      </div>
    </div>
  );
}

export default Login;

import './Login.css';
import PostLogin from './PostLogin.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../utilities/firebase';
import FormElements from '../FormElements/FormElements';
import { Row, Col, Button } from 'antd';

function Login({hasSignedUp = true, isUserSignedIn = false}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordErrors, setPasswordErrors] = useState([
    {
      id: 0,
      text: "Your password must be at least 8 characters",
      isVisible: false,
      hasError: (p) => p.length < 8,
      isApiResponsePlaceholder: false,
    },
    {
      id: 1,
      text: "Your password must contain at least one uppercase letter.",
      isVisible: false,
      hasError: (p) => p.search(/[A-Z]/) < 0,
      isApiResponsePlaceholder: false,
    },
    {
      id: 2,
      text: "Your password must contain at least one lowercase letter.",
      isVisible: false,
      hasError: (p) => p.search(/[a-z]/) < 0,
      isApiResponsePlaceholder: false,
    },
    {
      id: 3,
      text: "Your password must contain at least one digit.",
      isVisible: false,
      hasError: (p) => p.search(/[0-9]/) < 0,
      isApiResponsePlaceholder: false,
    },
    {
      id: 4,
      text: "Your confirmation password must match your password.",
      isVisible: false,
      hasError: (password, confirmation) => confirmation && password !== confirmation,
      isApiResponsePlaceholder: false,
    },
    {
      id: 5,
      text: "API Error Placeholder Text",
      isVisible: false,
      hasError: () => false,
      isApiResponsePlaceholder: true,
    }
  ]);
  const loginItems = [
    {id: 0, element: 'input', type: 'text', name: 'email', placeholder: 'Email Address'},
    {id: 1, element: 'input', type: 'password', name: 'password', placeholder: 'Password'},
  ]

  const signupItems = [
    ...loginItems,
    {id: 2, element: 'input', type: 'password', name: 'confirmPassword', placeholder: 'Confirm Password'},
  ]

  function handleInputChange(event) {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
    });
  }

  function validatePassword(password, confirmation){
    const errors = [...passwordErrors];
    let isValidPassword = true;
    errors.forEach((item, index) => {
      let hasError = item.hasError(password, confirmation);
      if(hasError){
        isValidPassword = false;
      }
      errors[index] = {...item, isVisible: hasError};
    });
    setPasswordErrors(errors);
    return isValidPassword;
  }

  function showAPIResponseError({message}){
    const errors = [...passwordErrors];
    errors.forEach((item, index) => {
      if(item.isApiResponsePlaceholder){
        item.text = message;
        errors[index] = {...item, isVisible: true};
      }
    })
    setPasswordErrors(errors);
  }

  async function onLoginFormSubmit(event) {
    let {email, password} = formData;
    if(validatePassword(password)){
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => showAPIResponseError(error));
    }
  };

  async function onSignupFormSubmit(event){
    event.preventDefault();
    let {email, password, confirmPassword} = formData;
    if(validatePassword(password, confirmPassword)){
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => showAPIResponseError(error));
    }
  };

  return (
    <div>
      {
        hasSignedUp ?
        <form className="Login">
          <Row align="middle">
            <Col span={24} md={14}>
              <div className="loginImage"></div>
            </Col>
            <Col offset={1} span={22} md={8} className="loginForm-InputContainer">
              <h1>Welcome Back.</h1>
              <p>We've missed you. Log in to find your mental health providers, dentists, opticians, and more.</p>
              <FormElements formItems={loginItems} handleChangeEvent={handleInputChange} />
              <Button type="primary" onClick={onLoginFormSubmit} block>Login</Button>
              <PostLogin messages={passwordErrors} hasPassedValidation={isUserSignedIn} hasSignedUp={hasSignedUp}/>
            </Col>
          </Row>
        </form>
        :
        <form className="Signup">
          <Row align="middle">
            <Col span={24} md={14}>
              <div className="loginImage signupImage"></div>
            </Col>
            <Col offset={1} span={22} md={8} className="loginForm-InputContainer">
            <h1>Sign Up</h1>
              <FormElements formItems={signupItems} handleChangeEvent={handleInputChange} />
              <Button type="primary" onClick={onSignupFormSubmit} block>Submit</Button>
              <div className="redirectText">Already have an account? <Link to="/login">Log In</Link></div>
              <PostLogin messages={passwordErrors} hasPassedValidation={isUserSignedIn} hasSignedUp={hasSignedUp}/>
            </Col>
          </Row>
        </form>
      }
    </div>
  );
}

export default Login;

/**
 * Firebase authentication + React references:
 * https://blog.usejournal.com/authentication-is-hard-let-google-handle-it-for-you-503f23315d07
 * https://github.com/ovieokeh/firebase-tut
 */

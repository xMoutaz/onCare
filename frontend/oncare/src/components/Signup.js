import React, {useRef, useState} from "react";
import {Card,Button,Form, Alert} from 'react-bootstrap'
import { useAuthentication } from "./authenticationContext";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";

export default function Signup() {
    const fullNameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const passConfirmRef = useRef()
    const { setCurrentUser } = useAuthentication()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    function signupReq(email, password, fullName) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password, fullName: fullName})
      };
      setError("");
      setLoading(true);
     fetch("http://localhost:5000/api/v1/register", requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          if (!data.user) {
              const error = data.message;
              return Promise.reject(error);
          }
          setCurrentUser(data.user);
          history.push("/");
          })
          .catch(error => {
              console.error('There was an error!', error);
              setError("Error while registering, try again later!");
              setLoading(false)
          });
  }

     function handleSubmit(e) {
      e.preventDefault()
      if (passRef.current.value !== passConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
      signupReq(emailRef.current.value, passRef.current.value, fullNameRef.current.value);
      setLoading(false)
    }
  
    return (
      <Container  className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="name" ref={fullNameRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passRef} required minLength={8}/>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? 
          <Link to="/login">Log In Now!</Link>
        </div>
        </div>
      </Container>
    )
  }
  
  
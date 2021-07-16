import React, {useRef, useState} from "react";
import {Card,Button,Form, Alert} from 'react-bootstrap'
import { useAuthentication } from "./authenticationContext";
import {Link, useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";

export default function Login() {
    const emailRef = useRef()
    const passRef = useRef()
    const { setCurrentUser } = useAuthentication();
    const { setJwt } = useAuthentication();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function loginReq(email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
        setError("");
        setLoading(true);
       fetch("http://localhost:5000/api/v1/login", requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!data.ok) {
                const error = data.message;
                return Promise.reject(error);
            }
            setCurrentUser(data.user);
            setJwt(data.authToken);
            history.push("/");
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError("Password or Email is not valid!");
                setLoading(false)
            });
    }

     function handleSubmit(e) {
      e.preventDefault();
      loginReq(emailRef.current.value, passRef.current.value);
    }
  
    return (
      <Container  className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log in</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Not registered yet?
          <Link to="/signup">Register Now!</Link>
        </div>
        </div>
      </Container>
    )
  }
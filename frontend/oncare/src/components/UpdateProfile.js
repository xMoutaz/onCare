import React, {useRef, useState} from "react";
import {Card,Button,Form, Alert} from 'react-bootstrap'
import { useAuthentication } from "./authenticationContext";
import {Link, useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";

export default function UpdateProfile() {
    const fullNameRef = useRef()
    const emailRef = useRef()
    const { setCurrentUser } = useAuthentication()
    const { currentUser } = useAuthentication()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function editUserInfo(id,email,fullName) {
      const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, fullName: fullName})
      };
      setError("");
      setLoading(true);
     fetch('http://localhost:5000/api/v1/users/'+id, requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          if (!data.user) {
              const error = data.message;
              return Promise.reject(error);
          }
          if (data.user) {
            setCurrentUser(data.user);
            history.push("/");
            }
          })
          .catch(error => {
              console.error('There was an error!', error);
              setError("There was an error, try again Later!");
              setLoading(false)
          });
  }


     function handleSubmit(e) {
      e.preventDefault();
      if ((fullNameRef.current.value && fullNameRef.current.value !== currentUser.fullNameRef) ||
         (emailRef.current.value && emailRef.current.value !== currentUser.emailRef)) {
        editUserInfo(currentUser.id,emailRef.current.value ,fullNameRef.current.value);
      } else { 
          setError('You have to change email or fullName to update!')
        }
    }
  
    return (
      <Container  className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile Info</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="name" ref={fullNameRef} required defaultValue={currentUser.fullName}/>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3 secondary" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </Container>
    )
  }
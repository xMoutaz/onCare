import React, {useRef, useState, useEffect, useCallback} from "react";
import {Card,Button,Form, Alert} from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";
import { useParams } from "react-router";

export default function EditUserInfo() {
    const fullNameRef = useRef()
    const emailRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {id} = useParams();
    const [user, setUser] = useState({email: null, fullName: null, id: null});

    const fetchUser = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/users/${id}`);
        const { user } = await response.json();
        return user;
    };

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
            history.push("/Users");
            }
          })
          .catch(error => {
              console.error('There was an error!', error);
              setError("There was an error, try again Later!");
              setLoading(false)
          });
    }

    const loadUsers = useCallback(() => {
        fetchUser().then(setUser);
      }, []);
      useEffect(loadUsers, [loadUsers]);
      
     function handleSubmit(e) {
      e.preventDefault();
        editUserInfo(id,emailRef.current.value ,fullNameRef.current.value);
    }

    return (
      <Container  className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update User's Info</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="name" ref={fullNameRef} defaultValue={user.fullName} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} defaultValue={user.email} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/Users">Back</Link>
          </div>
        </div>
      </Container>
    )
  }
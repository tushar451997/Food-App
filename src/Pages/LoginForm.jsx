import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, CardBody, CardTitle, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username && !password) {
            setError('Please enter username and password');
            return;
        }
        else if (!username) {
            setError('Please enter username');
            return;
        }
        else if (!password) {
            setError('Please enter password');
            return;
        }
        const userData = JSON.parse(localStorage.getItem('users'));
        if (!userData) {
            setError('No users found');
            return;
        }
        const user = userData.find((user) => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', true)
            window.location.href = '/';
        } else {
            setError('Invalid username or password');
        }
    };

    const handleChange = (e) => {
        setError('')
        if (e.target.id === 'password') {
            setPassword(e.target.value)
        }
        if (e.target.id === 'username') {
            setUsername(e.target.value)
        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
            <Row>
                <Col md={16}>
                    <Card className="shadow p-3 mb-5 bg-white rounded">
                        <CardBody>
                            <CardTitle className="text-center">Login</CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={username} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={handleChange} />
                                </Form.Group>
                                {error && (
                                    <Alert variant="danger" style={{ marginBottom: 10, marginTop: 20 }}>
                                        {error}
                                    </Alert>
                                )}
                                <Button variant="primary" type="submit" className="btn-block mt-3">
                                    Login
                                </Button>
                            </Form>
                            <p className="text-center">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;
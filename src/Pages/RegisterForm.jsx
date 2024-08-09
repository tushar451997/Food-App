import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, CardBody, CardTitle, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name && !username && !password) {
            setError('Please enter all fields');
            return;
        }
        else if (!name) {
            setError('Please enter name');
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
        let userData = JSON.parse(localStorage.getItem('users'));
        if (!userData) {
            userData = [];
        }
        const user = userData.find((user) => user.username === username);
        if (user) {
            setError('Username already exists');
            return;
        }
        const newUser = { name, username, password };
        userData.push(newUser);
        localStorage.setItem('users', JSON.stringify(userData));
        setError('User created successfully');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    };

    const handleChange = (e) => {
        setError('')
        if (e.target.id === 'name') {
            setName(e.target.value)
        }
        if (e.target.id === 'username') {
            setUsername(e.target.value)
        }
        if (e.target.id === 'password') {
            setPassword(e.target.value)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
            <Row>
                <Col md={16}>
                    <Card className="shadow p-3 mb-5 bg-white rounded">
                        <CardBody>
                            <CardTitle className="text-center">Register</CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={username} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={handleChange} />
                                </Form.Group>
                                {error && (
                                    <Alert variant={error === 'User created successfully' ? 'success' : 'danger'} style={{ marginBottom: 10, marginTop: 20 }}>
                                        {error}
                                    </Alert>
                                )}
                                <Button variant="primary" type="submit" className="btn-block mt-3">
                                    Register
                                </Button>
                            </Form>
                            <p className="text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterForm;
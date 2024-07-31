import React, { useState } from 'react';
import { CardBody, CardHeader, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem, Modal } from "react-bootstrap"
import { Card, Button, Container, Row, Col } from "react-bootstrap"
const storedCart = localStorage.getItem("cart");
let data = storedCart ? JSON.parse(storedCart) : [];

const calculateTotalPrice = (price, quantity) => {
    return parseFloat(price) * quantity;
}

const CartModal = ({ showCart, hideCart }) => {
    const [totalPrice, setTotalPrice] = useState(data.reduce((total, item) => total + calculateTotalPrice(item.price, item.quantity), 0));
    const [dataState, setData] = useState(data);
    console.log(data)
    const setShowCart = () => {
        hideCart(false)
    }



    const handleCountChange = (idMeal, delta) => {
        const newData = [...dataState];
        const index = newData.findIndex(item => item.idMeal === idMeal);
        if (index !== -1) {
            const item = newData[index];
            if (item.quantity + delta >= 0) {
                item.quantity += delta;
                if (item.quantity === 0) {
                    newData.splice(index, 1);
                }
                setData(newData);
                setTotalPrice(newData.reduce((total, item) => total + calculateTotalPrice(item.price, item.quantity), 0));
            }
        }
    }

 

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    return (
        <Modal
            show={showCart}
            onHide={() => setShowCart(false)}
            className="cart-modal"
            aria-labelledby="contained-modal-title-vcenter"
            closeButton
        >

            <Modal.Body className="h-100 w-25 position-fixed top-0 right-0">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
                </Modal.Header>

                <Container className='mt-3'>
                    {dataState.map((item, index) => (
                        <Card key={index} style={{ border: '1px solid #ddd', boxShadow: '0 0 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <Card.Body style={{ flex: 1, padding: '1rem' }}>
                                <Row>
                                    <Col>
                                        <Card.Img variant="top" src={item.strMealThumb} />
                                    </Col>
                                    <Col >
                                        <Card.Title>{item.strMeal}</Card.Title>
                                        <Row >
                                            <Col className="d-flex justify-content-between mx-2 fw-bold">
                                                <Button variant="secondary" onClick={() => handleCountChange(item.idMeal, -1)}>-</Button>
                                           
                                                <Card.Text>{item.quantity}</Card.Text>
                                           
                                                <Button variant="secondary" onClick={() => handleCountChange(item.idMeal, 1)}>+</Button>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Card.Text>Rs: {calculateTotalPrice(item.price, item.quantity)}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
                <hr />
                <div className="d-flex justify-content-between mx-2 fw-bold">
                    <span>Grand Total:</span>
                    <span>Rs:{totalPrice.toFixed(2)}</span>
                </div>
                <br />
                <Card className='mx-3 px-3'>
                    <CardHeader className='text-center fw-bold'>Order Details</CardHeader>
                    <ListGroup variant="flush">
                        <ListGroupItem className="d-flex justify-content-between">
                            <span > Food Cost:</span> ₹{totalPrice.toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                            <span> Food Items:</span> {data?.length ? data.length : 0}
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                            <span> Shipping charge:</span> ₹50
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                            <span> Discount:</span> ₹{totalPrice.toFixed(2)}
                        </ListGroupItem>
                        <hr />
                        <ListGroupItem className="fw-bold d-flex justify-content-between">
                            <span> Grand Total:</span>
                            <span> ₹{totalPrice + 50.00}</span>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
                <br />
                <Card className='w-75 mx-auto'>
                    <CardHeader>Shipping Details</CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl type="text" placeholder="Enter your name" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <FormControl type="email" placeholder="Enter your email" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl type="tel" placeholder="Enter your mobile number" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Street</FormLabel>
                                <FormControl type="text" placeholder="Enter your street address" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>City</FormLabel>
                                <FormControl type="text" placeholder="Enter your city" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>State</FormLabel>
                                <FormControl type="text" placeholder="Enter your state" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Pincode</FormLabel>
                                <FormControl type="number" placeholder="Enter your pincode" />
                            </FormGroup>
                            <br />
                            <div className="text-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Modal.Body>
        </Modal>
    )
}

export default CartModal
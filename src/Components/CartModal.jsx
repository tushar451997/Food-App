import React, { useState } from 'react';
import { Modal } from "react-bootstrap"
import { Card, Button, Container, Row, Col } from "react-bootstrap"

const CartModal = ({ showCart, hideCart }) => {
    const storedCart = localStorage.getItem("cart");
    let data = storedCart? JSON.parse(storedCart) : [];
    console.log(data)
    const setShowCart = () => {
        hideCart(false)
    }

    const calculateTotalPrice = (price, quantity) => {
        return parseFloat(price) * quantity;
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

    const [totalPrice, setTotalPrice] = useState(data.reduce((total, item) => total + calculateTotalPrice(item.price, item.quantity), 0));
    const [dataState, setData] = useState(data);

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
                                    <Col>
                                        <Card.Title>{item.strMeal}</Card.Title>
                                        <Card.Text>Price: ${item.price}</Card.Text>
                                        <Row>
                                            <Col>
                                                <Button variant="secondary" onClick={() => handleCountChange(item.idMeal, -1)}>-</Button>
                                            </Col>
                                            <Col>
                                                <Card.Text>{item.quantity}</Card.Text>
                                            </Col>
                                            <Col>
                                                <Button variant="secondary" onClick={() => handleCountChange(item.idMeal, 1)}>+</Button>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Card.Text>Total: ${calculateTotalPrice(item.price, item.quantity)}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
                <hr />
                <div className="d-flex justify-content-between mx-2">
                    <span>Total:</span> 
                    <span>${totalPrice.toFixed(2)}</span>
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default CartModal
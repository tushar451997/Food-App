import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import ParticularCategory from '../Pages/ParticularCategory';
import CartModal from './CartModal';

const NavBar = () => {
    const [showCart, setShowCart] = React.useState(false);

    const hideCart = (isFalse) =>{
        setShowCart(isFalse)
    }

    return (
        <>
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-auto" />
                        <Navbar.Brand as={Link} to="/">Food Booking App</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-between w-100">
                                <Nav className="mr-auto">
                                    <NavDropdown title="Meals" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/breakfast">Breakfast</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/lunch">Lunch</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/dinner">Dinner</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/snacks">Snacks</NavDropdown.Item>
                                    </NavDropdown>
                                    <Form inline className="ml-3">
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    </Form>
                                </Nav>
                                <Nav>
                                    <Nav.Link onClick={() => setShowCart(true)} className="nav-link"><FontAwesomeIcon icon={faShoppingCart} /> Cart</Nav.Link>
                                    <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                                </Nav>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

             {showCart? <CartModal showCart={showCart} hideCart={hideCart}/>:''}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/breakfast" element={<Breakfast />} />
                    <Route path="/lunch" element={<Lunch />} />
                    <Route path="/dinner" element={<Dinner />} />
                    <Route path="/snacks" element={<Snacks />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/category/:id" element={<ParticularCategory />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};



const Breakfast = () => {
    return <h1>Breakfast Page</h1>;
};

const Lunch = () => {
    return <h1>Lunch Page</h1>;
};

const Dinner = () => {
    return <h1>Dinner Page</h1>;
};

const Snacks = () => {
    return <h1>Snacks Page</h1>;
};

const CartContent = () => {
    // add your cart content here
    return <h1>Cart Content</h1>;
};

const Login = () => {
    return <h1>Login Page</h1>;
};

export default NavBar;
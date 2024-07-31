import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Modal, Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import ParticularCategory from '../Pages/ParticularCategory';
import CartModal from './CartModal';

const NavBar = () => {
    const [showCart, setShowCart] = React.useState(false);

    const hideCart = (isFalse) => {
        setShowCart(isFalse)
    }

    return (
        <>
            <BrowserRouter>
                <Navbar bg="primary" expand="lg" >
                    <Container >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-auto" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" />
                        <Navbar.Brand as={Link} to="/" className="text-white">Food Booking App</Navbar.Brand>
                        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">Food Booking App</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-between w-100">
                                    <Nav className="mr-auto">
                                        <Nav.Link as={Link} to="/search" className="nav-link text-white">Search</Nav.Link>
                                        <Nav.Link as={Link} to="/login" className="nav-link text-white">Login</Nav.Link>
                                        <Nav.Link onClick={() => setShowCart(true)} className="nav-link text-white"><FontAwesomeIcon icon={faShoppingCart} /> Cart</Nav.Link>
                                    </Nav>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

                {showCart ? <CartModal showCart={showCart} hideCart={hideCart} /> : ''}

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
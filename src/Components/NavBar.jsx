import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Modal, Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import ParticularCategory from '../Pages/ParticularCategory';
import CartModal from './CartModal';
import LoginForm from '../Pages/LoginForm'
import RegisterForm from '../Pages/RegisterForm';
import { AuthContext, CartContext } from '../contexts/CartContext';
import Search from '../Pages/Search';
import Footer from './Footer';

let login = localStorage.getItem('isLoggedIn')
if (login === undefined || login === null) {
    login = ''
}



const NavBar = () => {
    const [showCart, setShowCart] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(login === 'true');
    const { cartLength, updateCartQuantity } = useContext(CartContext);
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('isLoggedIn', false)
        setIsLoggedIn(false)
    };

    const hideCart = (isFalse) => {
        setShowCart(isFalse)
    }


    const handleHide = () => {
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        document.body.classList.remove('offcanvas-open');
        document.body.style.overflow = 'auto';
    };
    return (
        <>
            <BrowserRouter>
                <Navbar bg="primary" expand="lg" sticky="top" > {/* added sticky="top" */}
                    <Container >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-auto" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" />
                        <Navbar.Brand as={Link} to="/" className="text-white">Food Booking App</Navbar.Brand>
                        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" className="bg-black backdrop-none" onHide={handleHide}>
                            <Offcanvas.Header closeButton closeVariant="white">
                                <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">Food Booking App</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-between w-100">
                                    <Nav className="mr-auto">
                                        <Nav.Link as={Link} to="/search" className="nav-link text-white">Search</Nav.Link>
                                        {!isLoggedIn &&
                                            <Nav.Link as={Link} to="/login" className="nav-link text-white">Login</Nav.Link>
                                        }
                                        <Nav.Link onClick={() => setShowCart(true)} className="nav-link text-white">
                                            <span className="position-relative">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                                <span
                                                    className="badge bg-danger rounded-circle position-absolute bottom-100 end-10"
                                                    style={{ fontSize: 10, fontWeight: 'bold' }}
                                                >
                                                    {cartLength}
                                                </span>
                                            </span>
                                            Cart
                                        </Nav.Link>
                                    </Nav>
                                    {isLoggedIn && <Nav>
                                        <Nav.Link className="nav-link text-white">
                                            <FontAwesomeIcon icon={faUser} /> {currentUser?.name}
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/" onClick={handleLogout} className="nav-link text-white">Logout</Nav.Link>

                                    </Nav>}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

                {showCart ? <CartModal showCart={showCart} hideCart={hideCart} /> : ''}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/category/:id" element={<ParticularCategory />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};





export default NavBar;
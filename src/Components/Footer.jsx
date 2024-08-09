import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import linkdin from "../Images/linkdin.jpg"
import github from "../Images/github.jpg"

const Footer = () => {
    return (
        <footer className="bg-light py-5 align-items-center justify-content-space-around">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Row className="align-items-center justify-content-space-around">
                            <Col className="text-center align-items-center justify-content-space-around">
                                <h5>Connect with me</h5>
                                <ul className="list-inline mb-0 align-items-center justify-content-space-around">
                                    <li className="list-inline-item mx-2 align-items-center justify-content-space-around">
                                        <a href="https://www.linkedin.com/in/tushar-nehe-73abb916a/" target="_blank" rel="noopener noreferrer">
                                            <img src={linkdin} alt="tushar" height={35} />
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-2">
                                        <a href="https://github.com/tushar451997" target="_blank" rel="noopener noreferrer">
                                            <img src={github} alt="tushar" height={35} />
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-2 align-items-center justify-content-space-around d-f">
                                        <FontAwesomeIcon icon={faEnvelope} size="2x" /> tusharnehe2017@gmail.com
                                    </li>
                                    <li className="list-inline-item mx-2">
                                        <FontAwesomeIcon icon={faMobileAlt} size="2x" />: 9096088290
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
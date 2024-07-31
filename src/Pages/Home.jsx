import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetchData from "../Common/useFetchData";

const Home = () => {
    //   const [fetchdata, setFetchData] = useState([]);
    const { fetchdata, loading, error } = useFetchData(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    return (
        <Container fluid>
            <Row className="gutters-sm" >
                {fetchdata.length > 0 && fetchdata.map((item, index) => (
                    <Col key={index} xs={12} md={4} lg={3} className="mb-3 mt-3">
                        <Link to={`/category/${item.strCategory}`}>
                            <Card >
                                <Card.Img src={item.strCategoryThumb} alt={item.strCategory} />
                                <CardBody>
                                    <CardTitle>{item.strCategory}</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
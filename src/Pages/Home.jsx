import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetchData from "../Common/useFetchData";
import LoadingSpinner from "../Common/LoadingSpinner";

const Home = () => {
    //   const [fetchdata, setFetchData] = useState([]);
    const { fetchdata, loading, error } = useFetchData(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    if (loading) {
        return (
            <Container fluid className="px-5 d-flex align-items-center justify-content-center">
            <Row className="gutters-sm px-5 justify-content-center">
              <Col xs={12} md={4} lg={3} className="mb-3 mt-3 text-center">
                <LoadingSpinner/>
              </Col>
            </Row>
          </Container>
        )
      }
    
      if (error) {
        return (
          <Container fluid className="px-5">
            <Row className="gutters-sm px-5">
              <Col xs={12} md={4} lg={3} className="mb-3 mt-3">
                <div className="text-center mt-4">
                  <h2>Error: {error.message}</h2>
                </div>
              </Col>
            </Row>
          </Container>
        );
      }

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
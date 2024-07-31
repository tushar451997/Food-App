import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useFetchData from "../Common/useFetchData";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useEffect, useState } from "react";

const ParticularCategory = () => {
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const { fetchdata, loading, error } = useFetchData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`, id
  );

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [])

  useEffect(() => {
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.idMeal === item.idMeal);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.idMeal === item.idMeal ? { ...i, count: i.count + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  if (loading) {
    return (
      <Container fluid className="px-5 d-flex align-items-center justify-content-center">
        <Row className="gutters-sm px-5 justify-content-center">
          <Col xs={12} md={4} lg={3} className="mb-3 mt-3 text-center">
            <LoadingSpinner />
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
    <Container fluid className="px-5">
      <Row className="gutters-sm px-5">
        {fetchdata?.length > 0 && fetchdata.map((item, index) => (
          <Col key={index} xs={12} md={4} lg={3} className="mb-3 mt-3">
            <Card>
              <Card.Img src={item.strMealThumb} alt={item.strMeal} />
              <Card.Body>
                <Card.Title className="text-truncate">{item.strMeal}</Card.Title>
                <Card.Text>Rating:
                  <FontAwesomeIcon icon={faStar} style={{ color: 'green' }} /> {item.rating}
                </Card.Text>
                <Card.Text >
                  Price:<span style={{ color: 'red' }}>${item.price}</span>
                </Card.Text>
                <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ParticularCategory;
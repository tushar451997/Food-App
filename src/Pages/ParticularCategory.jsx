import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardBody, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useFetchData from "../Common/useFetchData";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useEffect, useState } from "react";

const ParticularCategory = () => {
  const { id } = useParams();
  const { fetchdata, loading, error } = useFetchData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`, id
  );

  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState('none');
  const [orderBy, setOrderBy] = useState('asc');

  useEffect(() => {
    setFilteredData(fetchdata);
  }, [fetchdata]);

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  const filterData = () => {
    let filteredData = [...fetchdata];

    if (filterBy === 'price') {
      filteredData = filteredData.sort((a, b) => orderBy === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (filterBy === 'rating') {
      filteredData = filteredData.sort((a, b) => orderBy === 'asc' ? a.rating - b.rating : b.rating - a.rating);
    }

    setFilteredData(filteredData);
  };

  const resetFilter = () => {
    setFilteredData(fetchdata);
    setFilterBy('none');
    setOrderBy('asc');
  };

  const addToCart = (item) => {
    const storedCart = localStorage.getItem("cart");
    let cartArray = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cartArray.find((i) => i.idMeal === item.idMeal);
    if (existingItem) {
      cartArray = cartArray.map((i) =>
        i.idMeal === item.idMeal ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      cartArray = [...cartArray, { ...item, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(cartArray));
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
        <Col xs={12} md={4} lg={3} className="mb-3 mt-3">
          <Form>
            <FormGroup controlId="filterBy">
              <FormLabel>Filter by:</FormLabel>
              <FormControl as="select" value={filterBy} onChange={handleFilterChange}>
                <option value="none">None</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="orderBy">
              <FormLabel>Order by:</FormLabel>
              <FormControl as="select" value={orderBy} onChange={handleOrderByChange}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </FormControl>
            </FormGroup>
            <br />
            <Button onClick={filterData} className="mr-1">Apply Filter</Button>
            <Button onClick={resetFilter}>Reset Filter</Button>
          </Form>
        </Col>
      </Row>
      <Row className="gutters-sm px-5">
        {filteredData?.length > 0 && filteredData.map((item, index) => (
                    <Col key={index} xs={12} md={4} lg={3} className="mb-3 mt-3">
                    <Card>
                      <Card.Img src={item.strMealThumb} alt={item.strMeal} />
                      <Card.Body>
                        <Card.Title className="text-truncate text-center">{item.strMeal}</Card.Title>
                        <Row>
                          <Col>
                            <Card.Text>Rating:
                              <FontAwesomeIcon icon={faStar} style={{ color: 'green' }} /> {item.rating}
                            </Card.Text>
                          </Col>
                          <Col>
                            <Card.Text >
                              Price:<span style={{ color: 'red' }}>${item.price}</span>
                            </Card.Text>
                          </Col>
                        </Row>
                        <br />
                        <div className="text-center hover:bg-blue hover:text-white">
                          <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          )
        }
        
        export default ParticularCategory;
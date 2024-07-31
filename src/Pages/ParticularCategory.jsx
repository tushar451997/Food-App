import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useFetchData from "../Common/useFetchData";

const ParticularCategory = () => {
    const { id } = useParams();
    const { fetchdata, loading, error } = useFetchData(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`, id
    );

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
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default ParticularCategory;
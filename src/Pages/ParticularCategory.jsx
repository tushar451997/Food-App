import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, CardTitle, CardText, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ParticularCategory = () =>{
    const  {id}  = useParams();
    const [fetchdata, setFetchData] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
      let res = await data.json();
      console.log(res.meals)
       setFetchData(res.meals);
    }
    return(
        <Container fluid className="px-5">
        <Row className="gutters-sm px-5">
          {fetchdata?.length>0 && fetchdata.map((item, index) => (
            <Col key={index} xs={12} md={4} lg={3} className="mb-3 mt-3">
              {/* <Link to={`/meal/${item.idMeal}`}> */}
                <Card>
                  <Card.Img src={item.strMealThumb} alt={item.strMeal} />
                  <CardBody>
                    <CardTitle>{item.strMeal}</CardTitle>
                  </CardBody>
                </Card>
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </Container>
    )
}
export default ParticularCategory;




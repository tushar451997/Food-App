import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useContext } from 'react';
import { Form, InputGroup, FormControl, Button, Row, Col, Card, Container } from 'react-bootstrap';
import useFetchData from '../Common/useFetchData';
import { CartContext } from '../contexts/CartContext';
import search from '../Images/search.jpg'

const Search = () => {
    const { cart, updateCartQuantity } = useContext(CartContext);
    const { fetchdata, loading, error, setParam } = useFetchData(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loadingtext, setLoading] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setParam(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
            setSearchResults(fetchdata)
        };

        fetchSearchResults();
    }, [searchQuery]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        const debounceTimeout = setTimeout(() => {
            setSearchQuery(searchQuery.trim());
        }, 500);

        return () => {
            clearTimeout(debounceTimeout);
        };
    };

    const searchLogic = (searchQuery) => {
        if (searchQuery.trim() === '') {
            return [];
        }

        const searchQueryLowercase = searchQuery?.toLowerCase();
        const filteredResults = searchResults?.filter((meal) => {
            const mealNameLowercase = meal?.strMeal?.toLowerCase();
            const mealDescriptionLowercase = meal?.strInstructions?.toLowerCase();

            return (
                mealNameLowercase?.includes(searchQueryLowercase) ||
                mealDescriptionLowercase?.includes(searchQueryLowercase)
            );
        });

        return filteredResults;
    };

    const filteredResults = searchLogic(searchQuery);

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
        updateCartQuantity(cartArray?.length)
        localStorage.setItem("cart", JSON.stringify(cartArray));
        alert('Item added to cart')
    };



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
        <>
            <p className='text-center m-4 fs-6'>Search your favourite food</p>
            <Form className='mt-3'>
                <InputGroup className="mb-3" style={{ maxWidth: 400, margin: 'auto' }}>
                    <FormControl
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Search for a meal"
                        style={{ padding: 10, border: '1px solid #ccc' }}
                    />

                    <Button variant="outline-secondary" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>

                </InputGroup>
                {loadingtext ? (
                    <p>Loading...</p>
                ) : (
                    <Row className="gutters-sm px-5">
                        {filteredResults?.length > 0 && filteredResults.map((item, index) => (
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
                )}
                {
                    filteredResults.length === 0 &&

                    <div style={{ textAlign: 'center', borderRadius: '50%' }}>
                        <img src={search} alt='Search' width={400} height={400} style={{ borderRadius: '50%' }} />
                    </div>
                }
            </Form>
        </>
    );
};

export default Search;
import { useEffect, useState } from "react";

const useFetchData = (url, id) => {
    console.log(url)
    const [fetchdata, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (id) {
                    data.meals.forEach(item => {
                        item.price = Math.floor(Math.random() * (799 - 399 + 1)) + 399;
                        item.rating = Math.round((Math.random() * (5 - 1) + 1) * 10) / 10
                        if (item.price % 1 === 0) {
                            item.price = item.price + '.0';
                        }
                    });
                    setFetchData(data.meals)
                } else {
                    setFetchData(data.categories);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return { fetchdata, loading, error };
};

export default useFetchData;
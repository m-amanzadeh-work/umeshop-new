import { useReducer, useEffect } from 'react'
// import data from '../data'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }
        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
}

function HomeScreen () {

    // const [products, setProducts] = useState([])

    // Using Reducer instead of useState for handling data base without depending previous state result
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {

            dispatch({ type: 'FETCH_REQUEST' })

            try {
                const result = await axios.get("/api/products")
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products">
                {
                    loading ? (
                        <div>Loading...</div>
                    ) :
                        error ? (<div>{error}</div>
                        ) : (
                            products.map((product) => (
                                <div className="product" key={product.slug}>
                                    <Link to={`product/${product.slug}`}>
                                        <img src={product.image} alt={product.name}></img>
                                    </Link>
                                    <div className="product-info">
                                        <Link to={`product/${product.slug}`}>
                                            <p>{product.name}</p>
                                        </Link>
                                        <p><strong>${product.price}</strong></p>
                                        <button>Add to cart</button>
                                    </div>
                                </div>
                            ))
                        )}
            </div>
        </div>
    );
};

export default HomeScreen;
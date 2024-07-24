import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { EcommerceApi } from '../api';
import { useEffect, useState } from 'react';
import QuantityAdjuster from '../QuantityAdjuster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';


const ProductDetail = ({ user, handleClick, cartItems }) => {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [isMyProduct, setIsMyProduct] = useState(true);
    const [starsArray, setStarsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getProduct() {
            const tempProduct = await EcommerceApi.getProduct(id)
            if (tempProduct.sellerId != user.id) {
                setIsMyProduct(false)
            }
            setProduct(() => tempProduct)
        }
        getProduct()
        setIsLoading(() => true)
    }, [])

    useEffect(() => {
        if (product.averageRating) {
            for (let i = 0; i < product.averageRating; i++) {
                if (i + 1 <= product.averageRating) {
                    setStarsArray((arr) => [...arr, 'full']);
                } else if (i + 1 > product.averageRating && i < product.averageRating) {
                    setStarsArray((arr) => [...arr, 'half']);
                } else {
                    setStarsArray((arr) => [...arr, 'empty']);
                }
            }
        }
        return () => setStarsArray([])
    }, [product])

    return (
        <div className="ProductDetail-Container">
            {isLoading ?
                <>
                    <div className='ProductDetail'>
                        <img src={product.imageUrl}
                            className='ProductDetail-Image' />
                        <div className='ProductDetail-Text'>
                            <div className='ProductDetail-Name'>
                                {product.name}
                            </div>
                            <div className='ProductDetail-Stars'>{starsArray.map((star, i) => {
                                if (star == 'full') {
                                    return <FontAwesomeIcon icon={faStar} key={i} />
                                } else if (star == 'half') {
                                    return <FontAwesomeIcon icon={faStarHalfStroke} key={i} />
                                } else {
                                    return <FontAwesomeIcon icon={faStar} key={i} />
                                }
                            })}
                            </div>
                            <span>{product.numOfRatings} Reviews</span>
                            <div>Quantity Available: {product.quantity} </div>
                            <hr></hr>
                            <div className='ProductDetail-Description'>
                                {product.description}
                            </div>
                            {
                                user.username && !isMyProduct &&
                                <>
                                    {cartItems.find(item => item.id == id) &&
                                        <QuantityAdjuster id={id}
                                            className="ProductDetail-QuantityAdjuster"
                                        />}
                                    <button onClick={handleClick}
                                        id={id}
                                        className='ProductDetail-Button'>
                                        Add to Cart
                                    </button>
                                </>
                            }

                        </div>
                    </div>
                </>
                :
                ''
            }
        </div>
    )
}

export default ProductDetail
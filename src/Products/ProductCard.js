import { useState, useContext, useEffect } from 'react';
import './ProductCard.css';
import ProductContext from './ProductContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, user }) => {
    const [starsArray, setStarsArray] = useState([]);
    const { handleAddToCart } = useContext(ProductContext)
    let newPrice = product.price.toString()
    if (newPrice[newPrice.length - 2] == '.') {
        newPrice += '0'
    }

    useEffect(() => {
        for (let i = 0; i < product.averageRating; i++) {
            if (i + 1 <= product.averageRating) {
                setStarsArray((arr) => [...arr, 'full']);
            } else if (i + 1 > product.averageRating && i < product.averageRating) {
                setStarsArray((arr) => [...arr, 'half']);
            } else {
                setStarsArray((arr) => [...arr, 'empty']);
            }
        }
        return () => setStarsArray([]);
    }, [])

    return (
        <div className="ProductCard">
        <Link to={`/products/${product.id}`}>
            <div className='ProductCard-Img-Container ProductCard-Child'>
                <img src={product.imageUrl}
                    className="ProductCard-Img ProductCard-Child" />
            </div>
            </Link>
            <p>
                {product.name}
            </p>
            <div className='ProductCard-Stars'>{starsArray.map((star, i) => {
                if (star == 'full') {
                    return <FontAwesomeIcon icon={faStar} className='star' key={i} />
                } else if (star == 'half') {
                    return <FontAwesomeIcon icon={faStarHalfStroke} />
                } else {
                    return <FontAwesomeIcon icon={faStar} />
                }
            })}
            </div>
            <p>
                {

                }
            </p>
            <hr></hr>
            <div className='ProductCard-Info'>
                {product.hasDiscount
                    ?
                    <>
                        <span className='ProductCard-OldPrice'>
                            Old Price: ${newPrice}
                        </span>
                        <span className='ProductCard-Discount'>
                            Discount: {product.discountRate}%
                        </span>
                        <p className='ProductCard-Discount-Title'>
                            Discounted Price:
                            <span className='ProductCard-DiscountedPrice'>${Math.round((newPrice - (newPrice * product.discountRate) / 100) * 100) / 100}</span>
                        </p>
                    </>
                    :
                    <span className='ProductCard-Child'>
                        Price: ${newPrice}
                    </span>}
            </div>
            {user.username &&
                <button className='ProductCard-CartButton ProductCard-Child'
                    id={product.id}
                    onClick={handleAddToCart}>
                    Add to cart
                </button>}
        </div>
    )
}

export default ProductCard
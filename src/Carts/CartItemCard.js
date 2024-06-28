import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import QuantityAdjuster from '../QuantityAdjuster';
import { useContext } from 'react';
import CartContext from './CartContext';
import './CartItemCard.css';

const CartItemCard = ({ item }) => {
    const { handleRemoveFromCart } = useContext(CartContext);
    return (
        <div className="CartItemCard">
            <div className='CartItemCard-Img-Container'>
                <img src={item.imageUrl}
                    className='CartItemCard-Img' />
            </div>
            <div className='CartItemCard-Change'
                id={item.id}>
                <div className='CartItemCard-QuantityAdjuster-Container'>
                    <QuantityAdjuster id={item.id}
                        className='CartItemCard-QuantityAdjuster' />
                </div>
                <button onClick={handleRemoveFromCart}
                    className='CartItemCard-Button btn btn-danger'
                    id={item.id}>
                    <FontAwesomeIcon icon={faTrashCan}
                    />
                </button>
            </div>
        </div>
    )
}

export default CartItemCard
import { useContext } from 'react';
import CartContext from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './CartIcon.css';


const CartIcon = () => {
    const { cartItems, handleCartIconSubmit } = useContext(CartContext);
    return (
        <>
            <p className='CartIcon-CartLength'>{cartItems.length}</p>
            <form className="CartIcon"
                onSubmit={handleCartIconSubmit}>
                <button className='CartIcon-Button btn-sm'>
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </form>
        </>
    )
}

export default CartIcon
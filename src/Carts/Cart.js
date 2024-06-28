import CartItemCard from './CartItemCard';
import './Cart.css';
import CartContext from './CartContext';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';

const Cart = ({ handleSubmit }) => {
    const { showCart, cartItems } = useContext(CartContext);
    return (
        <>
            {showCart &&
                <div className="Cart">
                    <form onSubmit={handleSubmit}>
                        <button className='Cart-Button'>
                            Proceed To Checkout
                        </button>
                    </form>
                    <div className='Cart-Container'>
                        {cartItems.map(item => <CartItemCard key={uuid()} item={item} />)}
                    </div>
                </div>
            }
        </>
    )
}

export default Cart
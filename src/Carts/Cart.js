import CartItemCard from './CartItemCard';
import './Cart.css';
import CartContext from './CartContext';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Cart = ({ handleSubmit }) => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    return (
        <>
            <div className="Cart">
                <form onSubmit={(e) => {
                    handleSubmit(e)
                    navigate('/checkout')
                }
                }>
                    <button className='Cart-Button'>
                        Proceed To Checkout
                    </button>
                </form>
                <div className='Cart-Container'>
                    {cartItems.map(item => <CartItemCard key={uuid()} item={item} />)}
                </div>
            </div>
        </>
    )
}

export default Cart
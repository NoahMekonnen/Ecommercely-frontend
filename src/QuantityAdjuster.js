import { useState } from 'react';
import './QuantityAdjuster.css';
import CartContext from './Carts/CartContext';
import { useContext } from 'react';

const QuantityAdjuster = ({ id }) => {
    const { handleQuantityAdjusterChange, decrease, increase, cartItems } = useContext(CartContext);
    const item = cartItems.find(item => item.id == id);
    const quantity = item ? item.quantityChosen : 1;

    return (
        <div className="QuantityAdjuster" id={id}>
            <button onClick={decrease}
                className='QuantityAdjuster-Decrease-Button'>
                -
            </button>
            <input className="QuantityAdjuster-Input"
                value={quantity}
                onChange={handleQuantityAdjusterChange} />
            <button onClick={increase}
                className='QuantityAdjuster-Increase-Button'>
                +
            </button>
        </div>
    )
}

export default QuantityAdjuster;
import './CheckoutCartItemCard.css';
import QuantityAdjuster from '../QuantityAdjuster';

const CheckoutCartItemCard = ({ item }) => {
    return (
        <div className="CheckoutCartItemCard">
            <img src={item.imageUrl}
                className='CheckoutCartItemCard-Img' />

            <div className='CheckoutCartItemCard-Detail'>
                <div>
                    Name: {item.name}
                </div>
                <div>
                    Price: {item.price}
                </div>
                <div>
                    Qty: {item.quantityChosen}
                </div>
                <QuantityAdjuster id={item.id} />
            </div>

        </div>
    )
}

export default CheckoutCartItemCard;
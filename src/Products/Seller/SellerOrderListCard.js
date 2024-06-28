import './SellerOrderListCard.css';
import { EcommerceApi } from '../../api';

const SellerOrderListCard = ({ interaction, setSellerOrders, user, handleApproval }) => {
    let newPrice = interaction.price.toString()
    if (newPrice[newPrice.length - 2] == '.') {
        newPrice += '0'
    } else {
        newPrice = Math.round(newPrice * 100) / 100
    }

    return (
        <div className='SellerOrderListCard'>
            <div className='SellerOrderListCard-Img-Container'>
                <img src={interaction.imageUrl}
                    className='SellerOrderListCard-Img' />
            </div>
            <p>{interaction.name}</p>
            <p>Price: ${newPrice}</p>
            <p>Quantity: {interaction.quantityChosen}</p>
            <button id={interaction.id}
            onClick={async (e) => {
                await handleApproval(e)
                setSellerOrders(await EcommerceApi.getSellerTransactions(user.username));
            }}
                className='SellerOrderListCard-Button btn btn-primary'
            >
                Approve
            </button>
        </div>
    )
}

export default SellerOrderListCard;
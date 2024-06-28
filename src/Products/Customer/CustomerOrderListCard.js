import './CustomerOrderListCard.css'

const CustomerOrderListCard = ({ interaction }) => {
    let newPrice = interaction.price.toString()
    if (newPrice[newPrice.length - 2] == '.') {
        newPrice += '0'
    } else {
        newPrice = Math.round(newPrice * 100) / 100
    }
    const cost = Math.round(interaction.price * interaction.quantityChosen * 100) / 100
    return (
        <div className="CustomerOrderListCard">
            <div className='CustomerOrderListCard-Img-Container'>
                <img src={interaction.imageUrl}
                    className='CustomerOrderListCard-Img' />
            </div>
            <h4>{interaction.name}</h4>
            <p>Quantity Bought: {interaction.quantityChosen}</p>
            <p>Price: {newPrice}</p>
            <p>Cost: {cost}</p>
            <p>Expected Shipping time is {interaction.expectedShippingTime} days</p>
        </div>
    )
}

export default CustomerOrderListCard
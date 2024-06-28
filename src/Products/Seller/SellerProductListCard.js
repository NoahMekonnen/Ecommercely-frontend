import './SellerProductListCard.css';


const SellerProductListCard = ({ product }) => {
    let newPrice = product.price.toString()
    if (newPrice[newPrice.length - 2] == '.') {
        newPrice += '0'
    } else {
        newPrice = Math.round(newPrice * 100) / 100
    }
    return (
        <div className="SellerProductListCard">
            <div className='SellerProductListCard-Img-Container'>
                <img src={product.imageUrl} className='SellerProductListCard-Img'
                />
            </div>
            <h6>{product.name}</h6>
            <p>Price: ${newPrice}</p>
            <p>Quantity Available: {product.quantity}</p>
        </div>
    )
}

export default SellerProductListCard
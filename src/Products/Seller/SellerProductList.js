import SellerProductListCard from './SellerProductListCard';
import './SellerProductList.css';
import {v4 as uuid} from 'uuid';

const SellerProductList = ({ products }) => {

    return (
        <div className="SellerProductList">
            {
                products.length != 0
                    ?
                    products.map(product =>
                        <SellerProductListCard product={product}
                        key={uuid()}
                        />)
                    :
                    <h4 className='SellerProductList-None'>
                        No Available Products...
                    </h4>
            }
        </div>
    )
}

export default SellerProductList
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ approvedTransactions, interactions, products }) => {
    return (
        <div className='Dashboard'>
            <div className="Dashboard-Child">
                <h5 className="Dashboard-Title">Sales</h5>
                <p>${approvedTransactions.reduce((acc, item) => acc + item.price * item.quantityChosen, 0)}</p>
            </div>
            <div className="Dashboard-Child">
                <h5 className="Dashboard-Title">My Available Products</h5>
                <Link to="/seller/products" className='Dashboard-Num'>
                    {products.length}
                </Link>
            </div>
            <div className='Dashboard-Child'>
                <h5 className="Dashboard-Title">Customer Orders</h5>
                <Link to='/seller/orders' className='Dashboard-Num'>
                    {interactions.length}
                </Link>
            </div>
        </div>
    )
}

export default Dashboard
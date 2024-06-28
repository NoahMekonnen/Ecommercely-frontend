import CustomerOrderListCard from './CustomerOrderListCard';
import './CustomerOrderList.css';
import {v4 as uuid} from 'uuid';

const CustomerOrderList = ({ interactions }) => {

    return (
        <div className="CustomerOrderList">
            {interactions.length != 0
                ?
                interactions.map(interaction =>
                    <CustomerOrderListCard interaction={interaction} key={uuid()} />
                )
                :
                <h4 className='CustomerOrderList-None'>
                    No transactions yet...
                </h4>}
        </div>
    )
}

export default CustomerOrderList